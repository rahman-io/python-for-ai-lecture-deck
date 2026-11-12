import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Terminal,
  Files,
  Search,
  GitBranch,
  Bug,
  LayoutGrid,
  Settings,
  ChevronRight,
  ChevronDown,
  X,
  Copy,
  Check,
  Sparkles,
  Laptop,
} from 'lucide-react';

interface VsCodeMacbookSlideProps {
  lecturerName?: string;
  theme?: 'kinetic' | 'focus' | 'slideegg';
}

export const VsCodeMacbookSlide: React.FC<VsCodeMacbookSlideProps> = ({
  lecturerName = 'A. Rahman',
  theme = 'slideegg',
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal'>('editor');
  const [copied, setCopied] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Lecturer Name: ${lecturerName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-4 flex flex-col items-center justify-center animate-fade-in select-none">
      {/* MacBook Hardware Chassis */}
      <div className="relative w-full rounded-[2rem] sm:rounded-[2.4rem] bg-[#1e232a] p-2.5 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border-2 border-slate-700/60 ring-1 ring-white/10">
        {/* MacBook Top Display Bezel with Notch & Webcam */}
        <div className="relative flex items-center justify-center pb-2 pt-0.5">
          {/* Centered Camera & Green Sensor Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/80 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-[#111827] ring-1 ring-slate-700 relative flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-500/70" />
            </div>
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" title="FaceTime HD Camera Active" />
          </div>
        </div>

        {/* MacBook Display Screen: Visual Studio Code Environment */}
        <div className="relative rounded-2xl overflow-hidden bg-[#1e1e1e] border border-slate-800 shadow-2xl flex flex-col text-slate-300 font-sans">
          {/* VS Code macOS Title Bar */}
          <div className="h-9 bg-[#252526] border-b border-[#191919] px-3 flex items-center justify-between text-xs select-none">
            {/* macOS Window Controls (Traffic Lights) */}
            <div className="flex items-center gap-2 w-20">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-inner hover:opacity-80 transition cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-inner hover:opacity-80 transition cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-inner hover:opacity-80 transition cursor-pointer" />
            </div>

            {/* VS Code Center Title */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <span className="text-blue-400 font-bold">VS Code</span>
              <span className="text-slate-600">—</span>
              <span className="text-slate-200">lecturer.py</span>
              <span className="text-slate-600">—</span>
              <span className="text-slate-400">Python for AI</span>
            </div>

            {/* Run & Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0e639c] hover:bg-[#1177bb] text-white text-[10px] font-mono font-bold transition shadow-xs cursor-pointer"
                title="Run Python File"
              >
                <Play className={`w-3 h-3 fill-white ${isRunning ? 'animate-spin' : ''}`} />
                <span>Run</span>
              </button>
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition"
                title="Copy Lecturer Name"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* VS Code Workspace Body */}
          <div className="flex h-[380px] sm:h-[420px] bg-[#1e1e1e]">
            {/* Left Activity Bar */}
            <div className="w-11 bg-[#333333] flex flex-col items-center justify-between py-3 border-r border-[#252526] shrink-0 select-none">
              <div className="flex flex-col items-center gap-4 text-slate-400">
                <div className="text-white relative cursor-pointer" title="Explorer">
                  <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-white" />
                  <Files className="w-5 h-5" />
                </div>
                <div className="hover:text-white transition cursor-pointer" title="Search">
                  <Search className="w-5 h-5" />
                </div>
                <div className="hover:text-white transition cursor-pointer" title="Source Control">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div className="hover:text-white transition cursor-pointer" title="Run and Debug">
                  <Bug className="w-5 h-5" />
                </div>
                <div className="hover:text-white transition cursor-pointer" title="Extensions">
                  <LayoutGrid className="w-5 h-5" />
                </div>
              </div>
              <div className="text-slate-400 hover:text-white transition cursor-pointer">
                <Settings className="w-5 h-5" />
              </div>
            </div>

            {/* Left Side Explorer Tree (Collapsible on mobile) */}
            <div className="hidden sm:flex flex-col w-48 bg-[#252526] border-r border-[#191919] text-xs shrink-0 select-none">
              <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between">
                <span>Explorer</span>
              </div>
              <div className="px-2 py-1 flex items-center gap-1 font-bold text-slate-300">
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="uppercase tracking-wider text-[10px]">PYTHON-FOR-AI</span>
              </div>
              <div className="pl-4 pr-2 py-0.5 space-y-0.5 text-slate-300 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 py-1 px-1.5 rounded bg-[#37373d] text-white">
                  <span className="text-[#387eb8] font-bold">🐍</span>
                  <span className="truncate">lecturer.py</span>
                </div>
                <div className="flex items-center gap-1.5 py-1 px-1.5 text-slate-400 hover:text-slate-200 cursor-pointer">
                  <span className="text-amber-400 font-bold">⚙️</span>
                  <span className="truncate">config.json</span>
                </div>
                <div className="flex items-center gap-1.5 py-1 px-1.5 text-slate-400 hover:text-slate-200 cursor-pointer">
                  <span className="text-blue-400 font-bold">📝</span>
                  <span className="truncate">README.md</span>
                </div>
              </div>
            </div>

            {/* Editor + Integrated Terminal Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Editor Tabs Bar */}
              <div className="h-9 bg-[#252526] flex items-center border-b border-[#191919] overflow-x-auto select-none">
                <div className="flex items-center gap-2 px-3.5 h-full bg-[#1e1e1e] border-t-2 border-[#007acc] text-slate-200 text-xs font-mono">
                  <span className="text-[#387eb8] font-bold">🐍</span>
                  <span>lecturer.py</span>
                  <X className="w-3.5 h-3.5 text-slate-500 hover:text-white transition ml-1 cursor-pointer" />
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm bg-[#1e1e1e] flex">
                {/* Line Numbers */}
                <div className="w-8 select-none text-slate-600 text-right pr-3 font-mono space-y-1">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                </div>

                {/* Code Content */}
                <div className="flex-1 space-y-1 pl-2 text-slate-200">
                  <div className="text-slate-500 italic">
                    # ======================================================
                  </div>
                  <div className="text-slate-500 italic">
                    # Computer Engineering — Lecture 01
                  </div>
                  <div className="text-slate-500 italic">
                    # ======================================================
                  </div>
                  <div className="pt-2">
                    <span className="text-[#569cd6] font-semibold">lecturer_name</span>
                    <span className="text-white"> = </span>
                    <span className="text-[#ce9178] font-bold">"{lecturerName}"</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-[#dcdcaa]">print</span>
                    <span className="text-white">(</span>
                    <span className="text-[#569cd6]">f</span>
                    <span className="text-[#ce9178]">"Lecturer Name: &#123;</span>
                    <span className="text-[#9cdcfe]">lecturer_name</span>
                    <span className="text-[#ce9178]">&#125;"</span>
                    <span className="text-white">)</span>
                  </div>
                  <div className="pt-2 flex items-center">
                    <span className="w-2 h-4 bg-white/80 animate-pulse inline-block" />
                  </div>
                </div>
              </div>

              {/* Integrated VS Code Terminal (MacBook style zsh terminal) */}
              <div className="h-32 sm:h-36 bg-[#181818] border-t border-[#2b2b2b] flex flex-col font-mono text-xs">
                {/* Terminal Header Tabs */}
                <div className="h-7 bg-[#1f1f1f] px-3 flex items-center justify-between border-b border-[#2b2b2b] text-[11px] select-none text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold border-b border-white pb-0.5 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-[#007acc]" />
                      <span>TERMINAL</span>
                    </span>
                    <span className="hover:text-slate-200 cursor-pointer">OUTPUT</span>
                    <span className="hover:text-slate-200 cursor-pointer">DEBUG CONSOLE</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">zsh — macos</span>
                </div>

                {/* Terminal Output */}
                <div className="flex-1 p-3 overflow-y-auto space-y-1 font-mono text-xs text-slate-300">
                  <div className="text-slate-400 flex items-center gap-1">
                    <span className="text-emerald-400 font-bold">➜</span>
                    <span className="text-cyan-400 font-bold">python-for-ai</span>
                    <span className="text-slate-500 font-normal">(main)</span>
                    <span className="text-white">$ python3 src/lecturer.py</span>
                  </div>

                  {hasRun && (
                    <motion.div
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-1"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#252526] border border-[#f59e0b]/40 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span className="text-slate-300 text-xs">Lecturer Name:</span>
                        <span className="font-extrabold text-[#f59e0b] text-sm tracking-wide">
                          {lecturerName}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* VS Code Status Bar (Blue Bottom Bar) */}
          <div className="h-6 bg-[#007acc] text-white px-3 flex items-center justify-between text-[11px] font-mono select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                <span>main</span>
              </span>
              <span>0 errors</span>
              <span>0 warnings</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Python 3.12.0 64-bit</span>
              <span>UTF-8</span>
              <span>Spaces: 4</span>
            </div>
          </div>
        </div>

        {/* MacBook Bottom Base / Lip Accent */}
        <div className="mt-2 flex items-center justify-center">
          <div className="w-24 h-1 rounded-full bg-slate-600/50" />
        </div>
      </div>
    </div>
  );
};
