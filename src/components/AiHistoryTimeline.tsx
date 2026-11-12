import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Calendar, ChevronRight } from 'lucide-react';

import aiHistoryTimeImg from '../assets/images/ai_history_time_3d_1794347405306.jpg';

interface AiHistoryTimelineProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const AiHistoryTimeline: React.FC<AiHistoryTimelineProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const [selectedEraIdx, setSelectedEraIdx] = useState<number | null>(null);
  const [manualPart, setManualPart] = useState<number | null>(null);

  const isQuestionHookVisible = revealedBulletCount === 0;

  // Sync active part with revealedBulletCount unless user manually clicked tab
  const activePart = manualPart !== null
    ? manualPart
    : (revealedBulletCount >= 2 ? 2 : 1);

  useEffect(() => {
    // Reset manual override when slide bullet state moves forward
    setManualPart(null);
  }, [revealedBulletCount]);

  const allEras = slide.visualData?.eras || [
    {
      period: '9th Century (820 AD)',
      title: 'Laying Mathematical Foundations',
      desc: 'Al-Khwarizmi created Algebra and Algorithms as the foundational mathematical logic for computing.',
      icon: 'fa-solid fa-calculator',
      highlights: ['820 AD Al-Khwarizmi (Algebra & Algorithms)'],
    },
    {
      period: '1940 - 1955',
      title: 'Pre-Birth & Computation Theory',
      desc: 'First mathematical Neural Network model created and Alan Turing introduced the Turing Test.',
      icon: 'fa-solid fa-microchip',
      highlights: ['1943 McCulloch-Pitts Neural Network', '1950 Alan Turing Test', '1951 First Chess AI Program'],
    },
    {
      period: '1956 - 1974',
      title: 'Official Birth & Early Optimism',
      desc: 'The term Artificial Intelligence was coined at Dartmouth Conference, followed by LISP and ELIZA chatbot.',
      icon: 'fa-solid fa-diagram-project',
      highlights: ['1956 Dartmouth AI Term Coined', '1958 McCarthy LISP Language', '1966 Weizenbaum ELIZA Chatbot'],
    },
    {
      period: '1974 - 1993',
      title: 'The AI Winter Era',
      desc: 'Two major research funding cuts (1974 & late 1980s) due to computing hardware limitations.',
      icon: 'fa-solid fa-snowflake',
      highlights: ['1974 First AI Winter (Funding Cut)', '1980s Expert Systems & Second Winter'],
    },
    {
      period: '1993 - 2011',
      title: 'Resurgence & Era of Proof',
      desc: 'Computers defeated world chess champions and won human knowledge quiz competitions.',
      icon: 'fa-solid fa-trophy',
      highlights: ['1997 IBM Deep Blue vs Garry Kasparov', '2011 IBM Watson Jeopardy Victory'],
    },
    {
      period: '2012 - Present',
      title: 'Deep Learning & Generative AI',
      desc: 'Internet Big Data and GPU chips birthed AlexNet, AlphaGo, Transformer architecture, and ChatGPT.',
      icon: 'fa-solid fa-brain',
      highlights: ['2012 AlexNet Deep Learning', '2016 Google DeepMind AlphaGo', '2017 Transformer Architecture', '2022-Present ChatGPT Surge'],
    },
  ];

  // Divide into 2 parts of 3 eras each
  const part1Eras = allEras.slice(0, 3);
  const part2Eras = allEras.slice(3, 6);
  const currentDisplayedEras = activePart === 1 ? part1Eras : part2Eras;
  const startIndex = activePart === 1 ? 0 : 3;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isQuestionHookVisible ? (
          /* =========================================================================
             STAGE 0: QUESTION HOOK SCREEN (revealedBulletCount === 0)
             ========================================================================= */
          <motion.div
            key="ai-history-hook"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45 }}
            className="relative bg-white/95 border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center"
          >
            {/* Watermark Background Text */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.05] font-extrabold flex flex-col justify-between p-4 text-slate-900 leading-none">
              <span className="text-5xl sm:text-7xl font-black transform -rotate-1 translate-x-8">
                SINCE WHEN HAS AI EXISTED?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right -translate-x-12">
                SINCE WHEN HAS AI EXISTED?
              </span>
              <span className="text-5xl sm:text-7xl font-black translate-x-4">
                SINCE WHEN HAS AI EXISTED?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right translate-x-8">
                SINCE WHEN HAS AI EXISTED?
              </span>
            </div>

            {/* Hook Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-[#15284f] rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-950">
                    <img
                      src={aiHistoryTimeImg}
                      alt="3D Cyber Robot Developer examining AI Timeline"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Historical Evolution Timeline</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#15284f] tracking-tight leading-[1.05]">
                  Since when has <br />
                  <span className="bg-gradient-to-r from-[#15284f] via-amber-500 to-orange-500 bg-clip-text text-transparent">
                    AI existed?
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                  From 9th century Islamic algebra algorithms to modern deep neural networks and ChatGPT.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono font-semibold text-amber-700">
                  <span>Press Space or click Next Point to unlock Part 1</span>
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1 & 2: SERPENTINE / WINDING ROADMAP TIMELINE (Part 1 & Part 2)
             ========================================================================= */
          <motion.div
            key={`ai-history-part-${activePart}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header with Interactive Stage Tabs */}
            <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900 shadow-sm">
                  <img src={aiHistoryTimeImg} alt="Robot Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    History of Artificial Intelligence
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {activePart === 1
                      ? 'Part 1: 9th Century Foundations to Dartmouth Era (820 AD - 1974)'
                      : 'Part 2: AI Winter to Modern Generative Era (1974 - Present)'}
                  </p>
                </div>
              </div>

              {/* Part 1 vs Part 2 Switcher Tabs */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
                <button
                  onClick={() => setManualPart(1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold transition-all ${
                    activePart === 1
                      ? 'bg-[#15284f] text-amber-300 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Part 1 (820 AD - 1974)
                </button>
                <button
                  onClick={() => setManualPart(2)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold transition-all ${
                    activePart === 2
                      ? 'bg-[#15284f] text-amber-300 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Part 2 (1974 - Present)
                </button>
              </div>
            </div>

            {/* Winding Serpentine Roadmap Section */}
            <div className="relative bg-gradient-to-b from-slate-900 via-[#15284f] to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
              {/* Background Decorative Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

              {/* Serpentine SVG Winding Path Ribbon (Desktop/Tablet) */}
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-32 hidden md:block pointer-events-none z-0">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 120">
                  <defs>
                    <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Outer Glow Ribbon */}
                  <path
                    d="M 50 60 C 200 10, 300 110, 400 60 C 500 10, 600 110, 750 60"
                    fill="none"
                    stroke="url(#roadGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    opacity="0.4"
                  />
                  {/* Core Sharp Ribbon Line */}
                  <path
                    d="M 50 60 C 200 10, 300 110, 400 60 C 500 10, 600 110, 750 60"
                    fill="none"
                    stroke="url(#roadGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="8 4"
                  />
                </svg>
              </div>

              {/* 3 Winding Era Columns Layout */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 my-auto items-stretch">
                {currentDisplayedEras.map((era: any, idx: number) => {
                  const globalIdx = startIndex + idx;
                  const isSelected = selectedEraIdx === globalIdx;

                  return (
                    <motion.div
                      key={globalIdx}
                      initial={{ opacity: 0, y: idx % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.12 }}
                      onClick={() => setSelectedEraIdx(isSelected ? null : globalIdx)}
                      className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-xl backdrop-blur-md ${
                        isSelected
                          ? 'bg-slate-800/95 border-amber-400 ring-2 ring-amber-400/40'
                          : 'bg-slate-900/85 border-slate-700/80 hover:border-amber-400/80 hover:bg-slate-850'
                      }`}
                    >
                      {/* Top Bar: Era Number Pill & Icon Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-mono text-xs font-black shadow-sm">
                          {era.period}
                        </span>

                        <div className="w-9 h-9 rounded-full bg-slate-800 text-amber-400 border border-amber-400/50 flex items-center justify-center shadow-inner">
                          <i className={`${era.icon || 'fa-solid fa-clock'} text-sm`} />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="space-y-2 flex-grow">
                        <h4 className="text-base font-extrabold text-white leading-snug">
                          {era.title}
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {era.desc}
                        </p>

                        {/* Highlight Bullet Badges */}
                        {era.highlights && era.highlights.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            {era.highlights.map((hl: string, hIdx: number) => (
                              <div
                                key={hIdx}
                                className="text-[11px] font-mono text-amber-200/90 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800 flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Footer Tag */}
                      <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400 font-bold">Era 0{globalIdx + 1} of 06</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Navigation Indicator Bar */}
              <div className="relative z-10 mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end text-xs text-slate-300 font-mono">
                <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                  Part {activePart} / 2
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
