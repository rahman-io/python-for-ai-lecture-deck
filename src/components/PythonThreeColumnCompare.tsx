import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sprout, Package, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

import curiousMaleImg from '../assets/images/curious_male_3d_1794343767242.jpg';

interface PythonThreeColumnCompareProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const PythonThreeColumnCompare: React.FC<PythonThreeColumnCompareProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const [selectedColIdx, setSelectedColIdx] = useState<number | null>(null);

  const columns = slide.visualData?.columns || [
    {
      title: 'Speed to Code',
      metric: '10x Faster Prototyping',
      icon: Zap,
      detail: 'Write what you think in minutes, not days of debugging memory pointers and manual allocations.',
      color: '#38bdf8',
    },
    {
      title: 'Ease of Learning',
      metric: 'Zero Syntax Clutter',
      icon: Sprout,
      detail: 'No memory management, no type gymnastics, just plain English keywords and clean indentation.',
      color: '#f59e0b',
    },
    {
      title: 'Unrivaled Ecosystem',
      metric: '500,000+ Packages',
      icon: Package,
      detail: 'Whatever you want to build, someone in the global open-source community already wrote the foundational library.',
      color: '#10b981',
    },
  ];

  const isQuestionHookVisible = revealedBulletCount === 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isQuestionHookVisible ? (
          /* =========================================================================
             STAGE 1: CLEAN QUESTION HOOK (When revealedBulletCount === 0)
             Big Question + 3D Male Engineer Image + Watermark Background
             ========================================================================= */
          <motion.div
            key="question-hook-10"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45 }}
            className="relative bg-white/95 border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center"
          >
            {/* Faint Watermark Text in Background */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.06] font-extrabold flex flex-col justify-between p-4 text-slate-900 leading-none">
              <span className="text-5xl sm:text-7xl font-black transform -rotate-1 translate-x-8">
                Why did Python win?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right -translate-x-12">
                Why did Python win?
              </span>
              <span className="text-5xl sm:text-7xl font-black translate-x-4">
                Why did Python win?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right translate-x-8">
                Why did Python win?
              </span>
            </div>

            {/* Main Stage Grid: 3D Male Engineer + Big Typography */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              {/* 3D Curious Male Engineer Image Container (5 cols) */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  {/* Outer Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-[#15284f] rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />

                  {/* Asymmetrical Curved Frame */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-950">
                    <img
                      src={curiousMaleImg}
                      alt="3D Curious Male Engineer Student questioning why Python won"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Big Text Content (7 cols) */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#15284f] tracking-tight leading-[1.05]">
                  Why did Python <br />
                  <span className="bg-gradient-to-r from-[#15284f] via-amber-500 to-orange-500 bg-clip-text text-transparent">
                    win, not the others?
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                  With dozens of high-performance programming languages available, why did developers and scientists worldwide choose Python?
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 2: PROGRESSIVE 3-COLUMN REVEAL (When revealedBulletCount >= 1)
             ========================================================================= */
          <motion.div
            key="compare-reveal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header Bar */}
            <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900 shadow-sm">
                  <img src={curiousMaleImg} alt="Male Student Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    The Golden Balance of Modern Engineering
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    3 core factors that gave Python total supremacy
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {columns.map((_: any, idx: number) => {
                  const isRevealed = revealedBulletCount >= idx + 1;
                  return (
                    <div
                      key={idx}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isRevealed
                          ? 'w-7 bg-gradient-to-r from-amber-400 to-[#15284f]'
                          : 'w-2 bg-slate-300'
                      }`}
                      title={`Factor ${idx + 1} ${isRevealed ? 'Revealed' : 'Hidden'}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* 3 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {columns.map((col: any, idx: number) => {
                const isRevealed = revealedBulletCount >= idx + 1;
                const isSelected = selectedColIdx === idx;

                const renderColIcon = (rawIcon: any) => {
                  if (typeof rawIcon === 'string') {
                    if (rawIcon === '⚡') return <Zap className="w-5 h-5 text-amber-700" />;
                    if (rawIcon === '🌱') return <Sprout className="w-5 h-5 text-amber-700" />;
                    if (rawIcon === '📦') return <Package className="w-5 h-5 text-amber-700" />;
                    return <span className="text-base">{rawIcon}</span>;
                  }
                  if (rawIcon) {
                    const IconComponent = rawIcon;
                    return <IconComponent className="w-5 h-5 text-amber-700" />;
                  }
                  return <Sparkles className="w-5 h-5 text-amber-700" />;
                };

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isRevealed ? 1 : 0.35,
                      y: 0,
                      scale: isSelected ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.35, delay: idx * 0.1 }}
                    onClick={() => isRevealed && setSelectedColIdx(isSelected ? null : idx)}
                    className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-md overflow-hidden flex flex-col justify-between ${
                      !isRevealed
                        ? 'bg-slate-100/70 border-slate-200 text-slate-400 pointer-events-none'
                        : isSelected
                        ? 'bg-white border-amber-500 ring-2 ring-amber-300/50 shadow-xl'
                        : 'bg-white border-slate-200/90 text-slate-800 hover:border-[#15284f]'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-lg bg-[#15284f] text-amber-400 font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                          0{idx + 1}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shadow-sm">
                          {renderColIcon(col.icon)}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
                          {col.metric}
                        </span>
                        <h4 className="text-lg font-black text-[#15284f] mt-0.5">
                          {col.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {col.detail}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-slate-500">Factor 0{idx + 1}</span>
                      {isRevealed && (
                        <span className="text-amber-600 font-extrabold flex items-center gap-0.5">
                          Revealed <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    {!isRevealed && (
                      <div className="absolute inset-0 bg-slate-100/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-slate-200/90 border border-slate-300 text-[11px] font-mono font-bold text-slate-600">
                          Next Point to unlock
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Summary */}
            <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 text-xs text-amber-950 flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {revealedBulletCount < columns.length
                    ? `Click Next Point to unlock factor ${revealedBulletCount + 1} of 3.`
                    : 'All 3 winning factors revealed! Click Next Slide to continue.'}
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-amber-900">
                {revealedBulletCount} / {columns.length} Factors
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
