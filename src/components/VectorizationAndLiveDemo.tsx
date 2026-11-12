import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Cpu, Clock, Play, RotateCcw, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import americanStudentImg from '../assets/images/smart_american_student_1794495243356.jpg';
import { CodePlayground } from './CodePlayground';

interface VectorizationAndLiveDemoProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: 'kinetic' | 'focus' | 'slideegg';
}

export const VectorizationAndLiveDemo: React.FC<VectorizationAndLiveDemoProps> = ({
  slide,
  revealedBulletCount,
  theme = 'slideegg',
}) => {
  const activeStage = revealedBulletCount <= 0 ? 0 : revealedBulletCount === 1 ? 1 : 2;

  // Independent simulation states for Slow (Python Loop) and Fast (NumPy SIMD)
  const [slowState, setSlowState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [slowStep, setSlowStep] = useState<number>(-1);
  const [slowItems, setSlowItems] = useState<number[]>([]);
  const [slowTime, setSlowTime] = useState<number>(0);

  const [fastState, setFastState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [fastDone, setFastDone] = useState<boolean>(false);
  const [fastTime, setFastTime] = useState<number>(0);

  // Reference to track all active timers so they can be cancelled on reset
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  // Confetti celebration triggers
  const triggerSlowConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.28, y: 0.65 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b'],
    });
  };

  const triggerFastConfetti = () => {
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { x: 0.72, y: 0.65 },
      colors: ['#06b6d4', '#10b981', '#f59e0b', '#38bdf8'],
    });
  };

  const triggerBothConfetti = () => {
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
    });
  };

  // Run only the Slow Manual Python Loop
  const handleRunSlow = () => {
    setSlowState('running');
    setSlowStep(-1);
    setSlowItems([]);
    setSlowTime(0);

    const steps = [
      { step: 0, val: 2, time: 25.6 },
      { step: 1, val: 4, time: 51.2 },
      { step: 2, val: 6, time: 76.8 },
      { step: 3, val: 8, time: 102.4 },
      { step: 4, val: 10, time: 128.4 },
    ];

    steps.forEach((s, idx) => {
      const tid = setTimeout(() => {
        setSlowStep(s.step);
        setSlowItems((prev) => [...prev, s.val]);
        setSlowTime(s.time);

        if (idx === steps.length - 1) {
          const endTid = setTimeout(() => {
            setSlowState('completed');
            triggerSlowConfetti();
          }, 350);
          timersRef.current.push(endTid);
        }
      }, 350 + idx * 420);
      timersRef.current.push(tid);
    });
  };

  // Run only the Fast NumPy Vectorization
  const handleRunFast = () => {
    setFastState('running');
    setFastDone(false);
    setFastTime(0);

    const tid = setTimeout(() => {
      setFastDone(true);
      setFastTime(1.1);
      setFastState('completed');
      triggerFastConfetti();
    }, 180);
    timersRef.current.push(tid);
  };

  // Run Both concurrently for direct side-by-side benchmark comparison
  const handleRunBoth = () => {
    handleResetAll();
    setTimeout(() => {
      handleRunFast();
      handleRunSlow();
      const bothTid = setTimeout(() => {
        triggerBothConfetti();
      }, 2500);
      timersRef.current.push(bothTid);
    }, 60);
  };

  // Reset everything to pristine initial state
  const handleResetAll = () => {
    clearAllTimers();
    setSlowState('idle');
    setSlowStep(-1);
    setSlowItems([]);
    setSlowTime(0);
    setFastState('idle');
    setFastDone(false);
    setFastTime(0);
  };

  const isAnyRunning = slowState === 'running' || fastState === 'running';
  const isAllCompleted = slowState === 'completed' && fastState === 'completed';

  // Sample data to clearly visualize 5 elements
  const sampleNumbers = [1, 2, 3, 4, 5];

  const slowSnippet = slide.codeSnippets?.[0] || {
    label: 'The Slow Way: Manual Python Loop',
    code: `# 1. Input: Python list of 1,000,000 integers\nnumbers = [1, 2, 3, 4, 5, ...]\n\n# 2. Sequential loop: element-by-element append\nresult = []\nfor x in numbers:\n    result.append(x * 2)\n\n# 3. Output Type: standard python list\n# result = [2, 4, 6, 8, 10, ...]`,
    output: 'Elapsed Time: ~ 128.4 ms',
  };

  const fastSnippet = slide.codeSnippets?.[1] || {
    label: 'The AI Way: Vectorized Array (NumPy)',
    code: `import numpy as np\n\n# 1. Input: Contiguous C-array of 1,000,000 integers\nnumbers = np.array([1, 2, 3, 4, 5, ...])\n\n# 2. Vectorized multiplication across parallel SIMD lanes\nresult = numbers * 2\n\n# 3. Output Type: numpy.ndarray (C-buffer)\n# result = array([2, 4, 6, 8, 10, ...])`,
    output: 'Elapsed Time: ~ 1.1 ms (116x Faster!)',
  };

  const liveDemoSnippet = slide.codeSnippets?.[2] || {
    label: 'train_classifier.py (Scikit-learn)',
    code: `from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.datasets import load_iris\n\n# 1. Load dataset & create model\ndata = load_iris()\nmodel = DecisionTreeClassifier(max_depth=3)\n\n# 2. Train the model on examples\nmodel.fit(data.data, data.target)\n\n# 3. Predict an unseen flower sample\nprediction = model.predict([[5.1, 3.5, 1.4, 0.2]])\nprint("Predicted Flower Class:", data.target_names[prediction[0]])`,
    output: `Training complete on 150 flower samples.\nAccuracy Score: 98.6%\nSample Features: [SepalLength=5.1, SepalWidth=3.5, PetalLength=1.4, PetalWidth=0.2]\n>>> Predicted Flower Class: Setosa`,
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {activeStage === 0 ? (
          /* =========================================================================
             STAGE 0: QUESTION HOOK (CLEAN UI, NO INSTRUCTION BADGES)
             ========================================================================= */
          <motion.div
            key="speed-demo-stage-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-slate-950 via-[#0a1128] to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative min-h-[460px] flex items-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              {/* 3D Student Avatar */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group max-w-xs sm:max-w-sm w-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                  <div className="relative rounded-[2.2rem] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900 aspect-square">
                    <img
                      src={americanStudentImg}
                      alt="3D Smart American Student Avatar Looking Curious"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Clean Question Text */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                  How do these tools actually <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                    run so fast and train a real AI model?
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                  Unleashing hardware-level parallel vectorization and training a live Machine Learning classifier in just 6 lines of Python.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1 (VECTORIZATION SPEED) & STAGE 2 (WATCH AI LEARN LIVE)
             ========================================================================= */
          <motion.div
            key="speed-demo-stage-content"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header Bar */}
            <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-cyan-500 shrink-0 bg-slate-900 shadow-sm">
                  <img src={americanStudentImg} alt="Avatar" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    {activeStage === 1
                      ? 'A Sneak Peek at the Magic: Vectorization'
                      : 'Watch AI Learn, Live: 6 Lines of Python'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    {activeStage === 1
                      ? 'Stage 01: Why Python array math is 116x faster than traditional manual loops'
                      : 'Stage 02: Interactive Scikit-learn Decision Tree classifier training & real-time inference'}
                  </p>
                </div>
              </div>

              {/* Stage Pill */}
              <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold">
                0{activeStage} / 02
              </div>
            </div>

            {/* =========================================================================
               STAGE 1: VECTORIZATION SPEED BENCHMARK & INTERACTIVE SIMULATION
               ========================================================================= */}
            {activeStage === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Simulation Control & Status Toolbar */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700/80 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                        Interactive Memory & CPU Computation Simulation
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Live Benchmark
                        </span>
                      </h4>
                      <p className="text-xs text-slate-300">
                        Run individually in each box or compare both side by side
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleRunBoth}
                      disabled={isAnyRunning}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                        isAnyRunning
                          ? 'bg-cyan-600/50 text-white cursor-not-allowed animate-pulse'
                          : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:brightness-110 active:scale-95 shadow-cyan-500/25 ring-2 ring-cyan-400/50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                      {isAnyRunning
                        ? 'Computing...'
                        : isAllCompleted
                        ? 'Compare Both Again'
                        : 'Compare Both Concurrently'}
                    </button>

                    <button
                      onClick={handleResetAll}
                      disabled={slowState === 'idle' && fastState === 'idle'}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs flex items-center gap-1.5 transition-all"
                      title="Reset simulation to initial state"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset All
                    </button>
                  </div>
                </div>

                {/* 2-Column Comparison Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Left Card: Manual Loop (Slow) */}
                  <div className={`rounded-3xl overflow-hidden bg-white border-2 transition-all duration-300 shadow-xl flex flex-col justify-between ${
                    slowStep >= 0 && slowState === 'running' ? 'border-rose-400 ring-2 ring-rose-400/20' : 'border-slate-200'
                  }`}>
                    <div>
                      {/* Card Header with Dedicated Run Loop Button */}
                      <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-rose-500" />
                          <span className="font-mono text-xs font-extrabold text-slate-800">
                            {slowSnippet.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-700 border border-rose-200 hidden sm:inline-block">
                            Sequential CPU
                          </span>
                          <button
                            onClick={handleRunSlow}
                            disabled={slowState === 'running'}
                            className={`px-3 py-1.5 rounded-xl font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                              slowState === 'running'
                                ? 'bg-rose-600/40 text-white cursor-not-allowed animate-pulse'
                                : 'bg-rose-600 hover:bg-rose-500 text-white active:scale-95 shadow-rose-500/20 ring-1 ring-rose-400/40'
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            {slowState === 'running'
                              ? 'Running...'
                              : slowState === 'completed'
                              ? 'Rerun Loop'
                              : 'Run Loop'}
                          </button>
                        </div>
                      </div>

                      {/* Code Block */}
                      <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto border-b border-slate-900">
                        <pre><code>{slowSnippet.code}</code></pre>
                      </div>

                      {/* Interactive Visual Simulation Arena */}
                      <div className="p-4 bg-slate-50 space-y-3.5 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-rose-500" />
                            Memory & CPU Flow Visualization
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                            1 Core • Interpreted
                          </span>
                        </div>

                        {/* 1. Input: numbers array */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-600 font-bold">Input: numbers</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                              Type: list (array of pointers)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                            {sampleNumbers.map((num, idx) => {
                              const isCurrent = slowStep === idx;
                              const isProcessed = slowStep > idx;
                              return (
                                <div
                                  key={`slow-num-${idx}`}
                                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 ${
                                    isCurrent
                                      ? 'bg-rose-500 text-white ring-4 ring-rose-200 scale-110 shadow-md'
                                      : isProcessed
                                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                                  }`}
                                >
                                  {num}
                                </div>
                              );
                            })}
                            <span className="text-slate-400 font-mono text-xs px-1">... 1M items</span>
                          </div>
                        </div>

                        {/* 2. Single CPU Core Worker */}
                        <div className={`p-3 rounded-xl border transition-all duration-200 ${
                          slowState === 'running'
                            ? 'bg-rose-50/80 border-rose-300 shadow-sm'
                            : 'bg-white border-slate-200'
                        }`}>
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="font-bold text-slate-700 flex items-center gap-1.5">
                              <Cpu className={`w-3.5 h-3.5 ${slowState === 'running' ? 'text-rose-500 animate-spin' : 'text-slate-500'}`} />
                              CPU Core #1 Worker
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {slowStep >= 0 && slowStep < 5
                                ? `Processing item ${slowStep + 1} of 5`
                                : slowState === 'completed'
                                ? 'Completed 1,000,000 iterations'
                                : 'Awaiting execution'}
                            </span>
                          </div>

                          <div className="h-8 flex items-center justify-center font-mono text-xs">
                            {slowStep >= 0 ? (
                              <div className="flex items-center gap-2 text-rose-700 bg-white px-3 py-1 rounded-lg border border-rose-200 shadow-xs">
                                <span>x = {sampleNumbers[slowStep]}</span>
                                <ArrowRight className="w-3 h-3 text-rose-400" />
                                <span className="font-bold">{sampleNumbers[slowStep]} * 2 = {sampleNumbers[slowStep] * 2}</span>
                                <span className="text-[10px] text-slate-500">(append)</span>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">
                                Click "Run Loop" to watch CPU iterate element by element
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 3. Output: result accumulator */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-600 font-bold">Output: result</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold">
                              Type: list (dynamic reallocations)
                            </span>
                          </div>
                          <div className="bg-slate-900 rounded-lg p-2 font-mono text-xs text-rose-300 min-h-[38px] flex items-center">
                            {slowItems.length === 0 ? (
                              <span className="text-slate-500 italic">
                                result = [] <span className="text-[10px] text-slate-600">(initial empty list)</span>
                              </span>
                            ) : (
                              <div className="flex items-center gap-1">
                                <span className="text-white font-bold">result = [</span>
                                <span className="text-emerald-400 font-bold">{slowItems.join(', ')}</span>
                                {slowStep === 4 && <span className="text-slate-400">, ...</span>}
                                <span className="text-white font-bold">]</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Time & Bar */}
                    <div className="p-4 bg-white space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 font-bold">Execution Time (1M items):</span>
                        <span className="text-rose-600 font-black text-sm">
                          {slowTime > 0 ? `~ ${slowTime.toFixed(1)} ms` : slowSnippet.output}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                           className="h-full bg-rose-500 rounded-full transition-all duration-300"
                          style={{
                            width:
                              slowState === 'idle'
                                ? '100%'
                                : `${Math.max(10, ((slowStep + 1) / 5) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Card: Vectorized Array (116x Faster) */}
                  <div className={`rounded-3xl overflow-hidden bg-slate-900 text-white border-2 transition-all duration-300 shadow-2xl ring-2 flex flex-col justify-between ${
                    fastDone ? 'border-cyan-400 ring-cyan-400/40 shadow-cyan-500/10' : 'border-slate-800 ring-transparent'
                  }`}>
                    <div>
                      {/* Card Header with Dedicated Run NumPy Button */}
                      <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span className="font-mono text-xs font-extrabold text-cyan-300">
                            {fastSnippet.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700 hidden sm:inline-block">
                            Parallel C / SIMD
                          </span>
                          <button
                            onClick={handleRunFast}
                            disabled={fastState === 'running'}
                            className={`px-3 py-1.5 rounded-xl font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                              fastState === 'running'
                                ? 'bg-cyan-600/40 text-white cursor-not-allowed animate-pulse'
                                : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 active:scale-95 shadow-cyan-400/25 ring-2 ring-cyan-400/50'
                            }`}
                          >
                            <Zap className="w-3 h-3 fill-current" />
                            {fastState === 'running'
                              ? 'Firing SIMD...'
                              : fastState === 'completed'
                              ? 'Rerun NumPy'
                              : 'Run NumPy'}
                          </button>
                        </div>
                      </div>

                      {/* Code Block */}
                      <div className="p-4 bg-[#050914] text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto border-b border-slate-800">
                        <pre><code>{fastSnippet.code}</code></pre>
                      </div>

                      {/* Interactive Visual Simulation Arena */}
                      <div className="p-4 bg-slate-950/80 space-y-3.5 border-b border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            Hardware SIMD Parallel Registers
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                            AVX / Hardware Vector Lanes
                          </span>
                        </div>

                        {/* 1. Input: contiguous numpy ndarray */}
                        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-300 font-bold">Input: numbers</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-medium border border-cyan-800/60">
                              Type: numpy.ndarray (contiguous C-buffer)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                            {sampleNumbers.map((num, idx) => (
                              <div
                                key={`fast-num-${idx}`}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                                  fastDone
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                                }`}
                              >
                                {num}
                              </div>
                            ))}
                            <span className="text-slate-500 font-mono text-xs px-1">... 1M items</span>
                          </div>
                        </div>

                        {/* 2. Parallel SIMD Vector Engine Lanes */}
                        <div className={`p-3 rounded-xl border transition-all duration-300 ${
                          fastDone
                            ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                            : 'bg-slate-900 border-slate-800'
                        }`}>
                          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                            <span className="font-bold text-amber-300 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              Hardware SIMD Lanes (1 Clock Pulse)
                            </span>
                            <span className="text-[10px] text-cyan-300 font-bold">
                              {fastDone ? 'All Lanes Active Simultaneously!' : 'Ready for SIMD Vector Pulse'}
                            </span>
                          </div>

                          {/* 5 Parallel Lanes */}
                          <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-[11px]">
                            {sampleNumbers.map((num, idx) => (
                              <div
                                key={`simd-lane-${idx}`}
                                className={`py-1.5 px-1 rounded-lg border transition-all duration-300 ${
                                  fastDone
                                    ? 'bg-gradient-to-b from-cyan-500/30 to-emerald-500/20 border-cyan-400 text-cyan-200 font-bold scale-102 shadow-xs'
                                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                                }`}
                              >
                                <div className="text-[9px] text-slate-400">Lane {idx}</div>
                                <div className="text-white font-bold">{num}×2 = {num * 2}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 3. Output: numpy.ndarray result */}
                        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-300 font-bold">Output: result</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-700">
                              Type: numpy.ndarray
                            </span>
                          </div>
                          <div className="bg-[#030712] rounded-lg p-2 font-mono text-xs text-cyan-300 min-h-[38px] flex items-center">
                            {fastDone ? (
                              <div className="flex items-center gap-1 text-emerald-300 font-bold">
                                <span className="text-white">result = array([</span>
                                <span>2, 4, 6, 8, 10, ...</span>
                                <span className="text-white">])</span>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1.5 shrink-0 inline" />
                              </div>
                            ) : (
                              <span className="text-slate-500 italic">
                                result = uninitialized <span className="text-[10px] text-slate-600">(awaiting SIMD instruction)</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Time & Bar */}
                    <div className="p-4 bg-slate-900 space-y-2.5 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 font-bold">Execution Time (1M items):</span>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-black text-sm">
                            {fastDone ? `${fastTime} ms` : fastSnippet.output}
                          </span>
                          {fastDone && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse">
                              116x Faster
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: fastDone ? '3%' : '3%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hardware SIMD Insight Banner */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">
                      <strong className="text-amber-300 font-mono">Hardware Architectural Secret:</strong> Standard Python stores each number as a standalone heap object requiring repeated pointer dereferencing and dynamic type checking. NumPy packs a contiguous C-buffer directly into CPU cache and executes Single Instruction Multiple Data (SIMD) vector registers concurrently!
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono text-xs font-black shrink-0 shadow-xs">
                    116x Speedup
                  </span>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
               STAGE 2: WATCH AI LEARN, LIVE (CODE PLAYGROUND)
               ========================================================================= */}
            {activeStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CodePlayground
                  initialCode={liveDemoSnippet.code}
                  defaultOutput={liveDemoSnippet.output}
                  title="Live Machine Learning Trainer (Scikit-Learn)"
                  theme={theme}
                  enableConfetti={true}
                />
              </motion.div>
            )}

            {/* Bottom Indicator Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-end font-mono text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                0{activeStage} / 02
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

