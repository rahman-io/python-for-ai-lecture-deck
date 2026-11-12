import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Cpu, Layers, Box, CheckCircle2, Sparkles, Code2, BrainCircuit } from 'lucide-react';

interface LectureConclusionRecapProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const LectureConclusionRecap: React.FC<LectureConclusionRecapProps> = ({
  revealedBulletCount,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<number>(0);

  const chapters = [
    {
      num: '01',
      slidesRange: 'Slides 01 – 10',
      title: 'From Human Thought to Python',
      subtitle: 'Language Evolution & Python’s Rise',
      icon: <Globe className="w-5 h-5" />,
      accent: 'from-amber-400 to-orange-500',
      border: 'border-amber-400',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      summary:
        'Computers only understand 0s and 1s (binary). Programming languages act as bridges. Created by Guido van Rossum in 1989, Python won the world through human-readable syntax, rapid prototyping, and an open ecosystem.',
      keyPoints: [
        'Binary (0 & 1) ➔ Assembly ➔ High-Level Languages',
        'Python ranks #1 globally (TIOBE Index) with zero syntax clutter',
        '10x faster developer speed compared to C++ and Java',
      ],
    },
    {
      num: '02',
      slidesRange: 'Slides 11 – 14',
      title: 'The Story of Artificial Intelligence',
      subtitle: 'Pattern Recognition & The 3 Ingredients',
      icon: <BrainCircuit className="w-5 h-5" />,
      accent: 'from-cyan-400 to-blue-500',
      border: 'border-cyan-400',
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      summary:
        'Instead of programmers hand-writing 10,000 fragile rules, Machine Learning feeds examples (Data + Answers) into an algorithm so the machine infers patterns on its own.',
      keyPoints: [
        'From Al-Khwarizmi (Algorithm) & Alan Turing to Modern Deep Learning',
        'Paradigm Shift: Data + Answers ➔ Rules (Inferred Patterns)',
        'The 3 Ingredients of Modern AI: Massive Data, Smart Algorithms, GPU Compute',
      ],
    },
    {
      num: '03',
      slidesRange: 'Slides 15 – 19',
      title: 'Where Python & AI Converge',
      subtitle: 'The 5 Scientific Libraries & Vectorization',
      icon: <Cpu className="w-5 h-5" />,
      accent: 'from-purple-400 to-indigo-500',
      border: 'border-purple-400',
      badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      summary:
        'Python dominates AI because its simple English syntax wraps ultra-fast C/CUDA engines. Using Vectorization, NumPy crunches 1 million numbers 116x faster than manual loops.',
      keyPoints: [
        'Data & Math Tier: NumPy (N-D Matrices) & Pandas (DataFrames)',
        'Intelligence Tier: Scikit-learn, PyTorch & TensorFlow',
        'Vectorization delegates array operations to parallel SIMD registers in 1.1 ms',
      ],
    },
    {
      num: '04',
      slidesRange: 'Slides 20 – 24',
      title: 'Python Foundations: Variables',
      subtitle: 'Memory Containers, Reassignment & 3D Story Lab',
      icon: <Box className="w-5 h-5" />,
      accent: 'from-emerald-400 to-teal-500',
      border: 'border-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      summary:
        'Every AI script is built from 6 basic blocks, starting with Variables. A variable is a labeled container in computer memory (like our lunch_box and 3D Smart Home / Robot builders) whose value can be updated or combined anytime.',
      keyPoints: [
        'Assignment (=) stores a value inside a labeled memory container',
        'Reassignment overwrites the old value with a new one seamlessly',
        'Use clean snake_case labels (e.g. lunch_box_1); never start with a number or use spaces/hyphens',
      ],
    },
  ];

  // Sync active tab with Next Point if user advances via Space/Next Point
  React.useEffect(() => {
    if (revealedBulletCount >= 1 && revealedBulletCount <= 4) {
      setSelectedChapter(revealedBulletCount - 1);
    }
  }, [revealedBulletCount]);

  const activeChapter = chapters[selectedChapter];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 select-none">
      {/* Top Header Banner */}
      <div className="bg-white/95 border-2 border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Lecture 01 Master Recap • Slides 01 to 24</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#15284f]">
            Conclusion &amp; Complete Journey Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Everything we connected today—from binary machine code to our first interactive Python memory variables.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-[#15284f] text-white font-mono text-xs font-bold shrink-0 text-center shadow-sm">
          <div className="text-amber-400 text-[10px] uppercase">Milestone Reached</div>
          <div className="text-sm font-black">Part 01 Complete</div>
        </div>
      </div>

      {/* 4 Journey Chapter Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {chapters.map((chap, idx) => {
          const isSelected = selectedChapter === idx;
          return (
            <motion.div
              key={chap.num}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedChapter(idx)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `bg-slate-900 text-white ${chap.border} shadow-xl ring-2 ring-amber-400/20`
                  : 'bg-white/95 text-slate-800 border-slate-200 hover:border-slate-400 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-black px-2.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    CHAPTER {chap.num}
                  </span>
                  <div className={isSelected ? 'text-amber-400' : 'text-[#15284f]'}>{chap.icon}</div>
                </div>

                <div>
                  <span
                    className={`text-[10px] font-mono font-bold block ${
                      isSelected ? 'text-cyan-300' : 'text-amber-700'
                    }`}
                  >
                    {chap.slidesRange}
                  </span>
                  <h3
                    className={`text-sm sm:text-base font-extrabold leading-snug mt-0.5 ${
                      isSelected ? 'text-white' : 'text-[#15284f]'
                    }`}
                  >
                    {chap.title}
                  </h3>
                  <p className={`text-[11px] mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {chap.subtitle}
                  </p>
                </div>
              </div>

              <div
                className={`mt-4 pt-2.5 border-t text-[10px] font-mono font-bold flex items-center justify-between ${
                  isSelected ? 'border-slate-800 text-amber-300' : 'border-slate-100 text-slate-400'
                }`}
              >
                <span>Inspect Recap</span>
                <span>➔</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Chapter Spotlight Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChapter.num}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-6 sm:p-7 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl text-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          {/* Left 6 Cols: Chapter Narrative */}
          <div className="lg:col-span-6 space-y-3 text-left">
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${activeChapter.badge}`}>
                Chapter {activeChapter.num} • {activeChapter.slidesRange}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {activeChapter.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeChapter.summary}
            </p>
          </div>

          {/* Right 6 Cols: 3 Core Takeaways */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
              Essential Concepts to Remember:
            </div>
            {activeChapter.keyPoints.map((pt, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium leading-snug">{pt}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
