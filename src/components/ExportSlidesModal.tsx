import React, { useState, useRef } from 'react';
import {
  X,
  ExternalLink,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  FileText,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { toJpeg } from 'html-to-image';
import { MotionConfig } from 'motion/react';
import { User } from 'firebase/auth';
import { googleSignIn, logout } from '../services/firebaseAuth';
import { exportToGoogleSlides, GoogleSlidesExportProgress } from '../services/googleSlides';
import { SlideData } from '../types/slides';
import { SlideViewer } from './SlideViewer';

interface ExportSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  user: User | null;
  accessToken: string | null;
  onAuthSuccess: (user: User, token: string) => void;
  onAuthLogout: () => void;
}

export const ExportSlidesModal: React.FC<ExportSlidesModalProps> = ({
  isOpen,
  onClose,
  slides,
  user,
  accessToken,
  onAuthSuccess,
  onAuthLogout,
}) => {
  // Full-Fidelity PDF Export State
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState<{
    current: number;
    total: number;
    percent: number;
    statusText: string;
  } | null>(null);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [renderIndex, setRenderIndex] = useState<number | null>(null);
  const captureContainerRef = useRef<HTMLDivElement | null>(null);
  const scalerContainerRef = useRef<HTMLDivElement | null>(null);

  // Google Slides State
  const [isExportingGoogle, setIsExportingGoogle] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [googleProgress, setGoogleProgress] = useState<GoogleSlidesExportProgress | null>(null);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Handle Full-Fidelity PDF Export
  const handleExportPdf = async () => {
    if (isExportingPdf) return;
    try {
      setIsExportingPdf(true);
      setError(null);
      setPdfSuccess(false);

      const total = slides.length;
      const pdfWidth = 1440;
      const pdfHeight = 810;

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [pdfWidth, pdfHeight],
        hotfixes: ['px_scaling'],
      });

      for (let i = 0; i < total; i++) {
        setRenderIndex(i);
        setPdfProgress({
          current: i + 1,
          total,
          percent: Math.round(((i + 1) / total) * 100),
          statusText: `Capturing slide ${i + 1} of ${total}: ${slides[i].title.slice(0, 30)}...`,
        });

        // Wait for React DOM to paint the new slide & layout
        await new Promise((resolve) => setTimeout(resolve, 220));

        // Auto-scale slide content to fit precisely inside 1440x810 without top/bottom cropping
        if (scalerContainerRef.current) {
          const el = scalerContainerRef.current;
          el.style.transform = 'none';
          el.style.marginTop = '0px';

          // Force browser reflow to read actual unscaled height
          void el.offsetHeight;
          const naturalHeight = el.scrollHeight;
          const targetHeight = 810;
          const safePadding = 36;
          const maxAvailableHeight = targetHeight - safePadding;

          let scale = 1;
          if (naturalHeight > maxAvailableHeight) {
            scale = maxAvailableHeight / naturalHeight;
          }

          el.style.transformOrigin = 'top center';
          el.style.transform = `scale(${scale})`;

          // Center vertically within the 1440x810 canvas
          const effectiveHeight = naturalHeight * scale;
          const topMargin = Math.max(16, Math.round((targetHeight - effectiveHeight) / 2));
          el.style.marginTop = `${topMargin}px`;
        }

        // Brief delay for CSS transform to settle before rasterization
        await new Promise((resolve) => setTimeout(resolve, 40));

        if (captureContainerRef.current) {
          let imgData: string;
          try {
            imgData = await toJpeg(captureContainerRef.current, {
              quality: 0.94,
              width: pdfWidth,
              height: pdfHeight,
              backgroundColor: '#f8fafc',
              pixelRatio: 1.25,
              skipFonts: true,
              fontEmbedCSS: '',
            });
          } catch (firstErr) {
            console.warn(`Retry slide ${i + 1} capture with standard pixel ratio:`, firstErr);
            imgData = await toJpeg(captureContainerRef.current, {
              quality: 0.90,
              width: pdfWidth,
              height: pdfHeight,
              backgroundColor: '#f8fafc',
              pixelRatio: 1,
              skipFonts: true,
              fontEmbedCSS: '',
            });
          }

          if (i > 0) {
            pdf.addPage([pdfWidth, pdfHeight], 'landscape');
          }
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        }
      }

      setPdfProgress({
        current: total,
        total,
        percent: 100,
        statusText: 'Finalizing PDF document...',
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const fileName = 'Python_for_AI_Lecture_Deck_Full.pdf';
      pdf.save(fileName);

      setPdfSuccess(true);
      setRenderIndex(null);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to export PDF presentation.');
      setRenderIndex(null);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Handle Google Auth
  const handleSignIn = async () => {
    if (isSigningIn) return;
    try {
      setIsSigningIn(true);
      setError(null);
      const res = await googleSignIn();
      if (res) {
        onAuthSuccess(res.user, res.accessToken);
      }
    } catch (err: any) {
      if (
        err?.code === 'auth/cancelled-popup-request' ||
        err?.code === 'auth/popup-closed-by-user' ||
        err?.code === 'auth/user-cancelled' ||
        err?.message?.includes('cancelled-popup-request') ||
        err?.message?.includes('popup-closed-by-user')
      ) {
        return;
      }
      console.error(err);
      setError(err?.message || 'Google sign-in failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  // Handle Google Slides Export
  const handleStartGoogleExport = () => {
    if (!accessToken) {
      setError('Please sign in with Google first.');
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmGoogleExport = async () => {
    setShowConfirmDialog(false);
    setIsExportingGoogle(true);
    setError(null);
    setCreatedUrl(null);

    try {
      const res = await exportToGoogleSlides(slides, accessToken!, (progress) => {
        setGoogleProgress(progress);
      });
      setCreatedUrl(res.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Export to Google Slides failed.');
    } finally {
      setIsExportingGoogle(false);
    }
  };

  const handleDownloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(slides, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'python-for-ai-lecture-deck.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Hidden Offscreen 16:9 1440x810 Render Stage for Pixel-Perfect Full-Fidelity PDF Capture */}
      <div
        ref={captureContainerRef}
        className="pdf-capture-stage"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '1440px',
          height: '810px',
          overflow: 'hidden',
          backgroundColor: '#f8fafc',
          zIndex: -999,
          pointerEvents: 'none',
        }}
      >
        {renderIndex !== null && slides[renderIndex] && (
          <MotionConfig reducedMotion="always">
            <div
              ref={scalerContainerRef}
              className="w-[1440px] flex flex-col items-center justify-start bg-[#f8fafc] text-slate-800"
              style={{
                transformOrigin: 'top center',
              }}
            >
              <div className="w-[1360px] max-w-[1360px] flex flex-col items-center justify-start">
                <SlideViewer
                  slide={slides[renderIndex]}
                  revealedBulletCount={99}
                  onOpenImageGen={() => {}}
                  onNextPointOrSlide={() => {}}
                  theme="slideegg"
                />
              </div>
            </div>
          </MotionConfig>
        )}
      </div>

      {/* Export Modal UI */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
        <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-800 flex flex-col max-h-[92vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#15284f] text-[#f59e0b] flex items-center justify-center font-bold text-lg shadow-sm">
                📑
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#15284f]">
                  Export Lecture Presentation
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {slides.length} Slides • Pixel-Perfect PDF & Google Slides
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isExportingPdf}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition disabled:opacity-30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Google Workspace Confirmation Dialog */}
          {showConfirmDialog ? (
            <div className="py-6 space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
                <h4 className="font-bold text-sm flex items-center gap-2 mb-2 text-[#b45309]">
                  <AlertCircle className="w-4 h-4 text-[#b45309]" />
                  Confirm Google Slides Creation
                </h4>
                <p className="text-xs leading-relaxed text-slate-700">
                  This will create a brand new presentation in your Google Drive with all{' '}
                  <strong>{slides.length} slides</strong>, formatted text boxes, and full speaker notes:
                </p>
                <ul className="mt-2 text-xs list-disc list-inside space-y-1 text-slate-700 font-mono">
                  <li>Deck Title: &ldquo;Python for AI - BSc Computer Engineering&rdquo;</li>
                  <li>Slides Count: {slides.length} slides</li>
                  <li>Destination: Connected Google Drive of {user?.email}</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmGoogleExport}
                  className="px-5 py-2.5 text-xs font-bold bg-[#15284f] hover:bg-[#1e3a8a] text-white rounded-xl transition shadow-md"
                >
                  Yes, Create in Google Slides
                </button>
              </div>
            </div>
          ) : (
            <div className="py-5 space-y-5">
              {/* PRIMARY OPTION: Full-Fidelity Pixel-Perfect PDF Export */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/70 via-red-50/40 to-amber-50/30 border-2 border-rose-300 shadow-sm space-y-3.5 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#15284f] flex items-center gap-2">
                        <span>Full-Fidelity PDF Presentation (.pdf)</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-100 text-rose-800 border border-rose-300 font-bold">
                          100% Identical
                        </span>
                      </h4>
                      <p className="text-xs text-slate-600">
                        Captures all {slides.length} slides exactly as displayed in this app: MacBook VS Code, 3D amphitheater characters, Python compilers, diagrams, and SlideEgg styling.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PDF Live Progress Bar */}
                {isExportingPdf && pdfProgress && (
                  <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-rose-700 font-bold flex items-center gap-1.5 truncate max-w-[80%]">
                        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                        <span className="truncate">{pdfProgress.statusText}</span>
                      </span>
                      <span className="font-extrabold text-[#15284f]">{pdfProgress.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-600 via-[#15284f] to-[#f59e0b] h-full transition-all duration-200"
                        style={{
                          width: `${pdfProgress.percent}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* PDF Success Notification */}
                {pdfSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Full-fidelity PDF <strong>Python_for_AI_Lecture_Deck_Full.pdf</strong> has been downloaded to your computer!
                    </span>
                  </div>
                )}

                <button
                  onClick={handleExportPdf}
                  disabled={isExportingPdf}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>
                    {isExportingPdf
                      ? 'Generating Full-Fidelity PDF...'
                      : `Download Presentation PDF (All ${slides.length} Slides)`}
                  </span>
                </button>
              </div>

              {/* SECONDARY OPTION: Sync to Google Slides */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-3.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                      G
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#15284f]">
                        Google Slides Sync
                      </h4>
                      <p className="text-xs text-slate-500">
                        Create directly in your connected Google Drive for online editing.
                      </p>
                    </div>
                  </div>

                  {user && (
                    <button
                      onClick={async () => {
                        await logout();
                        onAuthLogout();
                      }}
                      className="text-xs text-slate-400 hover:text-rose-600 transition"
                    >
                      Disconnect
                    </button>
                  )}
                </div>

                {/* Google Auth Status */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Google Account:</span>
                    {user ? (
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{user.email}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Not connected</span>
                    )}
                  </div>

                  {!user && (
                    <button
                      onClick={handleSignIn}
                      disabled={isSigningIn}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold transition shadow-xs disabled:opacity-60 cursor-pointer"
                    >
                      {isSigningIn ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          />
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          />
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          />
                        </svg>
                      )}
                      <span>Sign in with Google</span>
                    </button>
                  )}
                </div>

                {/* Google Slides Export Progress */}
                {isExportingGoogle && googleProgress && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-800 font-bold flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        {googleProgress.step}
                      </span>
                      <span className="font-extrabold text-blue-900">{googleProgress.percent}%</span>
                    </div>
                    <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all duration-200"
                        style={{ width: `${googleProgress.percent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Created URL */}
                {createdUrl && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Created in your Google Drive!</span>
                    </div>
                    <a
                      href={createdUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-xs"
                    >
                      <span>Open Slides</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <button
                  onClick={handleStartGoogleExport}
                  disabled={!user || isExportingGoogle}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#15284f] hover:bg-[#1e3a8a] text-white font-bold text-xs transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                >
                  {isExportingGoogle ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  <span>Export to Google Slides</span>
                </button>
              </div>

              {error && (
                <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
                  {error}
                </div>
              )}

              {/* Offline JSON Backup */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500 border-t border-slate-200">
                <span>Offline Deck JSON Backup</span>
                <button
                  onClick={handleDownloadJSON}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
