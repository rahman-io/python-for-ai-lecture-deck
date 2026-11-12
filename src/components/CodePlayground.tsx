import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CodePlaygroundProps {
  initialCode: string;
  defaultOutput: string;
  runHandler?: (code: string) => string;
  language?: string;
  title?: string;
  editable?: boolean;
  theme?: 'kinetic' | 'focus' | 'slideegg';
  enableConfetti?: boolean;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  defaultOutput,
  runHandler,
  language = 'python',
  title = 'Interactive Python Console',
  editable = true,
  theme = 'kinetic',
  enableConfetti = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(defaultOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setIsSuccess(false);

    setTimeout(() => {
      if (runHandler) {
        setOutput(runHandler(code));
      } else {
        // Evaluate simulated python output based on simple keywords
        let simOutput = '';
        if (code.includes('max_depth')) {
          const depthMatch = code.match(/max_depth\s*=\s*(\d+)/);
          const depth = depthMatch ? parseInt(depthMatch[1], 10) : 3;
          const acc = depth === 1 ? '71.3%' : depth === 2 ? '94.0%' : depth === 3 ? '98.6%' : '99.3% (potential overfit)';
          simOutput = `Training DecisionTreeClassifier(max_depth=${depth}) on 150 Iris samples...\nTree Depth: ${depth}\nAccuracy Score: ${acc}\n>>> Predicted Flower Class: Iris-Setosa (p = 0.99)`;
        } else if (code.includes('print(')) {
          const match = code.match(/print\((["'])(.*?)\1\)/);
          simOutput = match ? match[2] : 'Hello, AI Engineers!';
        } else {
          simOutput = defaultOutput;
        }
        setOutput(simOutput);
      }
      setIsRunning(false);
      setIsSuccess(true);
      if (enableConfetti) {
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#f59e0b', '#38bdf8', '#ec4899'],
        });
      }
      setTimeout(() => setIsSuccess(false), 2000);
    }, 350);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(defaultOutput);
    setIsSuccess(false);
  };

  const isSlideEgg = theme === 'slideegg';

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border transition-all ${
        isSlideEgg
          ? 'border-slate-200/90 bg-white shadow-xl'
          : 'border-slate-700/80 bg-[#090e1f]/95 shadow-2xl backdrop-blur-md'
      }`}
    >
      {/* Terminal Title Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2.5 text-xs ${
          isSlideEgg
            ? 'bg-[#15284f] text-white border-b border-[#0f1c38]'
            : 'bg-slate-900/90 text-slate-400 border-b border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
          </div>
          <span
            className={`ml-2 font-mono font-medium flex items-center gap-1.5 ${
              isSlideEgg ? 'text-white' : 'text-slate-300'
            }`}
          >
            <Terminal className={`w-3.5 h-3.5 ${isSlideEgg ? 'text-[#f59e0b]' : 'text-cyan-400'}`} />
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition text-[11px] ${
              isSlideEgg
                ? 'hover:bg-white/10 text-slate-200 hover:text-white'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Reset code to initial snippet"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-lg font-medium text-xs transition shadow-sm ${
              isSuccess
                ? 'bg-emerald-600 text-white'
                : isSlideEgg
                ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold shadow-amber-500/20'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-semibold'
            }`}
          >
            {isSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isRunning ? 'Executing...' : isSuccess ? 'Executed' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x ${
          isSlideEgg ? 'divide-slate-200' : 'divide-slate-800'
        }`}
      >
        <div className={`md:col-span-7 p-3.5 ${isSlideEgg ? 'bg-slate-50' : 'bg-[#070b18]'}`}>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
            <span>Editor ({language})</span>
            {editable && (
              <span className={isSlideEgg ? 'text-[#b45309] font-medium' : 'text-amber-400/80'}>
                Editable — Try changing values!
              </span>
            )}
          </div>
          {editable ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-44 bg-transparent font-mono text-[13px] leading-relaxed focus:outline-none resize-none p-1 rounded ${
                isSlideEgg
                  ? 'text-[#15284f] font-semibold selection:bg-amber-200'
                  : 'text-amber-200/95 border border-transparent focus:border-slate-800'
              }`}
              spellCheck={false}
            />
          ) : (
            <pre
              className={`font-mono text-[13px] leading-relaxed overflow-x-auto p-1 h-44 ${
                isSlideEgg ? 'text-[#15284f] font-semibold' : 'text-amber-200/95'
              }`}
            >
              <code>{code}</code>
            </pre>
          )}
        </div>

        {/* Live Output Panel */}
        <div className={`md:col-span-5 p-3.5 flex flex-col justify-between ${isSlideEgg ? 'bg-[#0d172e]' : 'bg-[#0a0f24]'}`}>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Terminal stdout</span>
            </div>
            <pre className="font-mono text-[12px] leading-relaxed text-cyan-300 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 min-h-[140px] whitespace-pre-wrap overflow-y-auto">
              {output}
            </pre>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Process finished with exit code 0</span>
            <span className="text-emerald-400 font-medium">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
