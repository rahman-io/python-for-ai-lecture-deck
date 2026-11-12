import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Hash, Terminal, GitBranch, Repeat, Cpu, Code2 } from 'lucide-react';
import britishHijabStudentImg from '../assets/images/british_hijab_student_3d_1794384729363.jpg';

interface ExplodingTransitionQuestionProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: 'kinetic' | 'focus' | 'slideegg';
}

export const ExplodingTransitionQuestion: React.FC<ExplodingTransitionQuestionProps> = ({
  revealedBulletCount,
}) => {
  const [selectedBrick, setSelectedBrick] = useState<number>(0);

  const isRevealed = revealedBulletCount >= 1;

  const buildingBlocks = [
    {
      num: '01',
      label: 'Variables',
      role: 'Memory Containers',
      icon: <Box className="w-5 h-5" />,
      color: 'text-sky-400',
      border: 'border-sky-400',
      bgBadge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      aiLine: 'data = load_iris()',
      desc: 'Labeled storage boxes in computer memory that hold datasets, neural weights, and model predictions.',
    },
    {
      num: '02',
      label: 'Data Types',
      role: 'Numbers, Text & Truth',
      icon: <Hash className="w-5 h-5" />,
      color: 'text-amber-400',
      border: 'border-amber-400',
      bgBadge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      aiLine: '[[5.1, 3.5, 1.4, 0.2]]',
      desc: 'The fundamental values every AI processes: integers (epochs), floats (measurements), strings (labels), and booleans.',
    },
    {
      num: '03',
      label: 'print()',
      role: 'Diagnostic Output',
      icon: <Terminal className="w-5 h-5" />,
      color: 'text-emerald-400',
      border: 'border-emerald-400',
      bgBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      aiLine: 'print("Predicted Class:", result)',
      desc: 'How Python talks back to the engineer—displaying model accuracy, loss metrics, and live predictions.',
    },
    {
      num: '04',
      label: 'if / else',
      role: 'Decision Branching',
      icon: <GitBranch className="w-5 h-5" />,
      color: 'text-purple-400',
      border: 'border-purple-400',
      bgBadge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      aiLine: 'if confidence >= 0.90:',
      desc: 'Logical forks in the road that let autonomous systems decide actions based on probability thresholds.',
    },
    {
      num: '05',
      label: 'for Loops',
      role: 'Training Iteration Engine',
      icon: <Repeat className="w-5 h-5" />,
      color: 'text-pink-400',
      border: 'border-pink-400',
      bgBadge: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
      aiLine: 'for epoch in range(100):',
      desc: 'Repeats mathematical updates across thousands of training examples until the neural network converges.',
    },
    {
      num: '06',
      label: 'Functions',
      role: 'Reusable AI Machines',
      icon: <Cpu className="w-5 h-5" />,
      color: 'text-cyan-400',
      border: 'border-cyan-400',
      bgBadge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      aiLine: 'model.fit(X, y) & model.predict()',
      desc: 'Self-contained modular blocks that take input parameters, run algorithms, and return intelligent outputs.',
    },
  ];

  const activeBlock = buildingBlocks[selectedBrick];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* =========================================================================
             STAGE 0: QUESTION HOOK (OPTION 2: "HOW CAN WE WRITE THAT AI CODE OURSELVES FROM ZERO?")
             ========================================================================= */
          <motion.div
            key="from-zero-stage-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-slate-950 via-[#0a1128] to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative min-h-[460px] flex items-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              {/* 3D Female Engineering Student Avatar */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group max-w-xs sm:max-w-sm w-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-teal-500 rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                  <div className="relative rounded-[2.2rem] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900 aspect-square">
                    <img
                      src={britishHijabStudentImg}
                      alt="3D Female Engineering Student Looking Curious"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Clean Question Text */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                  How can we write that <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                    AI code ourselves from zero?
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                  Deconstructing the magic of machine learning into six simple, foundational Python building blocks.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1: DECONSTRUCTED 6 PYTHON BUILDING BLOCKS BLUEPRINT
             ========================================================================= */
          <motion.div
            key="from-zero-stage-1"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header Bar */}
            <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900 shadow-sm">
                  <img src={britishHijabStudentImg} alt="Avatar" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    None of This Magic Is Possible Without the Fundamentals
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    Let&apos;s take the AI code apart into 6 foundational Python building blocks
                  </p>
                </div>
              </div>

              {/* Stage Pill */}
              <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold">
                01 / 01
              </div>
            </div>

            {/* 6 Interactive Building Block Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {buildingBlocks.map((brick, idx) => {
                const isSelected = selectedBrick === idx;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelectedBrick(idx)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? `bg-slate-900 text-white ${brick.border} shadow-xl ring-2 ring-amber-400/20`
                        : 'bg-white/95 text-slate-800 border-slate-200 hover:border-slate-400 shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[10px] font-black px-2 py-0.5 rounded ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {brick.num}
                        </span>
                        <div className={isSelected ? brick.color : 'text-[#15284f]'}>
                          {brick.icon}
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm sm:text-base font-extrabold font-mono ${isSelected ? 'text-white' : 'text-[#15284f]'}`}>
                          {brick.label}
                        </h4>
                        <p className={`text-[11px] font-medium mt-0.5 leading-snug ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {brick.role}
                        </p>
                      </div>
                    </div>

                    <div className={`mt-3 pt-2 border-t text-[10px] font-mono font-bold flex items-center justify-between ${
                      isSelected ? 'border-slate-800 text-amber-300' : 'border-slate-100 text-slate-400'
                    }`}>
                      <span>Block {brick.num}</span>
                      <span>➔</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Spotlight Inspection Banner for the Selected Building Block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBrick}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl text-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-7 space-y-2.5 text-left">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${activeBlock.bgBadge}`}>
                      Building Block {activeBlock.num} • {activeBlock.label}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {activeBlock.role}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    Why AI Needs <span className="text-amber-400 font-mono">{activeBlock.label}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeBlock.desc}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-inner">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>In Our AI Script:</span>
                      </span>
                      <span className="text-emerald-400">Python Syntax</span>
                    </div>
                    <pre className="font-mono text-xs sm:text-sm text-amber-300 font-bold overflow-x-auto py-1">
                      <code>{activeBlock.aiLine}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Indicator Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-end font-mono text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                01 / 01
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
