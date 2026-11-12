import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles, CheckCircle2, Terminal, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

import simplicityBannerImg from '../assets/images/python_simplicity_banner_3d_1794341415830.jpg';

export const InteractiveCodeComparison: React.FC = () => {
  // Java execution state
  const [isJavaExecuting, setIsJavaExecuting] = useState<boolean>(false);
  const [activeJavaLine, setActiveJavaLine] = useState<number | null>(null);
  const [hasJavaRun, setHasJavaRun] = useState<boolean>(false);

  // Python execution state
  const [isPythonExecuting, setIsPythonExecuting] = useState<boolean>(false);
  const [activePythonLine, setActivePythonLine] = useState<number | null>(null);
  const [hasPythonRun, setHasPythonRun] = useState<boolean>(false);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899'],
    });
  };

  // Run Java execution step-by-step
  const handleRunJava = () => {
    setIsJavaExecuting(true);
    setHasJavaRun(false);
    setActiveJavaLine(1);

    // Step through lines 1 -> 2 -> 3 -> 4 -> 5
    setTimeout(() => setActiveJavaLine(2), 400);
    setTimeout(() => setActiveJavaLine(3), 800);
    setTimeout(() => setActiveJavaLine(4), 1200);
    setTimeout(() => setActiveJavaLine(5), 1500);
    setTimeout(() => {
      setIsJavaExecuting(false);
      setActiveJavaLine(null);
      setHasJavaRun(true);
      triggerConfetti();
    }, 1800);
  };

  // Run Python execution directly
  const handleRunPython = () => {
    setIsPythonExecuting(true);
    setHasPythonRun(false);
    setActivePythonLine(1);

    setTimeout(() => {
      setIsPythonExecuting(false);
      setActivePythonLine(null);
      setHasPythonRun(true);
      triggerConfetti();
    }, 500);
  };

  const handleRunBoth = () => {
    handleRunJava();
    handleRunPython();
  };

  const handleReset = () => {
    setIsJavaExecuting(false);
    setActiveJavaLine(null);
    setHasJavaRun(false);

    setIsPythonExecuting(false);
    setActivePythonLine(null);
    setHasPythonRun(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      {/* Top Global Run & Comparison Control Bar */}
      <div className="bg-white/90 backdrop-blur border-2 border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-[#15284f] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
            <Terminal className="w-4 h-4 text-[#f59e0b]" />
            <span>Interactive Code Runner</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
            Compare execution complexity side by side
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <button
            onClick={handleRunBoth}
            disabled={isJavaExecuting || isPythonExecuting}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Both Programs</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition"
            title="Reset Output"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Side-by-Side Code Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* JAVA CODE CARD */}
        <div className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
          {/* Header */}
          <div className="bg-[#15284f] text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-[10px] font-mono font-black">
                JAVA
              </span>
              <h3 className="text-xs font-bold font-mono">
                Java - Traditional Boilerplate
              </h3>
            </div>

            <button
              onClick={handleRunJava}
              disabled={isJavaExecuting}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition ${
                isJavaExecuting
                  ? 'bg-amber-500/30 text-amber-300 animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isJavaExecuting ? 'Executing...' : 'Run Java'}</span>
            </button>
          </div>

          {/* Code Block Container */}
          <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed font-normal min-h-[160px] flex flex-col justify-center relative">
            <div className="space-y-1">
              {/* Line 1 */}
              <div className={`flex items-start gap-3 px-2 py-0.5 rounded transition-all ${
                activeJavaLine === 1 ? 'bg-amber-500/30 border-l-4 border-amber-400 font-bold text-white' : 'hover:bg-slate-800/50'
              }`}>
                <span className="text-slate-500 select-none text-[11px] w-4 text-right">1</span>
                <span className="text-sky-300">public class <span className="text-amber-300">HelloWorld</span> &#123;</span>
              </div>

              {/* Line 2 */}
              <div className={`flex items-start gap-3 px-2 py-0.5 rounded transition-all ${
                activeJavaLine === 2 ? 'bg-amber-500/30 border-l-4 border-amber-400 font-bold text-white' : 'hover:bg-slate-800/50'
              }`}>
                <span className="text-slate-500 select-none text-[11px] w-4 text-right">2</span>
                <span className="text-sky-300 pl-4">public static void <span className="text-emerald-300">main</span>(String[] args) &#123;</span>
              </div>

              {/* Line 3 */}
              <div className={`flex items-start gap-3 px-2 py-0.5 rounded transition-all ${
                activeJavaLine === 3 ? 'bg-amber-400/40 border-l-4 border-amber-400 font-bold text-white shadow-sm' : 'hover:bg-slate-800/50'
              }`}>
                <span className="text-slate-500 select-none text-[11px] w-4 text-right">3</span>
                <span className="text-purple-300 pl-8">System.out.println(<span className="text-amber-300">"Hello, World!"</span>);</span>
              </div>

              {/* Line 4 */}
              <div className={`flex items-start gap-3 px-2 py-0.5 rounded transition-all ${
                activeJavaLine === 4 ? 'bg-amber-500/30 border-l-4 border-amber-400 font-bold text-white' : 'hover:bg-slate-800/50'
              }`}>
                <span className="text-slate-500 select-none text-[11px] w-4 text-right">4</span>
                <span className="text-sky-300 pl-4">&#125;</span>
              </div>

              {/* Line 5 */}
              <div className={`flex items-start gap-3 px-2 py-0.5 rounded transition-all ${
                activeJavaLine === 5 ? 'bg-amber-500/30 border-l-4 border-amber-400 font-bold text-white' : 'hover:bg-slate-800/50'
              }`}>
                <span className="text-slate-500 select-none text-[11px] w-4 text-right">5</span>
                <span className="text-sky-300">&#125;</span>
              </div>
            </div>
          </div>

          {/* Terminal Output Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 font-semibold">Output:</span>
            {hasJavaRun ? (
              <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold animate-fade-in shadow-xs">
                "Hello, World!"
              </span>
            ) : isJavaExecuting ? (
              <span className="text-amber-600 font-bold animate-pulse flex items-center gap-1">
                <Zap className="w-3 h-3" /> Step-by-step compiling...
              </span>
            ) : (
              <span className="text-slate-400 italic">Press "Run Java" to execute</span>
            )}
          </div>
        </div>

        {/* PYTHON CODE CARD */}
        <div className="bg-white border-2 border-amber-400 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between ring-2 ring-amber-400/30">
          {/* Header */}
          <div className="bg-[#f59e0b] text-slate-950 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#15284f] text-white text-[10px] font-mono font-black">
                PYTHON
              </span>
              <h3 className="text-xs font-extrabold font-mono text-[#15284f]">
                Python - Pure Human Intent
              </h3>
            </div>

            <button
              onClick={handleRunPython}
              disabled={isPythonExecuting}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition ${
                isPythonExecuting
                  ? 'bg-[#15284f]/40 text-white animate-pulse'
                  : 'bg-[#15284f] hover:bg-[#1e3a8a] text-amber-400 shadow-md'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isPythonExecuting ? 'Running...' : 'Run Python'}</span>
            </button>
          </div>

          {/* Code Block Container */}
          <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed font-normal min-h-[160px] flex flex-col justify-center relative">
            <div className="space-y-1">
              {/* Line 1 */}
              <div className={`flex items-start gap-3 px-2 py-2 rounded transition-all ${
                activePythonLine === 1
                  ? 'bg-emerald-500/30 border-l-4 border-emerald-400 font-bold text-white shadow-md'
                  : 'hover:bg-slate-800/50'
              }`}>
                <span className="text-slate-500 select-none text-[11px] w-4 text-right">1</span>
                <span className="text-emerald-400 font-bold">print(<span className="text-amber-300">"Hello, World!"</span>)</span>
              </div>
            </div>

            {/* ONLY DISPLAYED WHEN EXECUTION FINISHES (hasPythonRun === true) */}
            {hasPythonRun && (
              <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-sans italic flex items-center gap-1 animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>No class wrappers, no main functions, no semicolons required.</span>
              </div>
            )}
          </div>

          {/* Terminal Output Footer */}
          <div className="p-3 bg-amber-50/80 border-t border-amber-200 flex items-center justify-between text-xs font-mono">
            <span className="text-[#b45309] font-bold">Output:</span>
            {hasPythonRun ? (
              <span className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-black shadow-md animate-fade-in flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> "Hello, World!"
              </span>
            ) : isPythonExecuting ? (
              <span className="text-emerald-600 font-bold animate-pulse flex items-center gap-1">
                <Zap className="w-3 h-3" /> Executing line 1...
              </span>
            ) : (
              <span className="text-amber-800/60 italic">Press "Run Python" to execute</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Compact 3D Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-md bg-slate-950 h-20 sm:h-24 group">
        <img
          src={simplicityBannerImg}
          alt="3D Students Collaborating in Python Lab"
          className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent flex items-center p-3 sm:p-4">
          <div className="space-y-0.5 max-w-lg text-white">
            <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
              Why write 5 lines when 1 clean thought is enough?
            </h4>
            <p className="text-[11px] text-slate-300 font-medium leading-snug">
              Python lets software engineers and computer science students express ideas directly without syntax overhead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
