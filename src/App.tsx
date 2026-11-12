/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  Grid,
  Share2,
  Volume2,
  Sparkles,
  Play,
  RotateCcw,
  PanelLeft,
  Video,
  Square,
  Pause,
  Sliders,
  Download,
} from 'lucide-react';
import { SLIDES_DATA } from './data/slidesData';
import { SlideData } from './types/slides';
import { ThreeCanvas } from './components/ThreeCanvas';
import { SlideViewer } from './components/SlideViewer';
import { SpeakerNotesModal } from './components/SpeakerNotesModal';
import { SlideGridDrawer } from './components/SlideGridDrawer';
import { ExportSlidesModal } from './components/ExportSlidesModal';
import { ImageGenModal } from './components/ImageGenModal';
import { PresentationRecorder } from './components/PresentationRecorder';
import { initAuth } from './services/firebaseAuth';

export default function App() {
  const [slides, setSlides] = useState<SlideData[]>(SLIDES_DATA);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [revealedBulletCount, setRevealedBulletCount] = useState(0);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = backward
  const [theme, setTheme] = useState<'kinetic' | 'focus' | 'slideegg'>('slideegg'); // Default to Theme 3: SlideEgg Light from PDF

  // Modals & Drawers state
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImageGenOpen, setIsImageGenOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecordStudioOpen, setIsRecordStudioOpen] = useState(false);
  const [recState, setRecState] = useState<{
    isRecording: boolean;
    isPaused: boolean;
    recordingSeconds: number;
    onTogglePause: () => void;
    onStopRecording: () => void;
    onToggleDock: () => void;
    isDockVisible: boolean;
  } | null>(null);

  // Auth state for Google Slides
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Firebase Auth listener for Google Workspace
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const currentSlide = slides[currentSlideIndex];
  const nextSlide = slides[currentSlideIndex + 1];

  // Progressive reveal / slide advance logic
  const handleNext = useCallback(() => {
    const totalBullets = currentSlide.bullets?.length || 0;
    if (totalBullets > 0 && revealedBulletCount < totalBullets) {
      setRevealedBulletCount((prev) => prev + 1);
    } else if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
      setRevealedBulletCount(0);
    }
  }, [currentSlide, revealedBulletCount, currentSlideIndex, slides.length]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
      const prevSlide = slides[currentSlideIndex - 1];
      setRevealedBulletCount(prevSlide.bullets?.length || 0);
    }
  }, [currentSlideIndex, slides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in textareas or inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsSpeakerNotesOpen((prev) => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setIsGridOpen((prev) => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        setIsExportOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleApplyCustomImage = (slideId: number, imageUrl: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === slideId ? { ...s, customImage: imageUrl } : s))
    );
  };

  const isSlideEgg = true;

  return (
    <div className="relative w-screen h-screen flex flex-col justify-between overflow-hidden select-none font-sans bg-[#f8fafc] text-slate-800">
      {/* 1. Top Header Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-3 border-b bg-white/95 border-slate-200/90 shadow-sm text-slate-800 backdrop-blur-md">
        {/* Left: Slide Sidebar Toggle + Course Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGridOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition shadow-sm text-xs font-semibold ${
              isGridOpen
                ? 'bg-[#15284f] text-[#f59e0b] border-[#15284f]'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-[#15284f]'
            }`}
            title="Tampilkan / Sembunyikan Deretan Slide (Shortcut: S)"
          >
            <PanelLeft className="w-4 h-4 text-[#f59e0b]" />
            <span>Slides</span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-md bg-[#15284f] text-[#f59e0b] shadow-slate-200">
              Py
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-wide text-[#15284f]">
                Python for AI
              </h1>
            </div>
          </div>
        </div>

        {/* Center: Slide Counter */}
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono border bg-white border-slate-200 text-slate-700 shadow-sm">
          <span className="font-bold text-[#15284f]">
            {currentSlideIndex + 1}
          </span>
          <span className="text-slate-300">/</span>
          <span>{slides.length}</span>
        </div>

        {/* Right: Record Presentation Studio + Fullscreen Toggle */}
        <div className="flex items-center gap-2">
          {recState?.isRecording ? (
            <div className="group relative flex items-center gap-1.5">
              {/* Subtle minimal pill during active recording; expands on hover so viewers stay focused on slides */}
              <button
                onClick={recState.onStopRecording}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-600 text-slate-700 hover:text-white hover:border-rose-600 transition shadow-xs text-xs font-semibold cursor-pointer"
                title="Click to Finish & Save MP4 Video (Shortcut: Alt + S)"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    recState.isPaused ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'
                  }`}
                />
                <span className="group-hover:hidden">Recording</span>
                <span className="hidden group-hover:inline font-bold">Finish & Save</span>
              </button>

              {/* Extra controls only appear when hovering over the recording button */}
              <div className="hidden group-hover:flex items-center gap-1">
                <button
                  onClick={recState.onTogglePause}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-xs"
                  title={recState.isPaused ? 'Resume Recording (Alt + P)' : 'Pause Recording (Alt + P)'}
                >
                  {recState.isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={recState.onToggleDock}
                  className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
                  title="Toggle Studio Controls Bar"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsRecordStudioOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition shadow-sm text-xs font-semibold cursor-pointer ${
                isRecordStudioOpen
                  ? 'bg-[#15284f] text-[#f59e0b] border-[#15284f]'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-[#15284f]'
              }`}
              title="Open Presentation Video Recorder, BeautyPlus & Virtual Background Studio (.MP4)"
            >
              <Video className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>{isRecordStudioOpen ? 'Studio Open' : 'Record Video'}</span>
            </button>
          )}

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#15284f] shadow-sm text-xs font-semibold cursor-pointer transition"
            title="Export Entire Deck to Full-Fidelity PDF Presentation (.pdf)"
          >
            <Download className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Export</span>
            <span>PDF</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm text-xs font-medium"
            title="Toggle Fullscreen (Hotkey: F)"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </header>

      {/* 3. Main Center Stage: Active Slide Content with 3D Transitions & Vertical Scroll Support */}
      <main className="relative flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 z-10 [perspective:1400px] scroll-smooth">
        <AnimatePresence mode="wait" custom={direction}>
          {(() => {
            // 5 distinct 3D transitions cycling smoothly across slides
            const transitionMode = currentSlideIndex % 5;
            let variants: any;

            if (transitionMode === 0) {
              // 1. 3D Cube Rotation
              variants = {
                initial: (dir: number) => ({
                  opacity: 0,
                  rotateY: dir * 65,
                  x: dir * 300,
                  scale: 0.85,
                  filter: 'blur(3px)',
                }),
                animate: {
                  opacity: 1,
                  rotateY: 0,
                  x: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: { duration: 0.55, ease: 'easeOut' },
                },
                exit: (dir: number) => ({
                  opacity: 0,
                  rotateY: -dir * 65,
                  x: -dir * 300,
                  scale: 0.85,
                  filter: 'blur(3px)',
                  transition: { duration: 0.45, ease: 'easeIn' },
                }),
              };
            } else if (transitionMode === 1) {
              // 2. 3D Depth Zoom / Tunnel Traverse
              variants = {
                initial: (dir: number) => ({
                  opacity: 0,
                  scale: dir > 0 ? 0.6 : 1.4,
                  rotateX: dir > 0 ? 18 : -18,
                  filter: 'blur(4px)',
                }),
                animate: {
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.52, ease: 'easeOut' },
                },
                exit: (dir: number) => ({
                  opacity: 0,
                  scale: dir > 0 ? 1.35 : 0.65,
                  rotateX: dir > 0 ? -14 : 14,
                  filter: 'blur(4px)',
                  transition: { duration: 0.42, ease: 'easeIn' },
                }),
              };
            } else if (transitionMode === 2) {
              // 3. 3D Flip Card Transition
              variants = {
                initial: (dir: number) => ({
                  opacity: 0,
                  rotateX: dir * 55,
                  y: dir * 70,
                  scale: 0.88,
                  filter: 'blur(3px)',
                }),
                animate: {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: { duration: 0.52, ease: 'easeOut' },
                },
                exit: (dir: number) => ({
                  opacity: 0,
                  rotateX: -dir * 55,
                  y: -dir * 70,
                  scale: 0.88,
                  filter: 'blur(3px)',
                  transition: { duration: 0.42, ease: 'easeIn' },
                }),
              };
            } else if (transitionMode === 3) {
              // 4. 3D Perspective Tilt & Glide
              variants = {
                initial: (dir: number) => ({
                  opacity: 0,
                  rotateY: dir * 35,
                  rotateZ: -dir * 5,
                  x: dir * 220,
                  scale: 0.9,
                }),
                animate: {
                  opacity: 1,
                  rotateY: 0,
                  rotateZ: 0,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.52, ease: 'easeOut' },
                },
                exit: (dir: number) => ({
                  opacity: 0,
                  rotateY: -dir * 35,
                  rotateZ: dir * 5,
                  x: -dir * 220,
                  scale: 0.9,
                  transition: { duration: 0.42, ease: 'easeIn' },
                }),
              };
            } else {
              // 5. 3D Origami Accordion Fold
              variants = {
                initial: (dir: number) => ({
                  opacity: 0,
                  rotateX: 30,
                  rotateY: dir * 30,
                  scale: 0.82,
                  y: 60,
                }),
                animate: {
                  opacity: 1,
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: 'easeOut' },
                },
                exit: (dir: number) => ({
                  opacity: 0,
                  rotateX: -25,
                  rotateY: -dir * 30,
                  scale: 0.82,
                  y: -50,
                  transition: { duration: 0.42, ease: 'easeIn' },
                }),
              };
            }

            return (
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full min-h-full flex justify-center items-center py-2 [transform-style:preserve-3d]"
              >
                <SlideViewer
                  slide={currentSlide}
                  revealedBulletCount={revealedBulletCount}
                  onOpenImageGen={() => setIsImageGenOpen(true)}
                  onNextPointOrSlide={handleNext}
                  theme={theme}
                />
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </main>

      {/* 4. Bottom Presentation Controls & Progress Bar */}
      <footer
        className={`relative z-20 px-6 py-3 border-t backdrop-blur-md transition-colors ${
          isSlideEgg
            ? 'bg-white/95 border-slate-200/90 text-slate-700 shadow-sm'
            : 'bg-slate-950/80 border-slate-800/80 text-slate-400'
        }`}
      >
        {/* Top edge subtle progress line */}
        <div className={`absolute top-0 left-0 right-0 h-1 overflow-hidden ${isSlideEgg ? 'bg-slate-200' : 'bg-slate-900'}`}>
          <div
            className={`h-full transition-all duration-300 ${
              isSlideEgg
                ? 'bg-gradient-to-r from-[#f59e0b] via-[#15284f] to-[#f59e0b]'
                : 'bg-gradient-to-r from-amber-500 via-cyan-400 to-indigo-500'
            }`}
            style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-center text-xs">
          {/* Center Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition disabled:opacity-30 disabled:cursor-not-allowed ${
                isSlideEgg
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span
              className={`font-mono font-semibold px-2 ${
                isSlideEgg ? 'text-[#15284f]' : 'text-slate-300'
              }`}
            >
              Slide {currentSlideIndex + 1} / {slides.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === slides.length - 1 && revealedBulletCount === (currentSlide.bullets?.length || 0)}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-xl font-bold transition shadow-md disabled:opacity-30 disabled:cursor-not-allowed ${
                isSlideEgg
                  ? 'bg-gradient-to-r from-[#15284f] to-[#1e3a8a] hover:from-[#112040] hover:to-[#172554] text-white shadow-blue-950/20'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
              }`}
            >
              <span>{currentSlide.bullets && revealedBulletCount < currentSlide.bullets.length ? 'Next Point' : 'Next Slide'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* 5. Modals & Overlays */}
      <SpeakerNotesModal
        isOpen={isSpeakerNotesOpen}
        onClose={() => setIsSpeakerNotesOpen(false)}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        slideIndex={currentSlideIndex}
        totalSlides={slides.length}
      />

      <SlideGridDrawer
        isOpen={isGridOpen}
        onClose={() => setIsGridOpen(false)}
        slides={slides}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={(idx) => {
          setDirection(idx >= currentSlideIndex ? 1 : -1);
          setCurrentSlideIndex(idx);
          setRevealedBulletCount(0);
          setIsGridOpen(false);
        }}
      />

      <ExportSlidesModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        slides={slides}
        user={user}
        accessToken={accessToken}
        onAuthSuccess={(authedUser, token) => {
          setUser(authedUser);
          setAccessToken(token);
        }}
        onAuthLogout={() => {
          setUser(null);
          setAccessToken(null);
        }}
      />

      <ImageGenModal
        isOpen={isImageGenOpen}
        onClose={() => setIsImageGenOpen(false)}
        slideId={currentSlide.id}
        slideTitle={currentSlide.title}
        onApplyImageToSlide={handleApplyCustomImage}
        currentCustomImage={currentSlide.customImage}
      />

      <PresentationRecorder
        isStudioOpen={isRecordStudioOpen}
        onCloseStudio={() => setIsRecordStudioOpen(false)}
        currentSlideNumber={currentSlideIndex + 1}
        totalSlides={slides.length}
        onRecordingStateChange={setRecState}
      />
    </div>
  );
}
