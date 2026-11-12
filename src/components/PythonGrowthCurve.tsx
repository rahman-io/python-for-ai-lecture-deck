import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Sparkles, Terminal, Cpu, Database, Brain, ArrowRight } from 'lucide-react';

import curiousRobotImg from '../assets/images/curious_robot_3d_1794343120059.jpg';

interface PythonGrowthCurveProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const PythonGrowthCurve: React.FC<PythonGrowthCurveProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number | null>(null);

  const phases = slide.visualData?.phases || [
    {
      era: '1990s',
      title: 'System Scripting',
      desc: 'Replacing tedious shell scripts and Perl with clean, human-friendly syntax.',
      icon: Terminal,
      badge: 'Automation Era',
      stats: '100K+ Early Hackers',
    },
    {
      era: '2000s',
      title: 'Scientific Computing',
      desc: 'Mathematicians and biologists adopt NumPy and SciPy for fast matrix research.',
      icon: Cpu,
      badge: 'Academic Breakthrough',
      stats: 'NumPy & SciPy Born',
    },
    {
      era: '2010s',
      title: 'Data Science Explosion',
      desc: 'Pandas and Jupyter notebooks revolutionize data analytics and machine learning.',
      icon: Database,
      badge: 'Big Data Revolution',
      stats: '#1 Data Language',
    },
    {
      era: '2020s+',
      title: 'The Universal AI Standard',
      desc: 'PyTorch, TensorFlow, and LLM frameworks make Python the default lingua franca of AI.',
      icon: Brain,
      badge: 'Global Dominance',
      stats: '> 85% AI Research Share',
    },
  ];

  const isQuestionHookVisible = revealedBulletCount === 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isQuestionHookVisible ? (
          /* =========================================================================
             STAGE 1: CLEAN & ELEGANT QUESTION HOOK (When revealedBulletCount === 0)
             Minimalist big question, 3D robot image, subtle watermark background
             ========================================================================= */
          <motion.div
            key="question-hook"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45 }}
            className="relative bg-white/95 border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center"
          >
            {/* Faint Repeated Watermark Text in Background */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.06] font-extrabold flex flex-col justify-between p-4 text-slate-900 leading-none">
              <span className="text-5xl sm:text-7xl font-black transform -rotate-1 translate-x-12">
                How did it take over?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right -translate-x-8">
                How did it take over?
              </span>
              <span className="text-5xl sm:text-7xl font-black translate-x-4">
                How did it take over?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right translate-x-12">
                How did it take over?
              </span>
            </div>

            {/* Main Stage Grid: 3D Robot + Clean Typography */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              {/* 3D Curious Robot Image Container (5 cols) */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  {/* Decorative Outer Glow Ring */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-[#15284f] rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />

                  {/* Image Frame with Asymmetrical Curved Corners */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-950">
                    <img
                      src={curiousRobotImg}
                      alt="3D Curious Robot Developer asking How did Python take over?"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Big Clean Text Content (7 cols) */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#15284f] tracking-tight leading-[1.05]">
                  How did it <br />
                  <span className="bg-gradient-to-r from-[#15284f] via-amber-500 to-orange-500 bg-clip-text text-transparent">
                    take over?
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                  From a humble Christmas scripting project in 1989 to powering modern AI supercomputers. What drove this extraordinary evolution?
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 2: PROGRESSIVE DECADE-BY-DECADE REVEAL (When revealedBulletCount >= 1)
             ========================================================================= */
          <motion.div
            key="timeline-reveal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Compact Header Bar */}
            <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900 shadow-sm">
                  <img src={curiousRobotImg} alt="Robot Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    How Python Took Over
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    The 4 key eras of Python's exponential growth
                  </p>
                </div>
              </div>

              {/* Revealed Progress Indicators */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {phases.map((_: any, idx: number) => {
                  const isRevealed = revealedBulletCount >= idx + 1;
                  return (
                    <div
                      key={idx}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isRevealed
                          ? 'w-6 bg-gradient-to-r from-amber-400 to-[#15284f]'
                          : 'w-2 bg-slate-300'
                      }`}
                      title={`Era ${idx + 1} ${isRevealed ? 'Revealed' : 'Hidden'}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* 4 Eras Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5">
              {phases.map((p: any, idx: number) => {
                const isRevealed = revealedBulletCount >= idx + 1;
                const isSelected = selectedPhaseIdx === idx;

                const renderPhaseIcon = (rawIcon: any) => {
                  if (typeof rawIcon === 'string') {
                    return <span className="text-sm">{rawIcon}</span>;
                  }
                  if (rawIcon) {
                    const IconComponent = rawIcon;
                    return <IconComponent className="w-4 h-4" />;
                  }
                  return <TrendingUp className="w-4 h-4" />;
                };

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: revealedBulletCount >= 99 ? 1 : 0, y: revealedBulletCount >= 99 ? 0 : 20 }}
                    animate={{
                      opacity: isRevealed ? 1 : 0.35,
                      y: 0,
                      scale: isSelected ? 1.02 : 1,
                    }}
                    transition={{
                      duration: revealedBulletCount >= 99 ? 0 : 0.35,
                      delay: revealedBulletCount >= 99 ? 0 : idx * 0.08,
                    }}
                    onClick={() => isRevealed && setSelectedPhaseIdx(isSelected ? null : idx)}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-md overflow-hidden flex flex-col justify-between ${
                      !isRevealed
                        ? 'bg-slate-100/70 border-slate-200 text-slate-400 pointer-events-none'
                        : isSelected
                        ? 'bg-white border-amber-500 ring-2 ring-amber-300/50 shadow-xl'
                        : 'bg-white border-slate-200/90 text-slate-800 hover:border-[#15284f]'
                    }`}
                  >
                    {/* Top Era & Icon */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono">
                        <span
                          className={`text-xs font-black px-2 py-0.5 rounded-md ${
                            isRevealed
                              ? 'bg-[#15284f] text-amber-300'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {p.era}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isRevealed
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {renderPhaseIcon(p.icon)}
                        </div>
                      </div>

                      <h4 className="text-sm font-extrabold text-[#15284f] leading-snug">
                        {p.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {p.desc}
                      </p>
                    </div>

                    {/* Bottom Metric / Badge */}
                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-slate-500">{p.stats}</span>
                      {isRevealed && (
                        <span className="text-amber-600 font-extrabold flex items-center gap-0.5">
                          Revealed <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    {/* Lock Overlay if not yet revealed */}
                    {!isRevealed && (
                      <div className="absolute inset-0 bg-slate-100/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-2.5 py-1 rounded-full bg-slate-200/90 border border-slate-300 text-[10px] font-mono font-bold text-slate-600">
                          Next Point to unlock
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Info Footer */}
            <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 text-xs text-amber-950 flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {revealedBulletCount < phases.length
                    ? `Click Next Point to unlock era ${revealedBulletCount + 1} of 4.`
                    : 'All 4 eras revealed! Click Next Slide to continue.'}
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-amber-900">
                {revealedBulletCount} / {phases.length} Eras
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
