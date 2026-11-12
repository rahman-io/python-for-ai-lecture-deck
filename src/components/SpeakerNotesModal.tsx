import React, { useState, useEffect } from 'react';
import { X, Clock, Play, Pause, RotateCcw, Volume2, Sparkles, ChevronRight } from 'lucide-react';
import { SlideData } from '../types/slides';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: SlideData;
  nextSlide?: SlideData;
  slideIndex: number;
  totalSlides: number;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
  nextSlide,
  slideIndex,
  totalSlides,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!isOpen) return null;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const textToRead = `${currentSlide.title}. ${currentSlide.speakerNotes.hook}. ${currentSlide.speakerNotes.speakingPoints.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const notes = currentSlide.speakerNotes;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg z-50 bg-[#090e1f] border-l border-slate-700/80 shadow-2xl flex flex-col text-slate-100 backdrop-blur-xl">
      {/* Header with Timer */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PRESENTER NOTES
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Slide {slideIndex + 1} of {totalSlides}
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-200 mt-1 truncate max-w-xs">
            {currentSlide.title}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {/* Timer Display */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTime(seconds)}</span>
          </div>

          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setSeconds(0)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Reset timer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Notes Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Timing Hint & Voice Button */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">Recommended Timing:</span>
            <span className="font-semibold text-amber-400 font-mono">{notes.timing}</span>
          </div>

          {'speechSynthesis' in window && (
            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                isSpeaking
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Auditory rehearsal via speech synthesis"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Stop Audio' : 'Preview Cue'}</span>
            </button>
          )}
        </div>

        {/* Stage Hook & Delivery Prompt */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The TED-Talk Delivery Hook</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-100 font-medium">
            {notes.hook}
          </p>
        </div>

        {/* Detailed Speaking Points */}
        <div>
          <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2.5">
            Spoken Talking Points (Do not read word-for-word)
          </h5>
          <div className="space-y-2.5">
            {notes.speakingPoints.map((point, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 leading-relaxed flex gap-2.5"
              >
                <span className="text-cyan-400 font-mono font-bold">{i + 1}.</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pedagogical Tip for Beginners */}
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40">
          <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono mb-1.5">
            Pedagogical Tip for Beginners
          </h5>
          <p className="text-xs leading-relaxed text-cyan-100/90">
            {notes.pedagogicalTip}
          </p>
        </div>

        {/* Next Slide Preview */}
        {nextSlide && (
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
              Coming Up Next (Slide #{slideIndex + 2})
            </span>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="truncate max-w-[260px] font-medium">{nextSlide.title}</span>
              <span className="text-slate-500 font-mono flex items-center gap-1">
                {nextSlide.thread} <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
