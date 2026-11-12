import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import fiveInternationalStudentsImg from '../assets/images/students_seated_listening_3d_1794408330469.jpg';
import europeanAmphitheaterImg from '../assets/images/european_lecture_hall_5_students_1794413079436.jpg';
import {
  Code,
  Sparkles,
  Terminal,
  Cpu,
  Brain,
  Globe,
  Layers,
  ArrowRight,
  Zap,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  BookOpen,
  Mail,
  GraduationCap,
  Calendar,
  HelpCircle,
  ExternalLink,
  RotateCw,
} from 'lucide-react';
import { SlideData } from '../types/slides';
import { CodePlayground } from './CodePlayground';
import { LanguageBubbleCloud } from './LanguageBubbleCloud';
import { InteractiveTimeline } from './InteractiveTimeline';
import { TiobeRankingTable } from './TiobeRankingTable';
import { PythonZoomReveal } from './PythonZoomReveal';
import { InteractiveCodeComparison } from './InteractiveCodeComparison';
import { PythonOriginStory } from './PythonOriginStory';
import { PythonGrowthCurve } from './PythonGrowthCurve';
import { PythonThreeColumnCompare } from './PythonThreeColumnCompare';
import { AiDefinitionEntrance } from './AiDefinitionEntrance';
import { AiHistoryTimeline } from './AiHistoryTimeline';
import { HowAiIsSmart } from './HowAiIsSmart';
import { ThreeIngredientsAi } from './ThreeIngredientsAi';
import { PythonAiConvergence } from './PythonAiConvergence';
import { WhyPythonForAi } from './WhyPythonForAi';
import { CourseCover } from './CourseCover';
import { BeforeRealAiToolsQuestion } from './BeforeRealAiToolsQuestion';
import { VectorizationAndLiveDemo } from './VectorizationAndLiveDemo';
import { ExplodingTransitionQuestion } from './ExplodingTransitionQuestion';
import { VariablesLunchboxDrag } from './VariablesLunchboxDrag';
import { VariablesMultiBoxLab } from './VariablesMultiBoxLab';
import { VariablesStoryPracticeLab } from './VariablesStoryPracticeLab';
import { LectureConclusionRecap } from './LectureConclusionRecap';
import { HomeworkAndNextWeek } from './HomeworkAndNextWeek';
import { VsCodeMacbookSlide } from './VsCodeMacbookSlide';

