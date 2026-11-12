import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  Download,
  Settings,
  X,
  CircleDot,
  Sparkles,
  AlertCircle,
  Move,
  User,
  Film,
  RotateCcw,
  Camera,
  Image as ImageIcon,
  Wand2,
  Sliders,
  Upload,
  Eye,
  EyeOff,
  Sun,
  Check,
} from 'lucide-react';

interface PresentationRecorderProps {
  isStudioOpen: boolean;
  onCloseStudio: () => void;
  currentSlideNumber: number;
  totalSlides: number;
  onRecordingStateChange?: (state: {
    isRecording: boolean;
    isPaused: boolean;
    recordingSeconds: number;
    onTogglePause: () => void;
    onStopRecording: () => void;
    onToggleDock: () => void;
    isDockVisible: boolean;
  }) => void;
}

type CamPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
type CamShape = 'circle' | 'rounded' | 'portrait';
type CamSize = 'sm' | 'md' | 'lg';
type SettingsTab = 'beauty' | 'background' | 'layout';
type VirtualBgId =
  | 'none'
  | 'blur-soft'
  | 'blur-strong'
  | 'ai-lab'
  | 'professor-office'
  | 'keynote-stage'
  | 'clean-studio'
  | 'custom';
type ColorToneId = 'natural' | 'warm-glow' | 'cool-crisp' | 'cinema';

interface BeautySettings {
  acneBlemishRemoval: number; // 0 - 100 (Acne, pimples, blackheads/komedo eraser)
  skinSmoothness: number; // 0 - 100 (Pore & texture smoothing)
  faceContourSlim: number; // 0 - 100 (Jawline slimming & 3D cheekbone contour)
  handsomeBoost: number; // 0 - 100 (Eye/brow definition, charm & under-eye lift)
  skinBrightening: number; // 0 - 100 (Radiant porcelain skin brightening)
  colorTone: ColorToneId;
}

