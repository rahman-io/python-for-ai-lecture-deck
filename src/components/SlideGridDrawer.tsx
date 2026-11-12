import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Code,
  Sparkles,
  Search,
  Layers,
  Terminal,
  Cpu,
  BookOpen,
  PanelLeftClose,
} from 'lucide-react';
import { SlideData } from '../types/slides';

interface SlideGridDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideGridDrawer: React.FC<SlideGridDrawerProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideIndex,
  onSelectSlide,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const activeSlideRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll to current active slide when sidebar opens
  useEffect(() => {
    if (isOpen && activeSlideRef.current) {
      const timer = setTimeout(() => {
        activeSlideRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredSlides = slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide, index }) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        String(index + 1).includes(q) ||
        slide.title.toLowerCase().includes(q) ||
        (slide.subtitle && slide.subtitle.toLowerCase().includes(q)) ||
        slide.sectionName.toLowerCase().includes(q)
      );
    });

  const getLayoutBadge = (layout: string) => {
    if (layout.includes('vscode') || layout.includes('code') || layout.includes('lab') || layout.includes('variables') || layout.includes('homework')) {
      return { label: layout.includes('vscode') ? 'VS Code IDE' : 'Python Lab', icon: Terminal, color: 'text-amber-700 bg-amber-50 border-amber-200' };
    }
    if (layout.includes('ai') || layout.includes('convergence') || layout.includes('ingredients')) {
      return { label: 'AI Concept', icon: Cpu, color: 'text-blue-700 bg-blue-50 border-blue-200' };
    }
    if (layout.includes('hero') || layout.includes('closing')) {
      return { label: 'Cover / Q&A', icon: Sparkles, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    return { label: 'Interactive', icon: Layers, color: 'text-slate-600 bg-slate-100 border-slate-200' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle backdrop so clicking outside also closes if desired, while keeping the main slide visible like PowerPoint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[1px]"
          />

          {/* PowerPoint-Style Left Slide Thumbnail Sidebar */}
          <motion.aside
            initial={{ x: -340, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -340, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-[#f1f5f9] border-r border-slate-300 shadow-2xl flex flex-col select-none"
          >
            {/* Sidebar Header */}
            <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#15284f] text-[#f59e0b] flex items-center justify-center font-bold text-xs shadow-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-[#15284f] uppercase tracking-wider">
                    Slide Navigator
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {slides.length} Slides • Click to jump
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#15284f] hover:bg-slate-100 transition"
                title="Hide Slide List (Hotkey: S)"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search / Jump to Slide Number */}
            <div className="p-2.5 bg-slate-100/90 border-b border-slate-200">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search slide title or number (e.g. 22)..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#15284f] focus:ring-1 focus:ring-[#15284f]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Vertical PowerPoint-Style Thumbnail Rail */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth">
              {filteredSlides.map(({ slide, index }) => {
                const isActive = index === currentSlideIndex;
                const badge = getLayoutBadge(slide.layout);
                const BadgeIcon = badge.icon;

                // Split title for two-tone preview matching main SlideEgg theme
                const words = slide.title.split(' ');
                const splitIdx = Math.max(1, Math.ceil(words.length * 0.6));
                const firstPart = words.slice(0, splitIdx).join(' ');
                const secondPart = words.slice(splitIdx).join(' ');

                return (
                  <button
                    key={slide.id}
                    ref={isActive ? activeSlideRef : null}
                    onClick={() => {
                      onSelectSlide(index);
                    }}
                    className="w-full flex items-start gap-2.5 group text-left focus:outline-none"
                  >
                    {/* Left Number Column (PowerPoint style) */}
                    <div className="w-6 pt-1 flex flex-col items-end shrink-0">
                      <span
                        className={`text-xs font-mono font-bold transition ${
                          isActive
                            ? 'text-[#d97706] scale-110'
                            : 'text-slate-500 group-hover:text-[#15284f]'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>

                    {/* Right 16:9 Miniature Slide Thumbnail Card */}
                    <div
                      className={`relative flex-1 aspect-[16/9] rounded-lg bg-white p-2.5 flex flex-col justify-between overflow-hidden transition-all duration-200 ${
                        isActive
                          ? 'border-2 border-[#d97706] ring-2 ring-[#f59e0b]/40 shadow-md scale-[1.01]'
                          : 'border border-slate-300/90 hover:border-[#15284f] shadow-xs hover:shadow-md'
                      }`}
                    >
                      {/* Top miniature progress/accent bar */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#15284f] via-[#f59e0b] to-[#15284f]'
                            : 'bg-slate-200 group-hover:bg-[#15284f]/60'
                        }`}
                      />

                      {/* Decorative mini triangle in corner */}
                      <div
                        className="absolute top-2.5 right-2.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#15284f]/20 pointer-events-none rotate-12"
                      />
                      <div
                        className="absolute bottom-7 right-3 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#f59e0b]/40 pointer-events-none -rotate-12"
                      />

                      {/* Top Section Pill */}
                      <div className="flex items-center justify-between gap-1 pt-0.5">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#15284f] text-white text-[7px] font-mono font-bold uppercase tracking-wider truncate max-w-[75%]">
                          <span className="w-1 h-1 rounded-full bg-[#f59e0b] shrink-0" />
                          <span className="truncate">
                            {slide.sectionName.split(/[-—]/)[0]?.trim() || `Section ${slide.sectionId}`}
                          </span>
                        </span>

                        {isActive && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-[#b45309] font-mono font-bold text-[7px] uppercase">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Center Miniature Slide Title & Subtitle */}
                      <div className="my-auto py-1 pr-2">
                        <h4 className="text-[11px] font-extrabold leading-tight line-clamp-2">
                          <span className="text-[#15284f]">{firstPart} </span>
                          {secondPart && <span className="text-[#d97706]">{secondPart}</span>}
                        </h4>
                        {slide.subtitle && (
                          <p className="text-[8px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                            {slide.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Bottom Miniature Slide Footer */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold border ${badge.color}`}
                        >
                          <BadgeIcon className="w-2.5 h-2.5" />
                          <span>{badge.label}</span>
                        </span>

                        <div className="flex items-center gap-1 text-[8px] font-mono text-slate-400">
                          {slide.codeSnippets && <Code className="w-2.5 h-2.5 text-amber-500" />}
                          <span>Slide {index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredSlides.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">
                  Tidak ada slide yang cocok dengan "{searchQuery}"
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