interface SlideViewerProps {
  slide: SlideData;
  revealedBulletCount: number;
  onOpenImageGen: () => void;
  onNextPointOrSlide: () => void;
  theme?: 'kinetic' | 'focus' | 'slideegg';
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slide,
  revealedBulletCount,
  onOpenImageGen,
  onNextPointOrSlide,
  theme = 'kinetic',
}) => {
  const [vectorSpeedTested, setVectorSpeedTested] = useState(false);
  const [annotatedLineIndex, setAnnotatedLineIndex] = useState(0);

  // Slide 2 Dynamic States: Cycling Binary Signals & Human Language Highlighting
  const [activeLangIndex, setActiveLangIndex] = useState(0);

  // Mapped binary stream pulses representing high/low silicon voltages that translate into human words
  const binaryPatterns = [
    { code: '01001000 01101001 00100001', text: 'Hi! / Hello!', lang: 'English', hex: 'ASCII 72 105 33' },
    { code: '01000011 01111010 01100101', text: 'Cześć!', lang: 'Polish', hex: 'ASCII 67 122 101' },
    { code: '01001101 01100101 01110010', text: 'Merhaba!', lang: 'Turkish', hex: 'ASCII 77 101 114' },
    { code: '01001000 01100001 01101100 01101111', text: 'Halo, apa kabar?', lang: 'Indonesian', hex: 'ASCII 72 97 108 111' },
    { code: '01001011 01101111 01101110', text: 'Konnichiwa!', lang: 'Japanese', hex: 'ASCII 75 111 110' },
  ];

  // Reset local state when slide changes
  useEffect(() => {
    setVectorSpeedTested(false);
    setAnnotatedLineIndex(0);
  }, [slide.id]);

  // Dynamic animation timer for Slide 2 (Syncs human language exchange with machine binary decoding)
  useEffect(() => {
    if (slide.layout !== 'split-visual') return;

    const interval = setInterval(() => {
      setActiveLangIndex((prev) => (prev + 1) % 5);
    }, 2000);

    return () => clearInterval(interval);
  }, [slide.id]);

  const isPython = slide.thread === 'python';
  const isAi = slide.thread === 'ai';
  const isConvergence = slide.thread === 'convergence';
  const isSlideEgg = theme === 'slideegg';

  // Helper for Theme 3 Two-Tone Headings (Deep Navy #15284f + Golden Amber #f59e0b)
  const renderTwoToneHeading = (
    title: string,
    className: string = "text-3xl sm:text-4xl font-extrabold tracking-tight",
    tag: 'h1' | 'h2' = 'h2'
  ) => {
    if (!isSlideEgg) {
      const Tag = tag;
      return <Tag className={`${className} text-white`}>{title}</Tag>;
    }

    const words = title.split(' ');
    if (words.length <= 1) {
      const Tag = tag;
      return <Tag className={`${className} text-[#15284f]`}>{title}</Tag>;
    }

    // Split after ~60% of words or around prepositions for natural phrasing matching the PDF
    let splitIdx = Math.max(1, Math.ceil(words.length * 0.6));
    const prepIdx = words.findIndex((w, i) => i > 0 && ['of', 'for', 'in', 'and', 'to', 'vs', 'the', 'how'].includes(w.toLowerCase()));
    if (prepIdx !== -1 && prepIdx <= words.length - 2) {
      splitIdx = prepIdx + 1;
    }

    const firstPart = words.slice(0, splitIdx).join(' ');
    const secondPart = words.slice(splitIdx).join(' ');
    const Tag = tag;

    return (
      <Tag className={className}>
        <span className="text-[#15284f]">{firstPart} </span>
        <span className="text-[#f59e0b]">{secondPart}</span>
      </Tag>
    );
  };

  // Helper for SlideEgg Circular Numbered Badges (matching PDF pages 2, 8, 13, 14, 18, 19)
  const renderNumberBadge = (num: string | number, variant: 'amber' | 'navy' = 'amber') => {
    const text = typeof num === 'number' ? String(num).padStart(2, '0') : num;
    return (
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-white shadow-md shrink-0 ${
          variant === 'amber' ? 'bg-[#f59e0b]' : 'bg-[#15284f]'
        }`}
      >
        {text}
      </div>
    );
  };

  // Helper to render customized, framed photography matching SlideEgg PDF templates
  const renderSlideEggImage = (
    src: string,
    alt: string,
    variant: 'circle' | 'rounded-accent' | 'split-card' | 'banner' = 'rounded-accent',
    caption?: string,
    className: string = ""
  ) => {
    if (variant === 'circle') {
      return (
        <div className={`relative flex flex-col items-center justify-center p-2 ${className}`}>
          {/* Dual ring accent in Navy & Amber, matching PDF pages 3, 7, 12, 20 */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <div className="absolute inset-0 rounded-full border-4 border-[#f59e0b] -rotate-6 scale-105 pointer-events-none opacity-80" />
            <div className="absolute inset-1 rounded-full border-4 border-[#15284f] rotate-3 scale-100 pointer-events-none opacity-90" />
            <motion.div
              animate={{
                y: [0, -10, 0, 6, 0],
                x: [0, 5, 0, -4, 0],
                rotate: [45, 60, 35, 45],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-1 right-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#f59e0b]"
            />
            <motion.div
              animate={{
                y: [0, 9, 0, -8, 0],
                x: [0, -5, 0, 4, 0],
                rotate: [-45, -30, -58, -45],
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
              className="absolute -bottom-1 left-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#15284f]"
            />
            <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img src={src} alt={alt} className="w-full h-full object-cover transform hover:scale-105 transition duration-500" />
            </div>
          </div>
          {caption && (
            <p className="mt-2.5 text-xs font-mono font-semibold text-slate-600 text-center max-w-xs">
              {caption}
            </p>
          )}
        </div>
      );
    }

    if (variant === 'rounded-accent') {
      return (
        <div className={`relative ${className}`}>
          <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2.5 shadow-xl relative">
            <div className="overflow-hidden rounded-2xl relative group">
              <img src={src} alt={alt} className="w-full h-44 sm:h-52 md:h-60 object-cover transform group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              {caption && (
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-white tracking-wide uppercase px-2.5 py-1 rounded bg-[#15284f]/90 backdrop-blur-sm shadow-sm">
                    {caption}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 font-bold bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                    AI Engineering
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (variant === 'split-card') {
      return (
        <div className={`overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg flex flex-col ${className}`}>
          <div className="relative h-44 sm:h-56 overflow-hidden group">
            <img src={src} alt={alt} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            {caption && (
              <span className="absolute bottom-2.5 left-3 text-xs font-mono font-bold text-white bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm">
                {caption}
              </span>
            )}
          </div>
          <div className="p-3 bg-[#15284f] text-white flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">{alt}</span>
            <span className="text-[#f59e0b] text-xs font-bold font-mono">BSc Lecture</span>
          </div>
        </div>
      );
    }

    // banner
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-slate-200 shadow-md ${className}`}>
        <img src={src} alt={alt} className="w-full h-36 sm:h-44 object-cover" />
        {caption && (
          <div className="absolute bottom-2 left-3 bg-[#15284f]/90 text-white text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
            {caption}
          </div>
        )}
      </div>
    );
  };

  // Syntax highlighter helper adapting to dark vs SlideEgg light mode
  const renderSyntaxHighlitCode = (code: string) => {
    return code.split('\n').map((line, idx) => {
      const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');

      return (
        <div key={idx} className="table-row font-mono text-[13px] leading-relaxed">
          <span
            className={`table-cell pr-4 select-none text-right w-8 text-xs ${
              isSlideEgg ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {idx + 1}
          </span>
          <span
            className={`table-cell whitespace-pre ${
              isComment
                ? isSlideEgg ? 'text-slate-400 italic' : 'text-slate-500 italic'
                : isSlideEgg ? 'text-slate-900 font-medium' : 'text-slate-200'
            }`}
          >
            {line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:def|class|return|import|from|in|for|if|else|True|False|public|static|void|print)\b)/g).map((token, tIdx) => {
              if (/^["'].*["']$/.test(token)) {
                return (
                  <span key={tIdx} className={isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}>
                    {token}
                  </span>
                );
              } else if (/^(def|class|return|import|from|in|for|if|else|True|False|public|static|void)$/.test(token)) {
                return (
                  <span key={tIdx} className={isSlideEgg ? 'text-[#15284f] font-bold' : 'text-cyan-400 font-semibold'}>
                    {token}
                  </span>
                );
              } else if (token === 'print') {
                return (
                  <span key={tIdx} className={isSlideEgg ? 'text-[#047857] font-bold' : 'text-emerald-400 font-semibold'}>
                    {token}
                  </span>
                );
              }
              return token;
            })}
          </span>
        </div>
      );
    });
  };

  // Deterministic scattered geometric shapes per slide (2 to 5 shapes per slide)
  // Animated with smooth, independent levitating/floating trajectories across all slides
  const renderScatteredShapes = () => {
    const shapesConfig = [
      [
        { top: '8%', left: '88%', size: 'w-7 h-7 sm:w-8 sm:h-8', color: '#15284f', rotate: 25, type: 'triangle' },
        { top: '82%', left: '92%', size: 'w-5 h-5 sm:w-6 sm:h-6', color: '#f59e0b', rotate: 180, type: 'triangle' },
        { top: '85%', left: '4%', size: 'w-6 h-6', color: '#f59e0b', rotate: 45, type: 'triangle' },
      ],
      [
        { top: '12%', left: '94%', size: 'w-6 h-6', color: '#f59e0b', rotate: -30, type: 'triangle' },
        { top: '75%', left: '2%', size: 'w-8 h-8', color: '#15284f', rotate: 15, type: 'triangle' },
        { top: '88%', left: '85%', size: 'w-5 h-5', color: '#f59e0b', rotate: 90, type: 'triangle' },
        { top: '15%', left: '4%', size: 'w-5 h-5', color: '#15284f', rotate: 210, type: 'triangle' },
      ],
      [
        { top: '6%', left: '82%', size: 'w-8 h-8', color: '#15284f', rotate: 135, type: 'triangle' },
        { top: '90%', left: '8%', size: 'w-6 h-6', color: '#f59e0b', rotate: 0, type: 'triangle' },
        { top: '78%', left: '94%', size: 'w-6 h-6', color: '#f59e0b', rotate: 240, type: 'triangle' },
      ],
      [
        { top: '10%', left: '90%', size: 'w-7 h-7', color: '#f59e0b', rotate: 60, type: 'triangle' },
        { top: '80%', left: '5%', size: 'w-7 h-7', color: '#15284f', rotate: -45, type: 'triangle' },
        { top: '86%', left: '92%', size: 'w-6 h-6', color: '#15284f', rotate: 195, type: 'triangle' },
        { top: '22%', left: '95%', size: 'w-4 h-4', color: '#f59e0b', rotate: 110, type: 'triangle' },
      ],
      [
        { top: '14%', left: '86%', size: 'w-8 h-8', color: '#15284f', rotate: -15, type: 'triangle' },
        { top: '84%', left: '3%', size: 'w-5 h-5', color: '#f59e0b', rotate: 135, type: 'triangle' },
        { top: '76%', left: '88%', size: 'w-7 h-7', color: '#f59e0b', rotate: 270, type: 'triangle' },
        { top: '8%', left: '6%', size: 'w-6 h-6', color: '#15284f', rotate: 45, type: 'triangle' },
      ],
    ];

    const currentShapes = shapesConfig[slide.id % shapesConfig.length];

    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible" aria-hidden="true">
        {currentShapes.map((shape, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1;
          const floatDuration = 4.2 + (idx % 3) * 0.9;
          return (
            <motion.div
              key={`${slide.id}-shape-${idx}`}
              className={`absolute ${shape.size} opacity-90 drop-shadow-md`}
              style={{
                top: shape.top,
                left: shape.left,
              }}
              initial={{
                y: 0,
                x: 0,
                rotate: shape.rotate,
                scale: 1,
              }}
              animate={{
                y: [0, -14 * dir, 0, 10 * dir, 0],
                x: [0, 8 * dir, 0, -6 * dir, 0],
                rotate: [
                  shape.rotate,
                  shape.rotate + 16 * dir,
                  shape.rotate - 12 * dir,
                  shape.rotate,
                ],
                scale: [1, 1.08, 0.95, 1],
              }}
              transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.35,
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,0 100,100 0,100" fill={shape.color} />
              </svg>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 pt-12 pb-6 flex flex-col justify-center min-h-[75vh] z-10">
      {/* 2 to 5 Scattered Floating Geometric Shapes per Slide */}
      {renderScatteredShapes()}

      {/* Fixed Consistent Top-Left Section Header Badge */}
      <div className="absolute top-0 left-6 z-20 flex items-center gap-2">
        <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#15284f] text-white border border-[#15284f] shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
          <span>{slide.sectionName}</span>
        </span>
      </div>

      {/* Custom AI Image Banner if applied */}
      {slide.customImage && (
        <div
          className={`mb-4 rounded-xl overflow-hidden border shadow-xl max-h-48 flex justify-center ${
            isSlideEgg ? 'border-slate-200 bg-white' : 'border-cyan-500/40 bg-slate-950/80'
          }`}
        >
          <img src={slide.customImage} alt="Custom AI Visual" className="object-cover max-h-48 w-full" />
        </div>
      )}

      {/* ----------------- SLIDE LAYOUTS ----------------- */}
      <div className="relative z-10 w-full">
        {/* 0. VS Code MacBook (Lecturer Name: A. Rahman) */}
        {slide.layout === 'vscode-macbook' && (
        <VsCodeMacbookSlide
          lecturerName={slide.visualData?.lecturerName || 'A. Rahman'}
          theme={theme}
        />
      )}

      {/* 1. Hook Question (Near-empty, dramatic pause) */}
      {slide.layout === 'hook-question' && (
        <div className="py-4 max-w-5xl mx-auto w-full animate-fade-in">
          {isSlideEgg ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl">
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="inline-block p-3 rounded-2xl bg-amber-100 border border-amber-300 text-[#f59e0b]">
                  <HelpCircle className="w-8 h-8 animate-bounce" />
                </div>
                {renderTwoToneHeading(slide.title, 'text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight', 'h1')}
              </div>
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full overflow-hidden rounded-2xl border border-slate-200/90 shadow-lg group bg-slate-900 relative">
                  <img
                    src={europeanAmphitheaterImg}
                    alt="Grand European University Lecture Amphitheater with 5 International Students"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-[#080d1e]/90 backdrop-blur-2xl border border-slate-800 shadow-2xl text-white">
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="inline-block p-4 rounded-full border bg-amber-500/10 border-amber-500/20 text-amber-400">
                  <HelpCircle className="w-8 h-8 animate-bounce" />
                </div>
                {renderTwoToneHeading(slide.title, 'text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight', 'h1')}
              </div>
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full overflow-hidden rounded-2xl border border-cyan-500/30 shadow-xl group bg-slate-950">
                  <img
                    src={europeanAmphitheaterImg}
                    alt="Grand European University Lecture Amphitheater with 5 International Students"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Split Visual: Human vs Machine */}
      {slide.layout === 'split-visual' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            {renderTwoToneHeading(slide.title, 'text-3xl sm:text-4xl font-extrabold tracking-tight')}
            <p className={`text-base mt-2 font-medium ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.caption}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1 max-w-5xl mx-auto">
            {/* Left: Human side with 3D Students conversing image and animated language exchange */}
            <div
              className={`p-6 rounded-3xl space-y-4 shadow-xl border flex flex-col justify-between ${
                isSlideEgg
                  ? 'bg-white border-slate-200/90 text-slate-800'
                  : 'bg-slate-900/80 border border-slate-700/80 text-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm uppercase font-mono text-[#f59e0b]">
                    <Globe className="w-4 h-4" />
                    <span>Human Understanding</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
                    <span>5 Natural Languages</span>
                  </span>
                </div>

                {/* 3D Visual showing people/students conversing together */}
                <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner group">
                  <img
                    src="/images/students_3d_lab.jpg"
                    alt="5 Diverse Students Conversing in 3D"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-mono font-bold text-white bg-[#15284f]/90 px-2 py-0.5 rounded backdrop-blur-sm">
                      Human Interaction • Spoken Languages & Context
                    </span>
                  </div>
                </div>

                {/* Animated 5 Languages with active conversation highlight */}
                <div className="space-y-2 pt-1">
                  {slide.visualData?.humanLanguages.map((l: any, i: number) => {
                    const isActive = activeLangIndex === i;
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs border transition-all duration-300 ${
                          isActive
                            ? 'bg-amber-50 border-amber-400 text-amber-950 scale-[1.02] shadow-md font-semibold'
                            : isSlideEgg
                            ? 'bg-slate-50 border-slate-200 text-slate-700 opacity-75'
                            : 'bg-slate-950/60 border border-slate-800 text-slate-300 opacity-70'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{l.flag}</span>
                          <span className={isActive ? 'text-[#15284f] font-bold' : ''}>{l.lang}</span>
                          {isActive && (
                            <span className="text-[9px] font-mono uppercase bg-[#f59e0b] text-slate-950 font-black px-1.5 py-0.5 rounded">
                              Speaking
                            </span>
                          )}
                        </span>
                        <span className={`italic font-mono ${isActive ? 'text-[#b45309] font-bold' : 'text-slate-500'}`}>
                          &ldquo;{l.phrase}&rdquo;
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Machine side with 3D Robot Binary Speaker and Live Translation Decoder */}
            <div
              className={`p-6 rounded-3xl space-y-4 shadow-xl border-2 flex flex-col justify-between ${
                isSlideEgg
                  ? 'bg-white border-[#15284f] text-slate-800'
                  : 'bg-[#090e24]/90 border border-cyan-500/40 text-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2 font-bold text-sm uppercase font-mono ${
                      isSlideEgg ? 'text-[#15284f]' : 'text-cyan-400'
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    <span>The Silicon Machine</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                    <span>Binary → Text Decoder</span>
                  </span>
                </div>

                {/* Dedicated 3D Robot Visual showing Binary Streaming to Holographic Speech */}
                <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner group">
                  <img
                    src="/images/binary_robot_speaker_3d.jpg"
                    alt="3D Robot Binary Speaker Visual"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-2.5 justify-between">
                    <span className="text-[10px] font-mono font-bold text-white bg-blue-950/90 px-2 py-0.5 rounded backdrop-blur-sm">
                      3D AI Robot • Converting 1s & 0s to Speech Output
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm animate-pulse">
                      Live Translation
                    </span>
                  </div>
                </div>

                {/* Interactive Binary-to-Text Translation Box */}
                <div className="p-4 rounded-2xl bg-[#15284f] text-white space-y-2 border border-[#0f1d3b] shadow-md">
                  {/* Step 1: Raw Binary Voltage Pulses */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                      <span>Transistor High (+1.2V) / Low (0.0V) Stream:</span>
                      <span className="text-amber-400 font-bold">Step 1: Raw Voltage</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0b152b] border border-blue-900/60 font-mono text-xs sm:text-sm text-center text-amber-300 font-bold tracking-wider animate-pulse">
                      {binaryPatterns[activeLangIndex].code}
                    </div>
                  </div>

                  {/* Arrow conversion divider */}
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-cyan-300 py-0.5">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 rotate-90 sm:rotate-0" />
                    <span>Decoded via Transistor Logic Gates</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 rotate-90 sm:rotate-0" />
                  </div>

                  {/* Step 2: Generated Machine Speech Output */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-amber-500/20 border border-amber-400/40 text-center space-y-1">
                    <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wide font-bold">
                      Step 2: Robot Speech Output Bubble
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-mono text-white flex items-center justify-center gap-2">
                      <span className="text-2xl">🤖</span>
                      <span className="bg-white/10 px-3 py-0.5 rounded-lg border border-amber-300/50 text-amber-300">
                        &ldquo;{binaryPatterns[activeLangIndex].text}&rdquo;
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs font-medium border ${
                  isSlideEgg
                    ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-sm'
                    : 'bg-cyan-950/40 border border-cyan-800/40 text-cyan-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-[11px] font-mono uppercase font-bold text-[#b45309]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Fundamental Gap</span>
                </div>
                {slide.visualData?.machineSide.dilemma}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. What is a Programming Language (Logos row) */}
      {slide.layout === 'flags-logos' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-1">
            {renderTwoToneHeading(slide.title, 'text-2xl sm:text-4xl font-extrabold')}
            <p className={`text-base font-medium ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}`}>
              {slide.subtitle}
            </p>
            <p className={`text-xs sm:text-sm ${isSlideEgg ? 'text-slate-600' : 'text-slate-400'}`}>
              {slide.caption}
            </p>
          </div>

          {/* Interactive Floating Language Bubble Cloud */}
          <div className="pt-0.5">
            <LanguageBubbleCloud />
          </div>

          {slide.bullets && (
            <div
              className={`mt-3 p-3 sm:p-3.5 rounded-2xl space-y-1.5 max-w-2xl mx-auto border ${
                isSlideEgg
                  ? 'bg-white border-slate-200 shadow-sm text-slate-700'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}
            >
              {slide.bullets.map((b, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-xs transition duration-500 ${
                    i < revealedBulletCount ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-1'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSlideEgg ? 'bg-[#f59e0b]' : 'bg-amber-400'}`} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Minimal Timeline (Interactive 5-Era 3D Timeline) */}
      {slide.layout === 'minimal-timeline' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-1">
            {renderTwoToneHeading(slide.title, 'text-2xl sm:text-4xl font-extrabold')}
            <p className={`text-xs sm:text-sm font-medium ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="pt-1">
            <InteractiveTimeline />
          </div>
        </div>
      )}

      {/* 5. TIOBE Ranking Chart */}
      {slide.layout === 'ranking-chart' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-1">
            {renderTwoToneHeading(slide.title, 'text-2xl sm:text-4xl font-extrabold')}
            <p className={`text-xs sm:text-sm font-medium ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="pt-1">
            <TiobeRankingTable />
          </div>
        </div>
      )}

      {/* 6. Dramatic Zoom-in on Official Python Logo & 4 3D Sector Cards */}
      {slide.layout === 'python-zoom-reveal' && (
        <div className="pt-1">
          <PythonZoomReveal />
        </div>
      )}

      {/* 7. Side-by-Side Code Comparison: Java vs Python */}
      {slide.layout === 'code-comparison' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-1">
            {renderTwoToneHeading(slide.title, 'text-2xl sm:text-4xl font-extrabold')}
            <p className={`text-xs sm:text-sm font-medium ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}`}>
              {slide.subtitle}
            </p>
            <p className={`text-xs ${isSlideEgg ? 'text-slate-600' : 'text-slate-400'}`}>
              {slide.caption}
            </p>
          </div>

          <div className="pt-1">
            <InteractiveCodeComparison />
          </div>
        </div>
      )}

      {/* 8. Origin Story (Monty Python, Guido van Rossum, CWI Netherlands) */}
      {slide.layout === 'origin-story' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-1">
            {renderTwoToneHeading(slide.title, 'text-2xl sm:text-4xl font-extrabold')}
            <p className={`text-xs sm:text-sm font-medium ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="pt-1">
            <PythonOriginStory />
          </div>
        </div>
      )}

      {/* 9. Growth Curve */}
      {slide.layout === 'growth-curve' && (
        <PythonGrowthCurve
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 10. Three-Column Compare (Speed vs Ease vs Ecosystem) */}
      {slide.layout === 'three-column-compare' && (
        <PythonThreeColumnCompare
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 11. What is AI, Really? (Brain vs Robot Myth) */}
      {slide.layout === 'ai-definition' && (
        <AiDefinitionEntrance
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 12. AI Timeline (From 9th Century Foundations to ChatGPT Era) */}
      {slide.layout === 'ai-timeline' && (
        <AiHistoryTimeline
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 13. How AI Can Be Smart: Old Way vs AI Way */}
      {slide.layout === 'old-vs-ai' && (
        <HowAiIsSmart
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 14. What is AI Built From? (Three Ingredients with Mystery ?) */}
      {slide.layout === 'three-ingredients' && (
        <ThreeIngredientsAi
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 15. BIG REVEAL ANIMATION: Python & AI Convergence */}
      {slide.layout === 'big-reveal' && (
        <PythonAiConvergence
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 16. Why Python Specifically for AI (Library Grid) */}
      {slide.layout === 'why-python-grid' && (
        <WhyPythonForAi
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 17. THE OFFICIAL TITLE REVEAL SLIDE */}
      {slide.layout === 'official-title' && (
        <CourseCover
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 18. Before Real AI Tools Question */}
      {slide.layout === 'before-tools-question' && (
        <BeforeRealAiToolsQuestion
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 18. Agenda Slide */}
      {slide.layout === 'agenda-slide' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title, 'text-3xl sm:text-5xl font-extrabold')}
            <p className={`text-base font-medium ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          {isSlideEgg ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto pt-2">
              <div className="md:col-span-5 flex justify-center">
                {renderSlideEggImage('/images/students_3d_lab.jpg', 'Computer Engineering Lab', 'split-card', 'BSc Lecture Syllabus')}
              </div>
              <div className="md:col-span-7 space-y-3">
                {slide.visualData?.agendaItems.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl flex items-center gap-4 bg-white border border-slate-200/90 shadow-md hover:border-[#15284f] transition"
                  >
                    {renderNumberBadge(item.step, idx % 2 === 0 ? 'navy' : 'amber')}
                    <div>
                      <h4 className="text-base font-bold text-[#15284f]">{item.title}</h4>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-3.5 pt-4">
              {slide.visualData?.agendaItems.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl flex items-center gap-5 transition bg-slate-900/90 border border-slate-700/80 shadow-xl hover:border-cyan-400"
                >
                  <span className="text-2xl font-mono font-black text-amber-400">{item.step}</span>
                  <div>
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 19. Toolkit Flow: NumPy -> Pandas -> Scikit-learn/PyTorch */}
      {slide.layout === 'toolkit-flow' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {slide.visualData?.pipelineSteps.map((step: any, idx: number) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl space-y-3 shadow-xl flex flex-col justify-between border ${
                  isSlideEgg
                    ? 'bg-white border-slate-200/90 text-slate-800 hover:border-[#15284f]'
                    : 'bg-slate-900/90 border border-slate-700/80 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    {isSlideEgg ? (
                      renderNumberBadge(idx + 1, idx === 1 ? 'amber' : 'navy')
                    ) : (
                      <span className="font-mono text-xs font-bold text-slate-500">Stage 0{idx + 1}</span>
                    )}
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: step.color }} />
                  </div>
                  <h4 className={`text-xl font-extrabold ${isSlideEgg ? 'text-[#15284f]' : 'text-white'}`}>{step.name}</h4>
                  <span className={`font-mono text-xs font-semibold block mt-1 ${isSlideEgg ? 'text-[#b45309]' : 'text-slate-300'}`}>
                    {step.stage}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed border-t pt-3 ${isSlideEgg ? 'text-slate-600 border-slate-200' : 'text-slate-400 border-slate-800'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 19. Vectorization Speed & Live AI Demo (Question Hook + Stage 1 + Stage 2) */}
      {slide.layout === 'vectorization-speed' && (
        <VectorizationAndLiveDemo
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 21. Live Scikit-learn Training Demo */}
      {slide.layout === 'live-demo' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <CodePlayground
            initialCode={slide.codeSnippets?.[0]?.code || ''}
            defaultOutput={slide.codeSnippets?.[0]?.output || ''}
            title="Live Machine Learning Trainer (Scikit-Learn)"
            theme={theme}
          />
        </div>
      )}

      {/* 20. Dramatic Exploding Transition Question */}
      {slide.layout === 'exploding-transition' && (
        <ExplodingTransitionQuestion
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 23. Variables Box Metaphor */}
      {slide.layout === 'variables-box' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base font-medium ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 max-w-3xl mx-auto">
            {/* Box Metaphor */}
            <div
              className={`p-6 rounded-2xl text-center space-y-3 flex flex-col justify-center items-center border ${
                isSlideEgg
                  ? 'bg-amber-50/70 border-amber-300 text-amber-950 shadow-sm'
                  : 'bg-amber-500/10 border-amber-500/30'
              }`}
            >
              <div
                className={`w-24 h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 ${
                  isSlideEgg
                    ? 'bg-white border-[#f59e0b] shadow-sm'
                    : 'bg-amber-500/20 border-amber-400'
                }`}
              >
                <span className={`text-[10px] font-mono uppercase ${isSlideEgg ? 'text-slate-500' : 'text-amber-300'}`}>Label:</span>
                <span className={`font-mono text-xs font-bold ${isSlideEgg ? 'text-[#15284f]' : 'text-white'}`}>{slide.visualData?.boxMetaphor.label}</span>
                <span className={`text-sm font-bold mt-1 ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-400'}`}>{slide.visualData?.boxMetaphor.contents}</span>
              </div>
              <p className={`text-xs ${isSlideEgg ? 'text-slate-700' : 'text-amber-200/90'}`}>
                {slide.visualData?.boxMetaphor.desc}
              </p>
            </div>

            {/* Code */}
            <div
              className={`rounded-2xl overflow-hidden border shadow-xl p-4 ${
                isSlideEgg
                  ? 'bg-white border-slate-200/90'
                  : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between text-[11px] font-mono ${
                  isSlideEgg ? 'bg-[#15284f] text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <span>Python Syntax</span>
                <span className={isSlideEgg ? 'text-[#f59e0b]' : ''}>variable_assignment.py</span>
              </div>
              <div className={isSlideEgg ? 'p-2 bg-slate-50 rounded-xl border border-slate-200' : ''}>
                {renderSyntaxHighlitCode(slide.codeSnippets?.[0]?.code || '')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 22. Interactive Lunchbox Drag & Drop Variable Lab */}
      {slide.layout === 'variables-lunchbox-drag' && (
        <VariablesLunchboxDrag slide={slide} theme={theme} />
      )}

      {/* 23. Multi-Box Variable Math & Naming Rules Lab */}
      {slide.layout === 'variables-multi-box-lab' && (
        <VariablesMultiBoxLab slide={slide} theme={theme} />
      )}

      {/* 24. Interactive Story Practice Lab: Real-Time Code-to-3D Visual Builder */}
      {slide.layout === 'variables-story-practice' && (
        <VariablesStoryPracticeLab slide={slide} theme={theme} />
      )}

      {/* 24. Lecture 01 Conclusion & Full Journey Recap (Slides 1 -> 23) */}
      {slide.layout === 'lecture-conclusion-recap' && (
        <LectureConclusionRecap
          slide={slide}
          revealedBulletCount={revealedBulletCount}
          onNextPointOrSlide={onNextPointOrSlide}
          theme={theme}
        />
      )}

      {/* 25. Take-Home Assignment (Variables Lab) & Next Week Preview */}
      {slide.layout === 'homework-next-week' && (
        <HomeworkAndNextWeek slide={slide} theme={theme} />
      )}

      {/* 24. Basic Data Types */}
      {slide.layout === 'data-types' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base font-medium ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {slide.visualData?.types.map((type: any, idx: number) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl space-y-3 shadow-md border ${
                  isSlideEgg
                    ? 'bg-white border-slate-200/90 text-slate-800 hover:border-[#15284f]'
                    : 'bg-slate-900/90 border border-slate-700/80 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{type.icon}</span>
                    {isSlideEgg && renderNumberBadge(idx + 1, 'amber')}
                  </div>
                  <span className={`font-mono text-xs font-bold ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-400'}`}>{type.typeName}</span>
                </div>
                <h4 className={`text-base font-bold ${isSlideEgg ? 'text-[#15284f]' : 'text-white'}`}>{type.name}</h4>
                <p className={`text-xs ${isSlideEgg ? 'text-slate-600' : 'text-slate-400'}`}>{type.desc}</p>
                <div
                  className={`p-3 rounded-xl font-mono text-xs whitespace-pre border ${
                    isSlideEgg
                      ? 'bg-slate-50 border-slate-200 text-[#15284f] font-semibold'
                      : 'bg-slate-950 border-slate-800 text-cyan-300'
                  }`}
                >
                  {type.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 25. print() Terminal */}
      {slide.layout === 'print-terminal' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <CodePlayground
            initialCode={slide.codeSnippets?.[0]?.code || ''}
            defaultOutput={slide.codeSnippets?.[0]?.output || ''}
            title="Interactive print() Inspector"
            theme={theme}
          />
        </div>
      )}

      {/* 26. if/else Decision Branching */}
      {slide.layout === 'if-else-branch' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
            {/* Flowchart Branching Visual */}
            <div
              className={`p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-center border ${
                isSlideEgg
                  ? 'bg-white border-slate-200/90 text-slate-800'
                  : 'bg-slate-900/90 border border-slate-700/80 text-white'
              }`}
            >
              <span className={`text-[11px] font-mono uppercase tracking-wider block text-center ${isSlideEgg ? 'text-slate-500' : 'text-slate-400'}`}>
                Branching Logic Flowchart
              </span>
              <div
                className={`p-3 rounded-xl text-center font-mono text-xs font-bold border ${
                  isSlideEgg
                    ? 'bg-slate-50 border-slate-200 text-[#15284f]'
                    : 'bg-slate-950 border-slate-800 text-amber-300'
                }`}
              >
                {slide.visualData?.branching.question}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-center">
                <div
                  className={`p-2.5 rounded-lg border font-semibold ${
                    isSlideEgg
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                  }`}
                >
                  {slide.visualData?.branching.trueBranch}
                </div>
                <div
                  className={`p-2.5 rounded-lg border font-semibold ${
                    isSlideEgg
                      ? 'bg-rose-50 border-rose-200 text-rose-800'
                      : 'bg-rose-950/40 border border-rose-800 text-rose-300'
                  }`}
                >
                  {slide.visualData?.branching.falseBranch}
                </div>
              </div>
            </div>

            {/* Code */}
            <div
              className={`rounded-2xl overflow-hidden border p-4 shadow-xl ${
                isSlideEgg
                  ? 'bg-white border-slate-200/90'
                  : 'bg-[#070b18] border-slate-800'
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between text-[11px] font-mono ${
                  isSlideEgg ? 'bg-[#15284f] text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <span>Python Indentation</span>
                <span className={isSlideEgg ? 'text-[#f59e0b]' : ''}>classifier_guard.py</span>
              </div>
              <div className={isSlideEgg ? 'p-2 bg-slate-50 rounded-xl border border-slate-200' : ''}>
                {renderSyntaxHighlitCode(slide.codeSnippets?.[0]?.code || '')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 27. for Loop Repeating Actions */}
      {slide.layout === 'for-loop-cycle' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
            <p className={`text-xs font-mono ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-300'}`}>
              {slide.caption}
            </p>
          </div>

          <CodePlayground
            initialCode={slide.codeSnippets?.[0]?.code || ''}
            defaultOutput={slide.codeSnippets?.[0]?.output || ''}
            title="Loop Runner Simulator"
            theme={theme}
          />
        </div>
      )}

      {/* 28. Functions Machine */}
      {slide.layout === 'functions-machine' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
            {/* Machine Metaphor */}
            <div
              className={`p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between border ${
                isSlideEgg
                  ? 'bg-white border-2 border-[#15284f] text-slate-800'
                  : 'bg-cyan-950/30 border border-cyan-800/50 text-white'
              }`}
            >
              <span className={`text-[11px] font-mono uppercase tracking-wider block ${isSlideEgg ? 'text-[#15284f] font-bold' : 'text-cyan-400'}`}>
                The Reusable Machine Metaphor
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div
                  className={`p-2.5 rounded-xl border ${
                    isSlideEgg ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span className={`font-bold ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-400'}`}>1. Input:</span> {slide.visualData?.machine.input}
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    isSlideEgg ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span className={`font-bold ${isSlideEgg ? 'text-[#15284f]' : 'text-cyan-400'}`}>2. Process:</span> {slide.visualData?.machine.process}
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    isSlideEgg ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span className={`font-bold ${isSlideEgg ? 'text-[#047857]' : 'text-emerald-400'}`}>3. Return:</span> {slide.visualData?.machine.output}
                </div>
              </div>
              <p className={`text-xs italic ${isSlideEgg ? 'text-slate-600' : 'text-slate-400'}`}>
                In neural networks, every neuron is just a function taking inputs and computing an output.
              </p>
            </div>

            {/* Code */}
            <div
              className={`rounded-2xl overflow-hidden border p-4 shadow-xl ${
                isSlideEgg
                  ? 'bg-white border-slate-200/90'
                  : 'bg-[#070b18] border-slate-800'
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between text-[11px] font-mono ${
                  isSlideEgg ? 'bg-[#15284f] text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <span>Python Function Syntax</span>
                <span className={isSlideEgg ? 'text-[#f59e0b]' : ''}>calculate_loss.py</span>
              </div>
              <div className={isSlideEgg ? 'p-2 bg-slate-50 rounded-xl border border-slate-200' : ''}>
                {renderSyntaxHighlitCode(slide.codeSnippets?.[0]?.code || '')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 29. Revisit That Demo (Line-by-Line Annotated Walkthrough) */}
      {slide.layout === 'revisit-demo-annotated' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base font-medium ${isSlideEgg ? 'text-[#047857]' : 'text-emerald-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Code box with active line highlighting */}
            <div
              className={`rounded-2xl overflow-hidden border p-4 shadow-xl ${
                isSlideEgg
                  ? 'bg-white border-slate-200/90'
                  : 'bg-[#070b18] border-slate-800'
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between text-[11px] font-mono ${
                  isSlideEgg ? 'bg-[#15284f] text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <span>Annotated Model Code</span>
                <span className={isSlideEgg ? 'text-[#f59e0b]' : ''}>Click to inspect</span>
              </div>
              <div className={isSlideEgg ? 'p-2 bg-slate-50 rounded-xl border border-slate-200' : ''}>
                {renderSyntaxHighlitCode(slide.codeSnippets?.[0]?.code || '')}
              </div>
            </div>

            {/* Annotations List */}
            <div className="space-y-2">
              <span className={`text-[11px] font-mono uppercase tracking-wider block ${isSlideEgg ? 'text-slate-500 font-semibold' : 'text-slate-400'}`}>
                Line-by-Line Concepts You Just Learned:
              </span>
              {slide.visualData?.annotations.map((ann: any, idx: number) => {
                const isSelected = annotatedLineIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setAnnotatedLineIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                      isSelected
                        ? isSlideEgg
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-sm'
                          : 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                        : isSlideEgg
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <span className={`font-mono font-bold mr-2 ${isSlideEgg ? 'text-[#15284f]' : 'text-cyan-400'}`}>Line {ann.line}:</span>
                      <span className="font-semibold">{ann.concept}</span>
                    </div>
                    <span className={`text-[11px] font-light ${isSlideEgg ? 'text-slate-500' : 'text-slate-400'}`}>{ann.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 30. Your Turn (Interactive Lab + QR Code) */}
      {slide.layout === 'your-turn' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title)}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-300'}`}>
              {slide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Left: Lab Instructions */}
            <div
              className={`md:col-span-2 p-6 rounded-2xl space-y-4 shadow-xl border ${
                isSlideEgg
                  ? 'bg-white border-slate-200/90 text-slate-800'
                  : 'bg-slate-900/90 border border-slate-700/80 text-white'
              }`}
            >
              <h4 className={`text-sm font-bold uppercase font-mono ${isSlideEgg ? 'text-[#15284f]' : 'text-amber-400'}`}>
                Student Exercise Instructions
              </h4>
              <div className="space-y-3 text-xs">
                {slide.visualData?.instructions.map((inst: string, i: number) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                      isSlideEgg
                        ? 'bg-slate-50 border-slate-200 text-slate-700'
                        : 'bg-slate-950/60 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full font-mono font-bold flex items-center justify-center text-[11px] ${
                        isSlideEgg ? 'bg-[#15284f] text-white' : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: QR Code Placeholder Card */}
            <div
              className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center space-y-3 shadow-xl ${
                isSlideEgg
                  ? 'bg-white border-[#f59e0b]'
                  : 'bg-slate-900/90 border-amber-500/50'
              }`}
            >
              <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>
              <span className={`font-mono text-xs font-bold ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-400'}`}>
                {slide.visualData?.qrPlaceholder}
              </span>
              <a
                href={slide.visualData?.defaultNotebookUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs underline font-semibold ${
                  isSlideEgg ? 'text-[#15284f] hover:text-[#f59e0b]' : 'text-cyan-400 hover:text-cyan-300'
                }`}
              >
                <span>Open Google Colab Notebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Theme 3 Lab Collaboration Visual */}
          {isSlideEgg && (
            <div className="pt-2 max-w-4xl mx-auto">
              {renderSlideEggImage('/images/students_3d_lab.jpg', 'Computer Engineering Lab Session', 'banner', 'Collaborative 3D Lab: Write, Train, and Test Your First AI Classifier in Python')}
            </div>
          )}
        </div>
      )}

      {/* 31. Key Takeaways (Exactly 3 bullets < 8 words) */}
      {slide.layout === 'key-takeaways' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            {renderTwoToneHeading(slide.title, 'text-4xl sm:text-6xl font-extrabold')}
            <p className={`text-base ${isSlideEgg ? 'text-slate-600' : 'text-slate-400'}`}>
              {slide.subtitle}
            </p>
          </div>

          {isSlideEgg ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto pt-2">
              <div className="md:col-span-5 flex justify-center">
                {renderSlideEggImage('/images/grad_3d_hijab.jpg', 'Computer Engineering Graduate', 'rounded-accent', 'Class of 2026 • Computer Engineering')}
              </div>
              <div className="md:col-span-7 space-y-4">
                {slide.visualData?.takeaways.map((takeaway: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl shadow-md space-y-2 bg-white border border-slate-200/90 text-slate-800 hover:border-[#15284f] transition"
                  >
                    <div className="flex items-center gap-3">
                      {renderNumberBadge(takeaway.num, idx === 1 ? 'navy' : 'amber')}
                      <h4 className="text-lg font-extrabold text-[#15284f] leading-snug">
                        {takeaway.text}
                      </h4>
                    </div>
                    <p className="text-xs font-light text-slate-600 pl-12">
                      {takeaway.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto pt-4">
              {slide.visualData?.takeaways.map((takeaway: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl shadow-xl space-y-3 transition border bg-slate-900/90 border-slate-700/80 text-white hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-mono font-black text-amber-400 block">{takeaway.num}</span>
                  </div>
                  <h4 className="text-lg font-extrabold leading-snug text-white">
                    {takeaway.text}
                  </h4>
                  <p className="text-xs font-light leading-relaxed text-slate-400">
                    {takeaway.sub}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 32. Closing & Q&A (Matches PDF Page 26 Thank You!) */}
      {slide.layout === 'closing-qa' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            {renderTwoToneHeading(slide.title, 'text-4xl sm:text-6xl font-black')}
            <p className={`text-lg font-medium ${isSlideEgg ? 'text-[#b45309]' : 'text-amber-400'}`}>
              {slide.subtitle}
            </p>
          </div>

          {isSlideEgg ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto pt-4">
              <div className="md:col-span-6 space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#15284f]">
                    <BookOpen className="w-4 h-4" />
                    <span>Further Learning Resources</span>
                  </div>
                  <div className="space-y-2.5">
                    {slide.visualData?.resources.map((res: any, idx: number) => (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200 text-xs text-slate-700 hover:border-[#15284f] hover:text-[#15284f] bg-slate-50 transition"
                      >
                        <span>{res.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center">
                <div className="relative flex flex-col items-center justify-center p-2">
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[23rem] md:h-[23rem]">
                    <div className="absolute inset-0 rounded-[2.25rem] border-4 border-[#f59e0b] -rotate-3 scale-[1.03] pointer-events-none opacity-85" />
                    <div className="absolute inset-0.5 rounded-[2.25rem] border-4 border-[#15284f] rotate-2 scale-100 pointer-events-none opacity-90" />
                    <motion.div
                      animate={{
                        y: [0, -10, 0, 6, 0],
                        x: [0, 5, 0, -4, 0],
                        rotate: [45, 60, 35, 45],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute -top-3 -right-2 z-10 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-[#f59e0b]"
                    />
                    <motion.div
                      animate={{
                        y: [0, 9, 0, -8, 0],
                        x: [0, -5, 0, 4, 0],
                        rotate: [-45, -30, -58, -45],
                      }}
                      transition={{
                        duration: 5.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.6,
                      }}
                      className="absolute -bottom-3 -left-2 z-10 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-[#15284f]"
                    />
                    <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center">
                      <img
                        src={fiveInternationalStudentsImg}
                        alt="Five International Engineering Students Seated Attentively in Classroom"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4 max-w-5xl mx-auto">
              {/* Recommended Resources */}
              <div className="md:col-span-6 p-6 rounded-2xl space-y-3 shadow-xl border bg-slate-900/90 border-slate-700/80 text-white">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Further Learning Resources</span>
                </div>
                <div className="space-y-2.5">
                  {slide.visualData?.resources.map((res: any, idx: number) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border text-xs transition group bg-slate-950/60 border-slate-800 text-slate-200 hover:border-cyan-400"
                    >
                      <span>{res.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 transition text-slate-500 group-hover:text-cyan-400" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="md:col-span-6 flex items-center justify-center">
                <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-[23rem] md:h-[23rem] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-cyan-400/50 bg-slate-900 flex items-center justify-center">
                  <img
                    src={fiveInternationalStudentsImg}
                    alt="Five International Engineering Students Seated Attentively in Classroom"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};