export const PresentationRecorder: React.FC<PresentationRecorderProps> = ({
  isStudioOpen,
  onCloseStudio,
  onRecordingStateChange,
}) => {
  // Media Streams
  const [camStream, setCamStream] = useState<MediaStream | null>(null);
  const [isCamEnabled, setIsCamEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [micVolume, setMicVolume] = useState(0);

  // Camera Bubble Customization
  const [camPosition, setCamPosition] = useState<CamPosition>('bottom-right');
  const [camShape, setCamShape] = useState<CamShape>('portrait');
  const [camSize, setCamSize] = useState<CamSize>('md');
  const [presenterName, setPresenterName] = useState('A. Rahman');
  const [showPresenterBadge, setShowPresenterBadge] = useState(true);
  const [isMirrored, setIsMirrored] = useState(true);

  // BeautyPlus Retouch & Virtual Background State
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>('beauty');
  const [virtualBg, setVirtualBg] = useState<VirtualBgId>('none');
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(null);
  const [beauty, setBeauty] = useState<BeautySettings>({
    acneBlemishRemoval: 65,
    skinSmoothness: 55,
    faceContourSlim: 45,
    handsomeBoost: 60,
    skinBrightening: 35,
    colorTone: 'natural',
  });

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  // Automatically hide the floating control dock while recording so viewers focus 100% on the slide!
  const [showDockDuringRecord, setShowDockDuringRecord] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Recorded Output Modal State
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [recordedFileSizeMB, setRecordedFileSizeMB] = useState<string>('0.0');
  const [customFileName, setCustomFileName] = useState<string>(
    `Python_for_AI_Lecture_${new Date().toISOString().slice(0, 10)}`
  );

  // Refs for Video Processing Pipeline
  const rawVideoRef = useRef<HTMLVideoElement | null>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const smoothBufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const warpBufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgBufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const customBgImgRef = useRef<HTMLImageElement | null>(null);

  const segmentationRef = useRef<any>(null);
  const segmentationReadyRef = useRef<boolean>(false);
  const isSegmentingFrameRef = useRef<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const displayStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const renderLoopRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Keep latest state in refs for the 30fps canvas render loop
  const beautyRef = useRef(beauty);
  beautyRef.current = beauty;
  const virtualBgRef = useRef(virtualBg);
  virtualBgRef.current = virtualBg;
  const isMirroredRef = useRef(isMirrored);
  isMirroredRef.current = isMirrored;

  // Load Custom Background Image when selected
  useEffect(() => {
    if (customBgUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = customBgUrl;
      img.onload = () => {
        customBgImgRef.current = img;
      };
    }
  }, [customBgUrl]);

  // Initialize MediaPipe SelfieSegmentation for Real-Time Virtual Backgrounds
  useEffect(() => {
    if (!isStudioOpen && !isRecording) return;
    let cancelled = false;

    const initSegmentation = async () => {
      try {
        if (!(window as any).SelfieSegmentation) {
          await new Promise<void>((resolve, reject) => {
            const existing = document.getElementById('mediapipe-selfie-script');
            if (existing) {
              existing.addEventListener('load', () => resolve());
              existing.addEventListener('error', () => reject());
              return;
            }
            const script = document.createElement('script');
            script.id = 'mediapipe-selfie-script';
            script.src =
              'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js';
            script.crossOrigin = 'anonymous';
            script.onload = () => resolve();
            script.onerror = () => reject();
            document.head.appendChild(script);
          });
        }
        const SegClass = (window as any).SelfieSegmentation;
        if (!SegClass || cancelled) {
          segmentationReadyRef.current = false;
          return;
        }
        const seg = new SegClass({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
        });
        seg.setOptions({
          modelSelection: 1, // Landscape / general high-accuracy model
          selfieMode: false,
        });
        seg.onResults((results: any) => {
          if (cancelled) return;
          if (!maskCanvasRef.current) {
            maskCanvasRef.current = document.createElement('canvas');
          }
          const mCanvas = maskCanvasRef.current;
          mCanvas.width = results.segmentationMask.width || 480;
          mCanvas.height = results.segmentationMask.height || 480;
          const mCtx = mCanvas.getContext('2d');
          if (mCtx) {
            mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);
            mCtx.drawImage(results.segmentationMask, 0, 0, mCanvas.width, mCanvas.height);
            segmentationReadyRef.current = true;
          }
        });
        await seg.initialize();
        if (!cancelled) {
          segmentationRef.current = seg;
        }
      } catch {
        // Fallback elliptical studio mask will be used automatically if CDN is unreachable
        segmentationReadyRef.current = false;
      }
    };

    initSegmentation();

    return () => {
      cancelled = true;
      if (segmentationRef.current) {
        try {
          segmentationRef.current.close();
        } catch {
          // ignore
        }
        segmentationRef.current = null;
      }
    };
  }, [isStudioOpen, isRecording]);

  // Draw procedural studio backgrounds onto a canvas context
  const drawVirtualBackgroundScene = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    bgId: VirtualBgId,
    sourceCanvas: HTMLCanvasElement
  ) => {
    ctx.save();
    if (bgId === 'blur-soft' || bgId === 'blur-strong') {
      const blurPx = bgId === 'blur-strong' ? 18 : 9;
      ctx.filter = `blur(${blurPx}px) brightness(0.96)`;
      // Slight scale to avoid soft edges at border
      ctx.drawImage(sourceCanvas, -w * 0.05, -h * 0.05, w * 1.1, h * 1.1);
      ctx.filter = 'none';
    } else if (bgId === 'ai-lab') {
      // Sleek AI Research Laboratory Background
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0b1528');
      grad.addColorStop(0.5, '#15284f');
      grad.addColorStop(1, '#091936');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Soft glowing cyan & amber studio orbs
      const orb1 = ctx.createRadialGradient(w * 0.2, h * 0.25, 5, w * 0.2, h * 0.25, w * 0.45);
      orb1.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      orb1.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = orb1;
      ctx.fillRect(0, 0, w, h);

      const orb2 = ctx.createRadialGradient(w * 0.82, h * 0.75, 5, w * 0.82, h * 0.75, w * 0.4);
      orb2.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
      orb2.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = orb2;
      ctx.fillRect(0, 0, w, h);

      // Perspective tech grid & neural nodes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.lineWidth = 1;
      const step = Math.round(w / 10);
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    } else if (bgId === 'professor-office') {
      // Warm Executive University Bookshelf & Acoustic Wood Panel Studio
      const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
      wallGrad.addColorStop(0, '#3b2818');
      wallGrad.addColorStop(0.5, '#2b1d12');
      wallGrad.addColorStop(1, '#1c120b');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, w, h);

      // Warm library shelves & blurred books
      const shelfCount = 4;
      for (let s = 1; s <= shelfCount; s++) {
        const sy = (h / (shelfCount + 1)) * s;
        ctx.fillStyle = 'rgba(120, 75, 35, 0.55)';
        ctx.fillRect(w * 0.06, sy, w * 0.88, 6);

        // Stylized out-of-focus book spines
        const colors = ['#1e3a8a', '#92400e', '#065f46', '#7f1d1d', '#334155', '#d97706'];
        let bx = w * 0.08;
        let idx = s * 3;
        while (bx < w * 0.88) {
          const bw = 12 + ((idx * 7) % 14);
          const bh = 28 + ((idx * 11) % 18);
          ctx.fillStyle = colors[idx % colors.length];
          ctx.globalAlpha = 0.45;
          ctx.fillRect(bx, sy - bh, bw, bh);
          bx += bw + 4;
          idx++;
        }
        ctx.globalAlpha = 1;
      }

      // Warm golden desk lamp ambient glow
      const lamp = ctx.createRadialGradient(w * 0.8, h * 0.2, 10, w * 0.8, h * 0.2, w * 0.65);
      lamp.addColorStop(0, 'rgba(251, 191, 36, 0.28)');
      lamp.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = lamp;
      ctx.fillRect(0, 0, w, h);
    } else if (bgId === 'keynote-stage') {
      // Keynote Dark Stage with Spotlight
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.35, 10, w * 0.5, h * 0.5, w * 0.75);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(0.6, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle golden rim halo behind presenter
      const halo = ctx.createRadialGradient(w * 0.5, h * 0.45, 5, w * 0.5, h * 0.45, w * 0.42);
      halo.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
      halo.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);
    } else if (bgId === 'clean-studio') {
      // Bright Minimalist White/Soft-Blue Keynote Studio
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(0.6, '#e2e8f0');
      grad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const softLight = ctx.createRadialGradient(w * 0.5, h * 0.3, 10, w * 0.5, h * 0.3, w * 0.6);
      softLight.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      softLight.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = softLight;
      ctx.fillRect(0, 0, w, h);
    } else if (bgId === 'custom' && customBgImgRef.current) {
      ctx.drawImage(customBgImgRef.current, 0, 0, w, h);
    } else {
      ctx.drawImage(sourceCanvas, 0, 0, w, h);
    }
    ctx.restore();
  };

  // Real-Time 30fps BeautyPlus Retouch + Face Contour + Virtual Background Pipeline
  useEffect(() => {
    if (!isStudioOpen && !isRecording) return;

    let active = true;

    const renderFrame = () => {
      if (!active) return;

      const video = rawVideoRef.current;
      const outCanvas = outputCanvasRef.current;

      if (video && outCanvas && video.readyState >= 2 && video.videoWidth > 0) {
        const w = 480;
        const h = 480;
        if (outCanvas.width !== w) outCanvas.width = w;
        if (outCanvas.height !== h) outCanvas.height = h;

        if (!smoothBufferCanvasRef.current) {
          smoothBufferCanvasRef.current = document.createElement('canvas');
        }
        if (!warpBufferCanvasRef.current) {
          warpBufferCanvasRef.current = document.createElement('canvas');
        }
        if (!bgBufferCanvasRef.current) {
          bgBufferCanvasRef.current = document.createElement('canvas');
        }

        const smoothCanvas = smoothBufferCanvasRef.current;
        const warpCanvas = warpBufferCanvasRef.current;
        const bgCanvas = bgBufferCanvasRef.current;
        smoothCanvas.width = w;
        smoothCanvas.height = h;
        warpCanvas.width = w;
        warpCanvas.height = h;
        bgCanvas.width = w;
        bgCanvas.height = h;

        const outCtx = outCanvas.getContext('2d');
        const smoothCtx = smoothCanvas.getContext('2d');
        const warpCtx = warpCanvas.getContext('2d');
        const bgCtx = bgCanvas.getContext('2d');

        if (outCtx && smoothCtx && warpCtx && bgCtx) {
          const b = beautyRef.current;
          const vBg = virtualBgRef.current;
          const mirror = isMirroredRef.current;

          // Step 1: Center-crop video frame into warpCanvas (with optional mirror)
          const vw = video.videoWidth;
          const vh = video.videoHeight;
          const side = Math.min(vw, vh);
          const sx = (vw - side) / 2;
          const sy = (vh - side) / 2;

          warpCtx.save();
          if (mirror) {
            warpCtx.translate(w, 0);
            warpCtx.scale(-1, 1);
          }
          warpCtx.drawImage(video, sx, sy, side, side, 0, 0, w, h);
          warpCtx.restore();

          // Send frame to MediaPipe SelfieSegmentation if Virtual Background is enabled
          if (
            vBg !== 'none' &&
            segmentationRef.current &&
            !isSegmentingFrameRef.current
          ) {
            isSegmentingFrameRef.current = true;
            segmentationRef.current
              .send({ image: warpCanvas })
              .catch(() => {})
              .finally(() => {
                isSegmentingFrameRef.current = false;
              });
          }

          // Step 2: Apply Real-Time 2D Face Contour & Jawline Slimming Warp
          // Subtle horizontal compression toward the center vertical axis in the cheek/jaw region
          if (b.faceContourSlim > 0) {
            const slimFactor = (b.faceContourSlim / 100) * 0.085; // Up to 8.5% cheek/jaw slimming
            const strips = 24;
            const stripH = h / strips;

            smoothCtx.clearRect(0, 0, w, h);
            for (let i = 0; i < strips; i++) {
              const y = i * stripH;
              const normY = (y + stripH * 0.5) / h; // 0 top, 1 bottom
              // Peak slimming around mid-lower face (cheeks & jawline: normY 0.38 to 0.78)
              let weight = 0;
              if (normY > 0.25 && normY < 0.88) {
                weight = Math.sin(((normY - 0.25) / 0.63) * Math.PI);
              }
              const currentSlim = slimFactor * weight;
              const destW = w * (1 - currentSlim);
              const destX = (w - destW) / 2;

              // Fill outer edge cleanly then draw slimmed center strip
              smoothCtx.drawImage(warpCanvas, 0, y, w, stripH, 0, y, w, stripH);
              smoothCtx.drawImage(warpCanvas, 0, y, w, stripH, destX, y, destW, stripH);
            }
            // Copy warped result back to warpCanvas
            warpCtx.clearRect(0, 0, w, h);
            warpCtx.drawImage(smoothCanvas, 0, 0);
          }

          // Step 3: Base Color Grading, Skin Brightening & Handsome Contrast
          const brightVal = 1 + (b.skinBrightening / 100) * 0.16 + (b.handsomeBoost / 100) * 0.04;
          const contrastVal = 1 + (b.handsomeBoost / 100) * 0.12 - (b.skinSmoothness / 100) * 0.04;
          let saturateVal = 1 + (b.handsomeBoost / 100) * 0.1;
          let sepiaVal = 0;
          let hueRotateVal = 0;

          if (b.colorTone === 'warm-glow') {
            saturateVal += 0.12;
            sepiaVal = 0.08;
          } else if (b.colorTone === 'cool-crisp') {
            saturateVal += 0.05;
            hueRotateVal = -4;
          } else if (b.colorTone === 'cinema') {
            saturateVal -= 0.06;
          }

          // Draw sharp base onto bgCanvas (holds enhanced person frame)
          bgCtx.save();
          bgCtx.filter = `brightness(${brightVal.toFixed(3)}) contrast(${contrastVal.toFixed(
            3
          )}) saturate(${saturateVal.toFixed(3)}) sepia(${sepiaVal}) hue-rotate(${hueRotateVal}deg)`;
          bgCtx.drawImage(warpCanvas, 0, 0, w, h);
          bgCtx.restore();

          // Step 4: BeautyPlus Multi-Pass Acne, Blackhead (Komedo) & Skin Smoothing Filter
          // Combines a micro-blemish bilateral diffusion pass + soft skin radiance pass
          // masked specifically to the facial center region while keeping eyes/hair crisp
          const totalRetouch = Math.max(b.acneBlemishRemoval, b.skinSmoothness);
          if (totalRetouch > 0) {
            const blurRadius =
              1.8 + (b.acneBlemishRemoval / 100) * 3.8 + (b.skinSmoothness / 100) * 2.6;

            smoothCtx.clearRect(0, 0, w, h);
            smoothCtx.save();
            smoothCtx.filter = `blur(${blurRadius.toFixed(1)}px) brightness(${(
              brightVal * 1.03
            ).toFixed(3)}) contrast(0.94)`;
            smoothCtx.drawImage(warpCanvas, 0, 0, w, h);
            smoothCtx.restore();

            // Blend smoothed skin layer using screen/soft-light + alpha over the face zone
            const retouchAlpha = Math.min(
              0.78,
              (b.acneBlemishRemoval / 100) * 0.48 + (b.skinSmoothness / 100) * 0.34
            );

            bgCtx.save();
            bgCtx.globalAlpha = retouchAlpha;
            bgCtx.drawImage(smoothCanvas, 0, 0, w, h);
            bgCtx.restore();

            // High-frequency feature recovery pass (keeps eyes, eyebrows, eyelashes & lips sharp!)
            if (b.handsomeBoost > 15) {
              bgCtx.save();
              bgCtx.globalCompositeOperation = 'overlay';
              bgCtx.globalAlpha = (b.handsomeBoost / 100) * 0.22;
              bgCtx.filter = 'contrast(1.35) saturate(0.9)';
              bgCtx.drawImage(warpCanvas, 0, 0, w, h);
              bgCtx.restore();
            }
          }

          // Step 5: 3D Studio Facial Contouring & T-Zone Highlight
          if (b.faceContourSlim > 10 || b.handsomeBoost > 20) {
            const contourStrength =
              ((b.faceContourSlim + b.handsomeBoost) / 200) * 0.22;
            bgCtx.save();
            // Soft T-zone / center face studio key light
            const keyLight = bgCtx.createRadialGradient(
              w * 0.5,
              h * 0.42,
              w * 0.04,
              w * 0.5,
              h * 0.45,
              w * 0.44
            );
            keyLight.addColorStop(0, `rgba(255, 250, 242, ${contourStrength.toFixed(3)})`);
            keyLight.addColorStop(0.55, 'rgba(255, 250, 242, 0)');
            keyLight.addColorStop(1, `rgba(15, 23, 42, ${(contourStrength * 0.85).toFixed(3)})`);
            bgCtx.fillStyle = keyLight;
            bgCtx.fillRect(0, 0, w, h);
            bgCtx.restore();
          }

          // Step 6: Virtual Background Compositing
          if (vBg === 'none') {
            outCtx.clearRect(0, 0, w, h);
            outCtx.drawImage(bgCanvas, 0, 0, w, h);
          } else {
            // Prepare person foreground with segmentation mask
            smoothCtx.clearRect(0, 0, w, h);
            if (segmentationReadyRef.current && maskCanvasRef.current) {
              // Feather the neural segmentation mask slightly for smooth hair/shoulder edges
              smoothCtx.save();
              smoothCtx.filter = 'blur(2.5px)';
              smoothCtx.drawImage(maskCanvasRef.current, 0, 0, w, h);
              smoothCtx.restore();
            } else {
              // Fallback smooth silhouette mask centered on presenter
              const sil = smoothCtx.createRadialGradient(
                w * 0.5,
                h * 0.56,
                w * 0.16,
                w * 0.5,
                h * 0.58,
                w * 0.44
              );
              sil.addColorStop(0, 'rgba(255,255,255,1)');
              sil.addColorStop(0.72, 'rgba(255,255,255,0.95)');
              sil.addColorStop(1, 'rgba(255,255,255,0)');
              smoothCtx.fillStyle = sil;
              smoothCtx.fillRect(0, 0, w, h);
            }

            // Keep only person pixels inside smoothCtx using source-in
            smoothCtx.save();
            smoothCtx.globalCompositeOperation = 'source-in';
            smoothCtx.drawImage(bgCanvas, 0, 0, w, h);
            smoothCtx.restore();

            // Draw virtual background scene onto outCtx first
            outCtx.clearRect(0, 0, w, h);
            drawVirtualBackgroundScene(outCtx, w, h, vBg, warpCanvas);

            // Draw segmented & retouched presenter on top of virtual background
            outCtx.drawImage(smoothCanvas, 0, 0, w, h);
          }
        }
      }

      renderLoopRef.current = requestAnimationFrame(renderFrame);
    };

    renderLoopRef.current = requestAnimationFrame(renderFrame);

    return () => {
      active = false;
      if (renderLoopRef.current) {
        cancelAnimationFrame(renderLoopRef.current);
      }
    };
  }, [isStudioOpen, isRecording]);

  // Start or stop camera + mic preview when studio opens
  const initCameraAndMic = useCallback(async () => {
    setErrorMessage(null);
    try {
      if (camStream) {
        camStream.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 640 },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      setCamStream(stream);
      setIsCamEnabled(true);
      setIsMicEnabled(true);

      if (rawVideoRef.current) {
        rawVideoRef.current.srcObject = stream;
        rawVideoRef.current.play().catch(() => {});
      }

      // Setup live microphone level meter
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioCtx();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        micAnalyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateMeter = () => {
          if (!micAnalyserRef.current) return;
          micAnalyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setMicVolume(Math.min(100, Math.round((avg / 90) * 100)));
          animFrameRef.current = requestAnimationFrame(updateMeter);
        };
        updateMeter();
      } catch {
        // Ignore audio meter errors
      }
    } catch {
      try {
        const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        setCamStream(audioOnlyStream);
        setIsCamEnabled(false);
        setIsMicEnabled(true);
        setErrorMessage(
          'Camera was not detected, but Microphone is active. You can still record with voice narration.'
        );
      } catch {
        setErrorMessage(
          'Camera and Microphone permissions are not granted yet. Please allow access in your browser.'
        );
      }
    }
  }, []);

  useEffect(() => {
    if (isStudioOpen && !camStream) {
      initCameraAndMic();
    }
  }, [isStudioOpen, camStream, initCameraAndMic]);

  useEffect(() => {
    if (rawVideoRef.current && camStream) {
      rawVideoRef.current.srcObject = camStream;
      rawVideoRef.current.play().catch(() => {});
    }
  }, [camStream, isCamEnabled, isStudioOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderLoopRef.current) cancelAnimationFrame(renderLoopRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Toggle Camera Track
  const toggleCamera = () => {
    if (!camStream) {
      initCameraAndMic();
      return;
    }
    const videoTracks = camStream.getVideoTracks();
    if (videoTracks.length > 0) {
      const nextState = !isCamEnabled;
      videoTracks.forEach((t) => {
        t.enabled = nextState;
      });
      setIsCamEnabled(nextState);
    }
  };

  // Toggle Microphone Track
  const toggleMic = () => {
    if (!camStream) {
      initCameraAndMic();
      return;
    }
    const audioTracks = camStream.getAudioTracks();
    if (audioTracks.length > 0) {
      const nextState = !isMicEnabled;
      audioTracks.forEach((t) => {
        t.enabled = nextState;
      });
      setIsMicEnabled(nextState);
    }
  };

  // Pick best supported MP4 / H264 MIME type
  const getBestMimeType = (): string => {
    const candidates = [
      'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
      'video/mp4;codecs=avc1,mp4a.40.2',
      'video/mp4;codecs=avc1',
      'video/mp4',
      'video/webm;codecs=h264,opus',
      'video/webm;codecs=vp9,opus',
      'video/webm',
    ];
    for (const mime of candidates) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(mime)) {
        return mime;
      }
    }
    return '';
  };

  // Pause / Resume Recording
  const handleTogglePause = useCallback(() => {
    const rec = mediaRecorderRef.current;
    if (!rec) return;
    if (rec.state === 'recording') {
      rec.pause();
      setIsPaused(true);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    } else if (rec.state === 'paused') {
      rec.resume();
      setIsPaused(false);
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, []);

  // Stop Recording & Open MP4 Preview
  const handleStopRecording = useCallback(() => {
    const rec = mediaRecorderRef.current;
    if (rec && rec.state !== 'inactive') {
      rec.stop();
    }
  }, []);

  // Notify parent header of live recording state so parent can provide a sleek header control while the floating dock is hidden
  useEffect(() => {
    if (onRecordingStateChange) {
      onRecordingStateChange({
        isRecording,
        isPaused,
        recordingSeconds,
        onTogglePause: handleTogglePause,
        onStopRecording: handleStopRecording,
        onToggleDock: () => setShowDockDuringRecord((prev) => !prev),
        isDockVisible: showDockDuringRecord,
      });
    }
  }, [
    isRecording,
    isPaused,
    recordingSeconds,
    showDockDuringRecord,
    handleTogglePause,
    handleStopRecording,
    onRecordingStateChange,
  ]);

  // Global hotkey Alt+S to Stop Recording cleanly without showing any UI
  useEffect(() => {
    if (!isRecording) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleStopRecording();
      } else if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        handleTogglePause();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isRecording, handleStopRecording, handleTogglePause]);

  // Start Recording Flow
  const handleStartRecording = async () => {
    setErrorMessage(null);
    setShowSettingsPanel(false);

    try {
      let activeUserStream = camStream;
      if (!activeUserStream) {
        try {
          activeUserStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setCamStream(activeUserStream);
        } catch {
          // Continue even if webcam denied
        }
      }

      // Request Tab / Screen Capture
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'browser',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: true,
        preferCurrentTab: true,
        selfBrowserSurface: 'include',
      } as any);

      displayStreamRef.current = displayStream;

      // Hide floating control dock BEFORE countdown finishes so it never appears in the recorded video!
      setShowDockDuringRecord(false);

      // Run 3-2-1 countdown
      for (let c = 3; c >= 1; c--) {
        setCountdown(c);
        await new Promise((r) => setTimeout(r, 900));
      }
      setCountdown(null);

      // Pause 150ms so countdown overlay completely unmounts before first video frame
      await new Promise((r) => setTimeout(r, 150));

      // Combine Display Video Track + Mixed Audio (Microphone + System Audio)
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const destination = audioCtx.createMediaStreamDestination();
      let hasAnyAudio = false;

      if (activeUserStream && activeUserStream.getAudioTracks().length > 0) {
        const micSource = audioCtx.createMediaStreamSource(
          new MediaStream([activeUserStream.getAudioTracks()[0]])
        );
        const micGain = audioCtx.createGain();
        micGain.gain.value = 1.15;
        micSource.connect(micGain).connect(destination);
        hasAnyAudio = true;
      }

      if (displayStream.getAudioTracks().length > 0) {
        const sysSource = audioCtx.createMediaStreamSource(
          new MediaStream([displayStream.getAudioTracks()[0]])
        );
        sysSource.connect(destination);
        hasAnyAudio = true;
      }

      const combinedTracks: MediaStreamTrack[] = [
        ...displayStream.getVideoTracks(),
        ...(hasAnyAudio ? destination.stream.getAudioTracks() : []),
      ];

      const combinedStream = new MediaStream(combinedTracks);
      const mimeType = getBestMimeType();

      const recorder = mimeType
        ? new MediaRecorder(combinedStream, {
            mimeType,
            videoBitsPerSecond: 4500000,
          })
        : new MediaRecorder(combinedStream);

      recordedChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalType = mimeType || 'video/mp4';
        const blob = new Blob(recordedChunksRef.current, { type: finalType });
        const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
        setRecordedFileSizeMB(sizeMB);

        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);
        setIsRecording(false);
        setIsPaused(false);
        setShowDockDuringRecord(false);

        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }

        if (displayStreamRef.current) {
          displayStreamRef.current.getTracks().forEach((t) => t.stop());
          displayStreamRef.current = null;
        }
      };

      displayStream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== 'inactive') {
          recorder.stop();
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(1000);
      setIsRecording(true);
      setIsPaused(false);
      setRecordingSeconds(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      setCountdown(null);
      if (err?.name === 'NotAllowedError') {
        setErrorMessage(
          'Screen recording was cancelled. Please select "This Tab" in the browser prompt and click Share.'
        );
      } else {
        setErrorMessage(
          'Could not start screen capture. If you are inside an embedded preview, open the app in a full browser tab to enable screen recording.'
        );
      }
    }
  };

  // Download Recorded Video as .mp4
  const handleDownloadMp4 = () => {
    if (!recordedBlobUrl) return;
    const cleanName =
      customFileName.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'Python_for_AI_Lecture';
    const a = document.createElement('a');
    a.href = recordedBlobUrl;
    a.download = `${cleanName}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Close Studio completely
  const handleFullClose = () => {
    if (isRecording) {
      handleStopRecording();
    }
    if (camStream) {
      camStream.getTracks().forEach((t) => t.stop());
      setCamStream(null);
    }
    onCloseStudio();
  };

  // Apply 1-click BeautyPlus Presets
  const applyBeautyPreset = (
    preset: 'natural' | 'handsome-pro' | 'flawless-clear' | 'bright-studio' | 'reset'
  ) => {
    if (preset === 'natural') {
      setBeauty({
        acneBlemishRemoval: 45,
        skinSmoothness: 40,
        faceContourSlim: 25,
        handsomeBoost: 40,
        skinBrightening: 25,
        colorTone: 'natural',
      });
    } else if (preset === 'handsome-pro') {
      setBeauty({
        acneBlemishRemoval: 75,
        skinSmoothness: 60,
        faceContourSlim: 65,
        handsomeBoost: 85,
        skinBrightening: 40,
        colorTone: 'warm-glow',
      });
    } else if (preset === 'flawless-clear') {
      setBeauty({
        acneBlemishRemoval: 95,
        skinSmoothness: 85,
        faceContourSlim: 50,
        handsomeBoost: 65,
        skinBrightening: 55,
        colorTone: 'natural',
      });
    } else if (preset === 'bright-studio') {
      setBeauty({
        acneBlemishRemoval: 70,
        skinSmoothness: 65,
        faceContourSlim: 45,
        handsomeBoost: 60,
        skinBrightening: 80,
        colorTone: 'cool-crisp',
      });
    } else {
      setBeauty({
        acneBlemishRemoval: 0,
        skinSmoothness: 0,
        faceContourSlim: 0,
        handsomeBoost: 0,
        skinBrightening: 0,
        colorTone: 'natural',
      });
    }
  };

  const handleUploadCustomBg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomBgUrl(url);
    setVirtualBg('custom');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const positionClasses: Record<CamPosition, string> = {
    'bottom-right': 'bottom-16 right-6',
    'bottom-left': 'bottom-16 left-6',
    'top-right': 'top-16 right-6',
    'top-left': 'top-16 left-6',
  };

  const getSizeAndShapeClass = () => {
    if (camShape === 'circle') {
      if (camSize === 'sm') return 'w-28 h-28 sm:w-32 sm:h-32 rounded-full';
      if (camSize === 'lg') return 'w-48 h-48 sm:w-56 sm:h-56 rounded-full';
      return 'w-36 h-36 sm:w-44 sm:h-44 rounded-full';
    }
    if (camShape === 'portrait') {
      if (camSize === 'sm') return 'w-28 h-36 sm:w-32 sm:h-40 rounded-2xl';
      if (camSize === 'lg') return 'w-44 h-56 sm:w-52 sm:h-64 rounded-3xl';
      return 'w-36 h-44 sm:w-40 sm:h-52 rounded-2xl';
    }
    if (camSize === 'sm') return 'w-40 h-28 sm:w-44 sm:h-28 rounded-2xl';
    if (camSize === 'lg') return 'w-64 h-44 sm:w-72 sm:h-48 rounded-3xl';
    return 'w-52 h-36 sm:w-60 sm:h-40 rounded-2xl';
  };

  // Determine whether the floating control dock should be visible:
  // Before recording starts -> visible so user can configure Beauty/Background & click Start
  // During recording -> HIDDEN by default so the slide view is 100% clean, unless user toggles it open
  const isControlDockVisible =
    (isStudioOpen && !isRecording) || (isRecording && showDockDuringRecord);

  if (!isStudioOpen && !isRecording && !recordedBlobUrl) return null;

  return (
    <>
      {/* Hidden raw video source feeding the 30fps BeautyPlus + Virtual Background Canvas */}
      <video ref={rawVideoRef} autoPlay playsInline muted className="hidden" />

      {/* 1. 3-2-1 Countdown Overlay before Recording Starts */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-slate-950/75 backdrop-blur-md select-none"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-36 h-36 rounded-full bg-gradient-to-br from-[#15284f] to-[#1e3a8a] border-4 border-[#f59e0b] shadow-2xl flex items-center justify-center text-6xl font-black text-white"
            >
              {countdown}
            </motion.div>
            <p className="mt-5 text-sm font-mono font-bold uppercase tracking-widest text-amber-300">
              Get Ready... Recording Starts & Controls Will Auto-Hide
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Draggable Floating Presenter Camera Overlay (With Live BeautyPlus + Virtual Background Canvas) */}
      <AnimatePresence>
        {(isStudioOpen || isRecording) && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`fixed z-40 ${positionClasses[camPosition]} cursor-grab active:cursor-grabbing group select-none`}
            title="Drag to move presenter camera anywhere on screen"
          >
            <div
              className={`relative ${getSizeAndShapeClass()} p-1 bg-gradient-to-tr from-[#15284f] via-[#f59e0b] to-[#15284f] shadow-2xl`}
            >
              {/* Processed Canvas Container */}
              <div
                className={`relative w-full h-full overflow-hidden bg-slate-900 ${
                  camShape === 'circle' ? 'rounded-full' : 'rounded-2xl'
                } border-2 border-white flex items-center justify-center`}
              >
                {camStream && isCamEnabled ? (
                  <canvas
                    ref={outputCanvasRef}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-1.5">
                      <User className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 font-semibold">
                      {presenterName}
                    </span>
                    <span className="text-[9px] text-slate-500">Voice Only</span>
                  </div>
                )}

                {/* Subtle Live Voice Waveform Indicator inside Camera Bubble */}
                {isMicEnabled && (
                  <div className="absolute bottom-2 right-2.5 flex items-end gap-0.5 bg-slate-950/70 backdrop-blur-xs px-1.5 py-1 rounded-full border border-white/15">
                    {[0.4, 0.8, 1, 0.6].map((mult, idx) => {
                      const h = Math.max(
                        3,
                        Math.min(12, Math.round((micVolume / 100) * 12 * mult))
                      );
                      return (
                        <div
                          key={idx}
                          style={{ height: `${h}px` }}
                          className="w-0.5 rounded-full bg-emerald-400 transition-all duration-75"
                        />
                      );
                    })}
                  </div>
                )}

                {!isMicEnabled && (
                  <div className="absolute bottom-2 right-2.5 bg-rose-600/90 text-white p-1 rounded-full shadow">
                    <MicOff className="w-3 h-3" />
                  </div>
                )}

                {/* Hover Controls on Camera Bubble (Only visible when hovering directly over camera) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-slate-950/80 text-white text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 pointer-events-none whitespace-nowrap">
                  <Move className="w-2.5 h-2.5 text-[#f59e0b]" />
                  <span>Drag Camera</span>
                </div>
              </div>

              {/* Presenter Name Badge Below Camera */}
              {showPresenterBadge && presenterName.trim() && (
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-[#15284f] text-white border border-[#f59e0b] shadow-lg text-[10px] font-mono font-bold tracking-wide flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isRecording ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'
                    }`}
                  />
                  <span>{presenterName}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Studio Control Dock (Auto-Hidden During Recording so Viewers Focus 100% on the Slide!) */}
      <AnimatePresence>
        {isControlDockVisible && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="fixed top-14 right-6 z-50 flex flex-col items-end gap-2 select-none"
          >
            <div className="flex items-center gap-2 bg-[#15284f]/95 text-white px-3.5 py-2 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-md">
              {/* Status / Timer */}
              {isRecording ? (
                <div className="flex items-center gap-2 pr-2 border-r border-slate-700">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isPaused ? 'bg-amber-400' : 'bg-rose-500 animate-ping'
                    }`}
                  />
                  <span className="font-mono text-xs font-extrabold tracking-wider text-rose-300">
                    {isPaused ? 'PAUSED' : 'REC'} {formatTime(recordingSeconds)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 pr-2 border-r border-slate-700">
                  <Film className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span className="text-xs font-bold text-amber-300">Recording Studio</span>
                </div>
              )}

              {/* Camera On/Off Toggle */}
              <button
                onClick={toggleCamera}
                className={`p-1.5 rounded-xl border transition ${
                  isCamEnabled
                    ? 'bg-slate-800/90 border-slate-600 text-emerald-400 hover:bg-slate-700'
                    : 'bg-rose-950/70 border-rose-700/60 text-rose-300 hover:bg-rose-900/80'
                }`}
                title={isCamEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isCamEnabled ? (
                  <Video className="w-3.5 h-3.5" />
                ) : (
                  <VideoOff className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Mic On/Off Toggle */}
              <button
                onClick={toggleMic}
                className={`p-1.5 rounded-xl border transition ${
                  isMicEnabled
                    ? 'bg-slate-800/90 border-slate-600 text-emerald-400 hover:bg-slate-700'
                    : 'bg-rose-950/70 border-rose-700/60 text-rose-300 hover:bg-rose-900/80'
                }`}
                title={isMicEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicEnabled ? (
                  <Mic className="w-3.5 h-3.5" />
                ) : (
                  <MicOff className="w-3.5 h-3.5" />
                )}
              </button>

              {/* AI BeautyPlus & Virtual Background Studio Button */}
              <button
                onClick={() => {
                  setActiveSettingsTab('beauty');
                  setShowSettingsPanel((prev) => !prev);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                  showSettingsPanel && activeSettingsTab === 'beauty'
                    ? 'bg-[#f59e0b] text-[#15284f] border-[#f59e0b]'
                    : 'bg-slate-800/90 border-slate-600 text-amber-300 hover:bg-slate-700'
                }`}
                title="AI Face Beauty, Contour, Acne Eraser & Virtual Background"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Beauty & BG</span>
              </button>

              {/* Camera Layout Settings Button */}
              <button
                onClick={() => {
                  setActiveSettingsTab('layout');
                  setShowSettingsPanel((prev) => !prev);
                }}
                className={`p-1.5 rounded-xl border transition ${
                  showSettingsPanel && activeSettingsTab === 'layout'
                    ? 'bg-[#f59e0b] text-[#15284f] border-[#f59e0b]'
                    : 'bg-slate-800/90 border-slate-600 text-slate-200 hover:bg-slate-700'
                }`}
                title="Camera Frame, Size & Position Settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>

              {/* Primary Action Buttons: Start OR Pause + Stop */}
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-bold text-xs shadow-lg shadow-rose-900/40 transition cursor-pointer"
                >
                  <CircleDot className="w-3.5 h-3.5" />
                  <span>Start Recording (MP4)</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleTogglePause}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition"
                    title={isPaused ? 'Resume Recording' : 'Pause Recording'}
                  >
                    {isPaused ? (
                      <Play className="w-3.5 h-3.5" />
                    ) : (
                      <Pause className="w-3.5 h-3.5" />
                    )}
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </button>

                  <button
                    onClick={handleStopRecording}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition cursor-pointer"
                    title="Finish Recording & Save MP4 Video"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>Finish & Save</span>
                  </button>

                  <button
                    onClick={() => setShowDockDuringRecord(false)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 text-xs"
                    title="Hide this bar during recording"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Close Studio Button (when not actively recording) */}
              {!isRecording && (
                <button
                  onClick={handleFullClose}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-1"
                  title="Close Recording Studio"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Error / Guidance Banner */}
            {errorMessage && (
              <div className="max-w-sm bg-amber-950/95 border border-amber-500/60 text-amber-100 px-3.5 py-2.5 rounded-xl shadow-xl text-xs flex items-start gap-2 backdrop-blur-md">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{errorMessage}</div>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="text-amber-300 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Expandable Studio Settings Popover: Tabs for [1] BeautyPlus Retouch, [2] Virtual Background, [3] Camera Layout */}
            <AnimatePresence>
              {showSettingsPanel && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="w-96 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl text-slate-800 space-y-3.5 max-h-[80vh] overflow-y-auto"
                >
                  {/* Top Tabs */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setActiveSettingsTab('beauty')}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                          activeSettingsTab === 'beauty'
                            ? 'bg-[#15284f] text-[#f59e0b] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Face Beauty</span>
                      </button>

                      <button
                        onClick={() => setActiveSettingsTab('background')}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                          activeSettingsTab === 'background'
                            ? 'bg-[#15284f] text-[#f59e0b] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Background</span>
                      </button>

                      <button
                        onClick={() => setActiveSettingsTab('layout')}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                          activeSettingsTab === 'layout'
                            ? 'bg-[#15284f] text-[#f59e0b] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Sliders className="w-3 h-3" />
                        <span>Frame</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setShowSettingsPanel(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* TAB 1: BEAUTYPLUS FACE RETOUCH & CONTOUR STUDIO */}
                  {activeSettingsTab === 'beauty' && (
                    <div className="space-y-3.5">
                      {/* Quick Presets */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-extrabold text-[#15284f] uppercase tracking-wider">
                            BeautyPlus Presets
                          </span>
                          <button
                            onClick={() => applyBeautyPreset('reset')}
                            className="text-[10px] font-semibold text-rose-600 hover:underline"
                          >
                            Reset (0%)
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: 'natural', label: 'Natural' },
                            { id: 'handsome-pro', label: 'Handsome' },
                            { id: 'flawless-clear', label: 'No Acne' },
                            { id: 'bright-studio', label: 'Bright Glow' },
                          ].map((p) => (
                            <button
                              key={p.id}
                              onClick={() => applyBeautyPreset(p.id as any)}
                              className="py-1.5 px-2 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-[#15284f] hover:text-[#f59e0b] text-slate-700 border border-slate-200 transition"
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 5 Real-Time Retouch Sliders */}
                      <div className="space-y-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        {/* 1. Acne, Pimple & Blackhead Eraser */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-slate-700">
                              Acne, Blemish & Blackhead Eraser
                            </span>
                            <span className="font-mono font-bold text-[#b45309]">
                              {beauty.acneBlemishRemoval}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={beauty.acneBlemishRemoval}
                            onChange={(e) =>
                              setBeauty((prev) => ({
                                ...prev,
                                acneBlemishRemoval: Number(e.target.value),
                              }))
                            }
                            className="w-full accent-[#15284f] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 2. Skin Smoothness & Pore Refiner */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-slate-700">
                              Skin Smoothness & Pore Refiner
                            </span>
                            <span className="font-mono font-bold text-[#b45309]">
                              {beauty.skinSmoothness}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={beauty.skinSmoothness}
                            onChange={(e) =>
                              setBeauty((prev) => ({
                                ...prev,
                                skinSmoothness: Number(e.target.value),
                              }))
                            }
                            className="w-full accent-[#15284f] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 3. Face Contour & Jawline Slimming */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-slate-700">
                              Face Contour & Jawline Sculpting
                            </span>
                            <span className="font-mono font-bold text-[#b45309]">
                              {beauty.faceContourSlim}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={beauty.faceContourSlim}
                            onChange={(e) =>
                              setBeauty((prev) => ({
                                ...prev,
                                faceContourSlim: Number(e.target.value),
                              }))
                            }
                            className="w-full accent-[#15284f] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 4. Handsome & Facial Feature Definition */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-slate-700">
                              Handsome Boost & Eye Clarity
                            </span>
                            <span className="font-mono font-bold text-[#b45309]">
                              {beauty.handsomeBoost}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={beauty.handsomeBoost}
                            onChange={(e) =>
                              setBeauty((prev) => ({
                                ...prev,
                                handsomeBoost: Number(e.target.value),
                              }))
                            }
                            className="w-full accent-[#15284f] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 5. Skin Brightening / Radiance */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-slate-700">
                              Skin Brightening & Studio Glow
                            </span>
                            <span className="font-mono font-bold text-[#b45309]">
                              {beauty.skinBrightening}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={beauty.skinBrightening}
                            onChange={(e) =>
                              setBeauty((prev) => ({
                                ...prev,
                                skinBrightening: Number(e.target.value),
                              }))
                            }
                            className="w-full accent-[#15284f] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Color Tone Filter */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block">
                          Studio Color Tone
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: 'natural', label: 'Natural' },
                            { id: 'warm-glow', label: 'Warm' },
                            { id: 'cool-crisp', label: 'Cool HD' },
                            { id: 'cinema', label: 'Cinema' },
                          ].map((tone) => (
                            <button
                              key={tone.id}
                              onClick={() =>
                                setBeauty((prev) => ({
                                  ...prev,
                                  colorTone: tone.id as ColorToneId,
                                }))
                              }
                              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition ${
                                beauty.colorTone === tone.id
                                  ? 'bg-[#15284f] text-[#f59e0b] border-[#15284f]'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {tone.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: AI VIRTUAL BACKGROUND */}
                  {activeSettingsTab === 'background' && (
                    <div className="space-y-3">
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Replace or blur your physical room background in real time.
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'none', label: 'Original Room', preview: 'bg-slate-200 text-slate-700' },
                          {
                            id: 'blur-soft',
                            label: 'Soft Bokeh Blur',
                            preview: 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800',
                          },
                          {
                            id: 'blur-strong',
                            label: 'Studio Pro Blur',
                            preview: 'bg-gradient-to-br from-slate-400 to-slate-500 text-white',
                          },
                          {
                            id: 'ai-lab',
                            label: 'AI Research Lab',
                            preview: 'bg-gradient-to-br from-[#0b1528] via-[#15284f] to-cyan-900 text-amber-300',
                          },
                          {
                            id: 'professor-office',
                            label: 'Professor Bookshelf',
                            preview: 'bg-gradient-to-br from-[#3b2818] to-[#1c120b] text-amber-200',
                          },
                          {
                            id: 'keynote-stage',
                            label: 'Keynote Dark Stage',
                            preview: 'bg-gradient-to-br from-slate-900 to-slate-950 text-white',
                          },
                          {
                            id: 'clean-studio',
                            label: 'Bright White Studio',
                            preview: 'bg-gradient-to-br from-white to-slate-200 text-[#15284f]',
                          },
                        ].map((bg) => (
                          <button
                            key={bg.id}
                            onClick={() => setVirtualBg(bg.id as VirtualBgId)}
                            className={`relative h-14 rounded-xl p-2.5 text-left font-bold text-[11px] border-2 transition flex items-end justify-between overflow-hidden ${
                              bg.preview
                            } ${
                              virtualBg === bg.id
                                ? 'border-[#f59e0b] ring-2 ring-[#f59e0b]/40 scale-[1.01]'
                                : 'border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            <span>{bg.label}</span>
                            {virtualBg === bg.id && (
                              <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-[#15284f] flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}
                          </button>
                        ))}

                        {/* Upload Custom Image Background */}
                        <label
                          className={`relative h-14 rounded-xl p-2.5 text-left font-bold text-[11px] border-2 border-dashed transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            virtualBg === 'custom'
                              ? 'border-[#f59e0b] bg-amber-50 text-[#15284f]'
                              : 'border-slate-300 hover:border-[#15284f] bg-slate-50 text-slate-600'
                          }`}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Custom BG</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadCustomBg}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CAMERA FRAME, SIZE & POSITION */}
                  {activeSettingsTab === 'layout' && (
                    <div className="space-y-3">
                      {/* Presenter Name Input */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block">
                          Presenter Name Badge
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={presenterName}
                            onChange={(e) => setPresenterName(e.target.value)}
                            placeholder="Lecturer Name..."
                            className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#15284f]"
                          />
                          <button
                            onClick={() => setShowPresenterBadge((p) => !p)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition ${
                              showPresenterBadge
                                ? 'bg-[#15284f] text-white border-[#15284f]'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {showPresenterBadge ? 'Shown' : 'Hidden'}
                          </button>
                        </div>
                      </div>

                      {/* Camera Shape */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block">
                          Camera Frame Shape
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: 'circle', label: 'Circle' },
                            { id: 'rounded', label: 'Landscape' },
                            { id: 'portrait', label: 'Portrait' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setCamShape(item.id as CamShape)}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition ${
                                camShape === item.id
                                  ? 'bg-[#15284f] text-[#f59e0b] border-[#15284f]'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Camera Size */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block">
                          Camera Size
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: 'sm', label: 'Small' },
                            { id: 'md', label: 'Medium' },
                            { id: 'lg', label: 'Large' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setCamSize(item.id as CamSize)}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition ${
                                camSize === item.id
                                  ? 'bg-[#15284f] text-[#f59e0b] border-[#15284f]'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Corner Position */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block">
                          Screen Corner (Or Drag Camera Directly)
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: 'bottom-right', label: 'Bottom Right' },
                            { id: 'bottom-left', label: 'Bottom Left' },
                            { id: 'top-right', label: 'Top Right' },
                            { id: 'top-left', label: 'Top Left' },
                          ].map((pos) => (
                            <button
                              key={pos.id}
                              onClick={() => setCamPosition(pos.id as CamPosition)}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition ${
                                camPosition === pos.id
                                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {pos.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mirror Toggle */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                        <span className="text-[11px] text-slate-600 font-medium">
                          Mirror Camera Feed
                        </span>
                        <button
                          onClick={() => setIsMirrored((m) => !m)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                            isMirrored
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {isMirrored ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Recorded Video Preview & MP4 Download Modal */}
      <AnimatePresence>
        {recordedBlobUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#15284f] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f59e0b] text-[#15284f] flex items-center justify-center font-bold shadow">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold tracking-wide flex items-center gap-2">
                      <span>Lecture Video Recording Ready!</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {formatTime(recordingSeconds)} • {recordedFileSizeMB} MB
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Preview your recorded presentation, live interactions, voice explanation, and presenter camera before saving.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setRecordedBlobUrl(null)}
                  className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Preview */}
              <div className="p-6 bg-slate-50 flex-1 overflow-y-auto space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-200 shadow-lg aspect-video">
                  <video
                    src={recordedBlobUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Filename & Download Action */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-bold text-[#15284f] block">
                      Video Filename (.mp4) to Share with Students
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={customFileName}
                        onChange={(e) => setCustomFileName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-l-xl text-slate-800 focus:outline-none focus:border-[#15284f]"
                      />
                      <span className="px-3 py-2 text-xs font-mono font-bold bg-slate-200 border border-l-0 border-slate-300 rounded-r-xl text-slate-700">
                        .mp4
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        setRecordedBlobUrl(null);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Record Again</span>
                    </button>

                    <button
                      onClick={handleDownloadMp4}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#15284f] to-[#1e3a8a] hover:from-[#0f1d3a] hover:to-[#15284f] text-[#f59e0b] font-extrabold text-xs shadow-lg transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Save Video (.MP4)</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
