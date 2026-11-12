import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, BrainCircuit, ArrowRight, Terminal, Cpu, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import germanStudentImg from '../assets/images/curious_german_male_3d_1794379172005.jpg';

// Official Vector Brand Logos
const NumpyLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 12 L68 22 L50 32 L32 22 Z" fill="#4dabf7" />
    <path d="M32 22 L50 32 L50 48 L32 38 Z" fill="#228be6" />
    <path d="M68 22 L50 32 L50 48 L68 38 Z" fill="#1c7ed6" />
    <path d="M30 24 L48 34 L30 44 L12 34 Z" fill="#339af0" />
    <path d="M12 34 L30 44 L30 60 L12 50 Z" fill="#1971c2" />
    <path d="M48 34 L30 44 L30 60 L48 50 Z" fill="#1864ab" />
    <path d="M70 24 L88 34 L70 44 L52 34 Z" fill="#74c0fc" />
    <path d="M52 34 L70 44 L70 60 L52 50 Z" fill="#339af0" />
    <path d="M88 34 L70 44 L70 60 L88 50 Z" fill="#1c7ed6" />
    <path d="M50 36 L68 46 L50 56 L32 46 Z" fill="#4dabf7" />
    <path d="M32 46 L50 56 L50 72 L32 62 Z" fill="#1c7ed6" />
    <path d="M68 46 L50 56 L50 72 L68 62 Z" fill="#1864ab" />
    <path d="M30 48 L48 58 L30 68 L12 58 Z" fill="#228be6" />
    <path d="M12 58 L30 68 L30 84 L12 74 Z" fill="#1864ab" />
    <path d="M48 58 L30 68 L30 84 L48 74 Z" fill="#0c4a6e" />
    <path d="M70 48 L88 58 L70 68 L52 58 Z" fill="#339af0" />
    <path d="M52 58 L70 68 L70 84 L52 74 Z" fill="#1971c2" />
    <path d="M88 58 L70 68 L70 84 L88 74 Z" fill="#1864ab" />
    <path d="M32 30 L44 37 L44 65 L32 58 Z" fill="#1e3a8a" opacity="0.95" />
    <path d="M44 37 L60 69 L72 62 L44 37 Z" fill="#172554" opacity="0.9" />
    <path d="M60 41 L72 34 L72 62 L60 69 Z" fill="#1e3a8a" opacity="0.95" />
  </svg>
);

const PandasLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="18" width="10" height="42" rx="3" fill="#130754" />
    <rect x="22" y="65" width="10" height="10" rx="2" fill="#ff4d4d" />
    <rect x="38" y="28" width="10" height="48" rx="3" fill="#130754" />
    <rect x="38" y="14" width="10" height="10" rx="2" fill="#eab308" />
    <rect x="54" y="68" width="10" height="10" rx="2" fill="#e11d48" />
    <rect x="54" y="18" width="10" height="44" rx="3" fill="#130754" />
    <rect x="70" y="24" width="10" height="52" rx="3" fill="#130754" />
  </svg>
);

const ScikitLearnLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="34" cy="54" r="22" fill="#38bdf8" />
    <ellipse cx="60" cy="46" rx="28" ry="24" fill="#f97316" />
    <text x="58" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" fontFamily="sans-serif">scikit</text>
    <text x="60" y="56" textAnchor="middle" fill="#1c1917" fontSize="13" fontWeight="900" fontStyle="italic" fontFamily="serif">learn</text>
  </svg>
);

const TensorFlowLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 14 L20 31 L32 38 L50 28 Z" fill="#ff8f00" />
    <path d="M20 31 L32 38 L32 64 L20 57 Z" fill="#e65100" />
    <path d="M50 14 L80 31 L68 38 L50 28 Z" fill="#ffa726" />
    <path d="M80 31 L68 38 L68 64 L80 57 Z" fill="#f57c00" />
    <path d="M50 28 L62 35 L50 42 L38 35 Z" fill="#ffb74d" />
    <path d="M38 35 L50 42 L50 86 L38 79 Z" fill="#f57c00" />
    <path d="M50 42 L62 35 L62 79 L50 86 Z" fill="#e65100" />
    <path d="M50 50 L68 40 L68 49 L50 59 Z" fill="#ffa726" />
    <path d="M68 40 L78 46 L78 55 L68 49 Z" fill="#f57c00" />
  </svg>
);

const PyTorchLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 18 C30 18 16 33 16 52 C16 71 31 86 50 86 C69 86 84 71 84 52 C84 39 77 28 66 22 L62 29 C70 34 76 42 76 52 C76 66 64 78 50 78 C36 78 24 66 24 52 C24 38 35 26 50 26 Z"
      fill="#ee4c2c"
    />
    <path d="M50 18 L64 24 L56 31 Z" fill="#ee4c2c" />
    <circle cx="72" cy="27" r="5" fill="#ee4c2c" />
  </svg>
);

interface BeforeRealAiToolsQuestionProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const BeforeRealAiToolsQuestion: React.FC<BeforeRealAiToolsQuestionProps> = ({
  revealedBulletCount,
}) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const activeStage = revealedBulletCount <= 0 ? 0 : revealedBulletCount === 1 ? 1 : 2;

  const pipelineStages = [
    {
      step: 'STEP 01',
      phase: 'Raw Sensor & Matrix Ingestion',
      toolName: 'NumPy',
      subtitle: 'High-Speed N-Dimensional Arrays',
      logo: <NumpyLogo className="w-8 h-8" />,
      color: 'from-sky-500 to-blue-600',
      borderColor: 'border-sky-400',
      badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      inputLabel: 'Raw Pixels / Audio / Sensors',
      outputLabel: '3D Tensor Matrix [1024, 1024, 3]',
      codeSnippet: `import numpy as np\n# Convert raw camera pixels into C-speed matrix\nsensor_matrix = np.array(raw_pixels, dtype=np.float32)\nnormalized = sensor_matrix / 255.0`,
      description: 'Captures raw physical signals—camera pixels, sound frequencies, or IoT voltages—and packs them into contiguous C-memory arrays for instant linear algebra.',
    },
    {
      step: 'STEP 02',
      phase: 'Data Cleaning & Structuring',
      toolName: 'Pandas',
      subtitle: 'Relational DataFrames & Time-Series',
      logo: <PandasLogo className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-400',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      inputLabel: 'Unstructured Logs & CSVs',
      outputLabel: 'Clean Labeled Feature Table (X, y)',
      codeSnippet: `import pandas as pd\n# Filter missing values & structure features\ndf = pd.read_csv("patient_telemetry.csv")\nclean_features = df.dropna().groupby("diagnosis").mean()`,
      description: 'Acts as an ultra-fast programmable spreadsheet that filters noise, handles missing sensor readings, and aligns labeled columns before model training.',
    },
    {
      step: 'STEP 03',
      phase: 'Model Training & Live Inference',
      toolName: 'Scikit-learn • PyTorch • TensorFlow',
      subtitle: 'Machine Learning & Deep Neural Engines',
      logo: (
        <div className="flex items-center -space-x-1.5">
          <div className="w-7 h-7 rounded-lg bg-white p-1 shadow flex items-center justify-center z-30">
            <ScikitLearnLogo className="w-5 h-5" />
          </div>
          <div className="w-7 h-7 rounded-lg bg-white p-1 shadow flex items-center justify-center z-20">
            <PyTorchLogo className="w-5 h-5" />
          </div>
          <div className="w-7 h-7 rounded-lg bg-white p-1 shadow flex items-center justify-center z-10">
            <TensorFlowLogo className="w-5 h-5" />
          </div>
        </div>
      ),
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-400',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      inputLabel: 'Clean Feature Matrix (X, y)',
      outputLabel: 'Trained Neural Weights & Live Prediction',
      codeSnippet: `from sklearn.ensemble import RandomForestClassifier\n# Optimize weights & predict in real-time\nmodel = RandomForestClassifier().fit(X_train, y_train)\nprediction = model.predict(new_patient_data)`,
      description: 'Ingests structured matrices from NumPy and Pandas, optimizes millions of mathematical weights on GPUs, and outputs intelligent real-time decisions.',
    },
  ];

  const activePipeline = pipelineStages[selectedStep];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {activeStage === 0 ? (
          /* =========================================================================
             STAGE 0: QUESTION HOOK (NO FLUFF BADGES, HANDSOME GERMAN 3D AVATAR)
             ========================================================================= */
          <motion.div
            key="tools-stage-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-slate-950 via-[#0a1128] to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative min-h-[460px] flex items-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              {/* Handsome 3D German Student Avatar */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group max-w-xs sm:max-w-sm w-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                  <div className="relative rounded-[2.2rem] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900 aspect-square">
                    <img
                      src={germanStudentImg}
                      alt="3D German Student Avatar Looking Curious"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Clean Question Text */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                  What tools do we actually need to <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                    build Artificial Intelligence?
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                  From raw numerical arrays and data tables to neural architectures and real-time model inference.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1 & 2: REVEALED TOOLSETS
             ========================================================================= */
          <motion.div
            key="tools-stage-content"
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
                  <img src={germanStudentImg} alt="Avatar" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    The Essential AI Engineering Stack
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    {activeStage === 1
                      ? 'Stage 01: Core Architectural Tiers (Data vs Cognition)'
                      : 'Stage 02: Interactive AI Assembly Line & Data Pipeline'}
                  </p>
                </div>
              </div>

              {/* Stage Pill */}
              <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold">
                0{activeStage} / 02
              </div>
            </div>

            {/* Stage 1: Two Foundational Tiers */}
            {activeStage === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Tier 1 Card (Light Card for High Contrast) */}
                <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-mono text-xs font-black border border-amber-300">
                        Tier 01 • Data & Math
                      </span>
                      <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                        <Database className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-extrabold text-[#15284f]">
                        Numerical & Tabular Data Engines
                      </h4>
                      <p className="text-xs text-amber-600 font-mono font-bold mt-1">
                        NumPy & Pandas
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Before AI can learn, sensor data, images, and text must be transformed into high-dimensional matrix arrays and clean DataFrames.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                        <NumpyLogo className="w-6 h-6" />
                        <span className="text-xs font-bold text-slate-700">NumPy</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                        <PandasLogo className="w-6 h-6" />
                        <span className="text-xs font-bold text-slate-700">Pandas</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500 font-bold">
                    <span>Sensory Layer</span>
                    <span className="text-amber-600 font-extrabold">Raw Matrix Fuel</span>
                  </div>
                </div>

                {/* Tier 2 Card (Dark Navy Card) */}
                <div className="p-6 rounded-3xl bg-slate-900 text-white border-2 border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-mono text-xs font-black border border-cyan-800">
                        Tier 02 • Cognition & Inference
                      </span>
                      <div className="w-9 h-9 rounded-2xl bg-cyan-900/60 text-cyan-300 border border-cyan-700 flex items-center justify-center">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-extrabold text-white">
                        Learning & Neural Frameworks
                      </h4>
                      <p className="text-xs text-cyan-300 font-mono font-bold mt-1">
                        Scikit-learn, PyTorch & TensorFlow
                      </p>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Optimization algorithms that calculate errors, update millions of neural weights, and generate smart predictions in real time.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 shadow-sm">
                        <div className="w-5 h-5 rounded bg-white p-0.5 flex items-center justify-center">
                          <ScikitLearnLogo className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-200">Scikit-learn</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 shadow-sm">
                        <div className="w-5 h-5 rounded bg-white p-0.5 flex items-center justify-center">
                          <PyTorchLogo className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-200">PyTorch</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 shadow-sm">
                        <div className="w-5 h-5 rounded bg-white p-0.5 flex items-center justify-center">
                          <TensorFlowLogo className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-200">TensorFlow</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold">
                    <span>Cognitive Layer</span>
                    <span className="text-cyan-400 font-extrabold">Neural Intelligence</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
               STAGE 2: INTERACTIVE END-TO-END AI ASSEMBLY PIPELINE (COMPLETELY DISTINCT FROM SLIDE 16)
               ========================================================================= */}
            {activeStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Top Horizontal Pipeline Flow Selector (3 Connected Nodes) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative">
                  {pipelineStages.map((item, idx) => {
                    const isSelected = selectedStep === idx;
                    return (
                      <div key={idx} className="relative flex items-center">
                        <motion.div
                          whileHover={{ y: -2 }}
                          onClick={() => setSelectedStep(idx)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? `bg-slate-900 text-white ${item.borderColor} shadow-xl ring-2 ring-amber-400/20`
                              : 'bg-white/95 text-slate-800 border-slate-200 hover:border-slate-400 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                              isSelected ? 'bg-white p-1.5' : 'bg-slate-100 p-1.5 border border-slate-200'
                            }`}>
                              {item.logo}
                            </div>
                            <div className="truncate">
                              <div className="flex items-center gap-1.5">
                                <span className={`font-mono text-[10px] font-black px-2 py-0.5 rounded ${
                                  isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {item.step}
                                </span>
                                <span className={`text-xs font-bold truncate ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                                  {item.toolName}
                                </span>
                              </div>
                              <h4 className={`text-sm font-extrabold truncate mt-1 ${isSelected ? 'text-white' : 'text-[#15284f]'}`}>
                                {item.phase}
                              </h4>
                            </div>
                          </div>

                          {idx < 2 && (
                            <ArrowRight className={`w-4 h-4 shrink-0 hidden md:block ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Interactive Pipeline Workbench Inspection Panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl text-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    {/* Left 6 Cols: Architecture Role & Data Transformation Flow */}
                    <div className="lg:col-span-6 space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${activePipeline.badgeBg}`}>
                          {activePipeline.step} • {activePipeline.toolName}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {activePipeline.subtitle}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {activePipeline.phase}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activePipeline.description}
                      </p>

                      {/* Input -> Output Transformation Bar */}
                      <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>In: <strong className="text-slate-200">{activePipeline.inputLabel}</strong></span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 rotate-90 sm:rotate-0" />
                        <div className="flex items-center gap-2 text-cyan-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Out: <strong>{activePipeline.outputLabel}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Right 6 Cols: Live Code Blueprint Preview */}
                    <div className="lg:col-span-6">
                      <div className="rounded-2xl bg-[#060a17] border border-slate-800 overflow-hidden shadow-inner">
                        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-amber-400" />
                            <span className="font-mono text-[11px] font-bold text-slate-300">
                              pipeline_stage_0{selectedStep + 1}.py
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                            Production Ready
                          </span>
                        </div>
                        <pre className="p-4 font-mono text-xs sm:text-[13px] text-cyan-300 overflow-x-auto leading-relaxed">
                          <code>{activePipeline.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
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
