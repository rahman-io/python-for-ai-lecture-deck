import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Terminal,
  BookOpen,
  Cpu,
  Home,
  Zap,
} from 'lucide-react';
import { SlideData } from '../types/slides';

interface VariablesStoryPracticeLabProps {
  slide: SlideData;
  theme?: 'kinetic' | 'focus' | 'slideegg';
}

type ChallengeId = 'smart-home' | 'ai-rover';

interface ParsedEnvironment {
  vars: Record<string, string | number | boolean>;
  reassignedVars: Record<string, { oldVal: string | number | boolean; newVal: string | number | boolean }>;
  syntaxErrors: { line: number; raw: string; reason: string }[];
  printOutputs: string[];
  validAssignmentCount: number;
}

/**
 * Real-time Python Variable Interpreter for Slide 24 Story Practice Lab.
 * Supports string, integer, float, boolean assignments, variable-to-variable addition,
 * variable reassignment tracking, print() output, and Python naming rule validation.
 */
function evaluatePythonVariables(code: string): ParsedEnvironment {
  const vars: Record<string, string | number | boolean> = {};
  const reassignedVars: Record<string, { oldVal: string | number | boolean; newVal: string | number | boolean }> = {};
  const syntaxErrors: { line: number; raw: string; reason: string }[] = [];
  const printOutputs: string[] = [];
  let validAssignmentCount = 0;

  const lines = code.split('\n');

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    const commentIndex = rawLine.indexOf('#');
    const cleanLine = (commentIndex !== -1 ? rawLine.slice(0, commentIndex) : rawLine).trim();
    if (!cleanLine) return;

    // Handle print(...) statements
    const printMatch = cleanLine.match(/^print\s*\((.*)\)$/);
    if (printMatch) {
      const inner = printMatch[1].trim();
      if (!inner) {
        printOutputs.push('');
        return;
      }
      const parts = inner.match(/(?:"[^"]*"|'[^']*'|[^,]+)/g) || [];
      const resolved = parts.map((p) => {
        const token = p.trim();
        if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
          return token.slice(1, -1);
        }
        if (Object.prototype.hasOwnProperty.call(vars, token)) {
          return String(vars[token]);
        }
        return token;
      });
      printOutputs.push(resolved.join(' '));
      return;
    }

    // Check assignment statement
    if (cleanLine.includes('=')) {
      const eqIdx = cleanLine.indexOf('=');
      const lhs = cleanLine.slice(0, eqIdx).trim();
      const rhs = cleanLine.slice(eqIdx + 1).trim();

      // Validate Python identifier rules (Slide 23 concept) without colons
      if (/^[0-9]/.test(lhs)) {
        syntaxErrors.push({
          line: lineNum,
          raw: cleanLine,
          reason: `SyntaxError because variable name '${lhs}' cannot start with a number. Please use snake_case such as '${lhs.replace(/^[0-9]+_?/, '') || 'variable_name'}_1'.`,
        });
        return;
      }
      if (lhs.includes('-')) {
        syntaxErrors.push({
          line: lineNum,
          raw: cleanLine,
          reason: `SyntaxError because the hyphen in '${lhs}' is treated as subtraction by Python. Please use an underscore like '${lhs.replace(/-/g, '_')}'.`,
        });
        return;
      }
      if (lhs.includes(' ')) {
        syntaxErrors.push({
          line: lineNum,
          raw: cleanLine,
          reason: `SyntaxError because variable name '${lhs}' cannot contain spaces. Please connect words with an underscore like '${lhs.replace(/\s+/g, '_')}'.`,
        });
        return;
      }
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(lhs)) {
        syntaxErrors.push({
          line: lineNum,
          raw: cleanLine,
          reason: `SyntaxError because variable name '${lhs}' contains invalid characters in Python.`,
        });
        return;
      }

      if (!rhs) {
        syntaxErrors.push({
          line: lineNum,
          raw: cleanLine,
          reason: `SyntaxError because variable '${lhs}' is missing a value after the equals sign.`,
        });
        return;
      }

      let evaluatedValue: string | number | boolean | undefined;

      if ((rhs.startsWith('"') && rhs.endsWith('"')) || (rhs.startsWith("'") && rhs.endsWith("'"))) {
        evaluatedValue = rhs.slice(1, -1);
      } else if (rhs === 'True' || rhs === 'False') {
        evaluatedValue = rhs === 'True';
      } else if (/^-?\d+(\.\d+)?$/.test(rhs)) {
        evaluatedValue = Number(rhs);
      } else if (rhs.includes('+')) {
        const addParts = rhs.split('+').map((s) => s.trim());
        let sum = 0;
        let allNumeric = true;
        for (const part of addParts) {
          if (/^-?\d+(\.\d+)?$/.test(part)) {
            sum += Number(part);
          } else if (typeof vars[part] === 'number') {
            sum += Number(vars[part]);
          } else {
            allNumeric = false;
            break;
          }
        }
        if (allNumeric) {
          evaluatedValue = sum;
        }
      } else if (Object.prototype.hasOwnProperty.call(vars, rhs)) {
        evaluatedValue = vars[rhs];
      }

      if (evaluatedValue !== undefined) {
        if (Object.prototype.hasOwnProperty.call(vars, lhs) && vars[lhs] !== evaluatedValue) {
          reassignedVars[lhs] = { oldVal: vars[lhs], newVal: evaluatedValue };
        }
        vars[lhs] = evaluatedValue;
        validAssignmentCount += 1;
      }
    }
  });

  return {
    vars,
    reassignedVars,
    syntaxErrors,
    printOutputs,
    validAssignmentCount,
  };
}

const DEFAULT_HOME_CODE = `# PRACTICAL CHALLENGE 1 SMART HOME ARCHITECTURE
# Declare Python variables below to build the smart home

`;

const DEFAULT_ROVER_CODE = `# PRACTICAL CHALLENGE 2 AUTONOMOUS AI ROVER ASSEMBLY
# Declare Python variables below to assemble the robot components

`;

const STORAGE_KEYS = {
  challenge: 'py_ai_slide24_active_challenge_v1',
  homeCode: 'py_ai_slide24_home_code_v1',
  roverCode: 'py_ai_slide24_rover_code_v1',
};

function normalizeStoredCode(saved: string | null, fallback: string): string {
  if (saved === null) return fallback;
  if (saved.startsWith('# SOAL PRAKTIKUM') && saved.trim().split('\n').length <= 3) {
    return fallback;
  }
  return saved;
}

let cachedActiveChallenge: ChallengeId = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.challenge);
    if (saved === 'smart-home' || saved === 'ai-rover') return saved;
  } catch {
    // ignore storage errors
  }
  return 'smart-home';
})();

let cachedHomeCode: string = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.homeCode);
    return normalizeStoredCode(saved, DEFAULT_HOME_CODE);
  } catch {
    // ignore storage errors
  }
  return DEFAULT_HOME_CODE;
})();

let cachedRoverCode: string = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.roverCode);
    return normalizeStoredCode(saved, DEFAULT_ROVER_CODE);
  } catch {
    // ignore storage errors
  }
  return DEFAULT_ROVER_CODE;
})();

export const VariablesStoryPracticeLab: React.FC<VariablesStoryPracticeLabProps> = () => {
  const [activeChallenge, setActiveChallengeState] = useState<ChallengeId>(() => cachedActiveChallenge);
  const [homeCode, setHomeCodeState] = useState<string>(() => cachedHomeCode);
  const [roverCode, setRoverCodeState] = useState<string>(() => cachedRoverCode);

  const setActiveChallenge = (next: ChallengeId) => {
    cachedActiveChallenge = next;
    try {
      localStorage.setItem(STORAGE_KEYS.challenge, next);
    } catch {
      // ignore storage errors
    }
    setActiveChallengeState(next);
  };

  const setHomeCode: React.Dispatch<React.SetStateAction<string>> = (updater) => {
    setHomeCodeState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      cachedHomeCode = next;
      try {
        localStorage.setItem(STORAGE_KEYS.homeCode, next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const setRoverCode: React.Dispatch<React.SetStateAction<string>> = (updater) => {
    setRoverCodeState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      cachedRoverCode = next;
      try {
        localStorage.setItem(STORAGE_KEYS.roverCode, next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const currentCode = activeChallenge === 'smart-home' ? homeCode : roverCode;
  const setCurrentCode = activeChallenge === 'smart-home' ? setHomeCode : setRoverCode;

  const parsed = useMemo(() => evaluatePythonVariables(currentCode), [currentCode]);

  // ============================================================================
  // CHALLENGE 1 SMART AI HOME STATE EXTRACTION (Order-Independent)
  // ============================================================================
  const homeState = useMemo(() => {
    const v = parsed.vars;
    const roofRaw = String(v.roof ?? v.roof_type ?? v.atap ?? v.warna_atap ?? '').toLowerCase();
    const wallRaw = String(v.wall ?? v.walls ?? v.wall_style ?? v.dinding ?? v.tembok ?? '').toLowerCase();
    const winRaw = Number(v.window_count ?? v.windows ?? v.jumlah_jendela ?? v.jendela ?? 0);
    const treeRaw = Number(v.garden_trees ?? v.trees ?? v.pohon_taman ?? v.pohon ?? 0);
    const baseWatt = Number(v.base_power ?? v.main_power ?? v.base_watt ?? v.daya_utama ?? 0);
    const solarWatt = Number(v.solar_power ?? v.solar_watt ?? v.daya_surya ?? 0);
    const totalWatt = Number(v.total_power ?? v.total_watt ?? v.total_daya ?? 0);

    const hasRoof = ['solar', 'red', 'blue', 'gold', 'green', 'merah', 'biru', 'emas', 'hijau'].some((k) =>
      roofRaw.includes(k)
    );
    const hasWalls = ['brick', 'concrete', 'modern', 'wood', 'glass', 'bata', 'beton', 'kayu', 'kaca'].some((k) =>
      wallRaw.includes(k)
    );
    const windowCount = !Number.isNaN(winRaw) && winRaw > 0 ? Math.min(Math.max(Math.round(winRaw), 1), 3) : 0;
    const treeCount = !Number.isNaN(treeRaw) && treeRaw > 0 ? Math.min(Math.max(Math.round(treeRaw), 1), 3) : 0;
    const hasPowerMath = totalWatt > 0 && (baseWatt > 0 || solarWatt > 0);

    let roofStyle: 'solar' | 'red' | 'blue' = 'solar';
    if (roofRaw.includes('red') || roofRaw.includes('merah')) roofStyle = 'red';
    else if (roofRaw.includes('blue') || roofRaw.includes('biru')) roofStyle = 'blue';

    let wallStyle: 'brick' | 'modern' | 'wood' = 'brick';
    if (
      wallRaw.includes('concrete') ||
      wallRaw.includes('modern') ||
      wallRaw.includes('glass') ||
      wallRaw.includes('beton') ||
      wallRaw.includes('kaca')
    ) {
      wallStyle = 'modern';
    } else if (wallRaw.includes('wood') || wallRaw.includes('kayu')) {
      wallStyle = 'wood';
    }

    const completedSteps = [hasRoof, hasWalls, windowCount > 0, treeCount > 0, hasPowerMath].filter(Boolean).length;

    return {
      hasRoof,
      roofStyle,
      hasWalls,
      wallStyle,
      windowCount,
      treeCount,
      baseWatt,
      solarWatt,
      totalWatt,
      hasPowerMath,
      completedSteps,
    };
  }, [parsed.vars]);

  // ============================================================================
  // CHALLENGE 2 AI ROVER ROBOT STATE EXTRACTION (Order-Independent)
  // ============================================================================
  const roverState = useMemo(() => {
    const v = parsed.vars;
    const headRaw = String(v.head_sensor ?? v.robot_head ?? v.kepala_robot ?? v.sensor_kepala ?? '').toLowerCase();
    const bodyRaw = String(v.body_armor ?? v.armor_color ?? v.badan_armor ?? v.warna_badan ?? '').toLowerCase();
    const armRaw = Number(v.robot_arms ?? v.arm_count ?? v.arm_tools ?? v.lengan_mekanik ?? v.jumlah_lengan ?? 0);
    const wheelRaw = Number(v.wheel_units ?? v.wheel_count ?? v.wheel_drive ?? v.jumlah_roda ?? v.roda ?? 0);
    const coreBat = Number(v.core_battery ?? v.main_battery ?? v.baterai_inti ?? 0);
    const backupBat = Number(v.backup_battery ?? v.baterai_cadangan ?? 0);
    const totalBat = Number(v.total_battery ?? v.total_baterai ?? 0);

    const hasHead = ['lidar', 'camera', 'radar', 'laser', 'kamera'].some((k) => headRaw.includes(k));
    const hasBody = ['navy', 'gold', 'amber', 'green', 'emerald', 'blue', 'emas', 'hijau', 'biru'].some((k) =>
      bodyRaw.includes(k)
    );
    const armCount = !Number.isNaN(armRaw) && armRaw > 0 ? Math.min(Math.max(Math.round(armRaw), 1), 2) : 0;
    const wheelCount = !Number.isNaN(wheelRaw) && wheelRaw > 0 ? Math.min(Math.max(Math.round(wheelRaw), 1), 6) : 0;
    const hasBatteryMath = totalBat > 0 && (coreBat > 0 || backupBat > 0);

    let armorColor: 'navy' | 'amber' | 'emerald' = 'navy';
    if (bodyRaw.includes('gold') || bodyRaw.includes('amber') || bodyRaw.includes('emas')) armorColor = 'amber';
    else if (bodyRaw.includes('green') || bodyRaw.includes('emerald') || bodyRaw.includes('hijau'))
      armorColor = 'emerald';

    const completedSteps = [hasHead, hasBody, armCount > 0, wheelCount > 0, hasBatteryMath].filter(Boolean).length;

    return {
      hasHead,
      hasBody,
      armorColor,
      armCount,
      wheelCount,
      coreBat,
      backupBat,
      totalBat,
      hasBatteryMath,
      completedSteps,
    };
  }, [parsed.vars]);

  const homeSteps = [
    {
      id: 'roof',
      done: homeState.hasRoof,
      title: '1. Roof Variable Declaration (String)',
      storyHint: 'Create the roof variable using "solar", "red", or "blue" as its string value.',
      primaryBadge: 'Example is roof = "solar"',
      secondaryBadge: 'Other options are "red" or "blue"',
    },
    {
      id: 'walls',
      done: homeState.hasWalls,
      title: '2. Wall Material Variable Declaration (String)',
      storyHint: 'Set the building wall material using one of the supported string values.',
      primaryBadge: 'Variable name is wall',
      secondaryBadge: 'Value options are "brick", "concrete", or "wood"',
    },
    {
      id: 'windows',
      done: homeState.windowCount > 0,
      title: '3. Window Count Variable Declaration (Number)',
      storyHint: 'Specify how many glowing smart windows should be installed on the facade.',
      primaryBadge: 'Variable name is window_count',
      secondaryBadge: 'Number options are 1 to 3',
    },
    {
      id: 'trees',
      done: homeState.treeCount > 0,
      title: '4. Garden Trees Variable Declaration (Number)',
      storyHint: 'Specify the number of trees planted on the green lawn around the house.',
      primaryBadge: 'Variable name is garden_trees',
      secondaryBadge: 'Number options are 1 to 3',
    },
    {
      id: 'power',
      done: homeState.hasPowerMath,
      title: '5. Total Electrical Power Variable Calculation',
      storyHint:
        'Assign any numeric values to base_power and solar_power, then add both variables together inside total_power.',
      primaryBadge: 'Variables are base_power, solar_power, and total_power',
      secondaryBadge: 'Operation uses variable addition (+)',
    },
  ];

  const roverSteps = [
    {
      id: 'head',
      done: roverState.hasHead,
      title: '1. Head Sensor Variable Declaration (String)',
      storyHint: 'Create the head_sensor variable using "lidar", "camera", or "radar" as its string value.',
      primaryBadge: 'Example is head_sensor = "lidar"',
      secondaryBadge: 'Other options are "camera" or "radar"',
    },
    {
      id: 'body',
      done: roverState.hasBody,
      title: '2. Body Armor Variable Declaration (String)',
      storyHint: 'Choose the metallic armor color for the central robot torso.',
      primaryBadge: 'Variable name is body_armor',
      secondaryBadge: 'Value options are "navy", "gold", or "green"',
    },
    {
      id: 'arms',
      done: roverState.armCount > 0,
      title: '3. Mechanical Arms Variable Declaration (Number)',
      storyHint: 'Specify how many articulated mechanical arms should be mounted on the robot.',
      primaryBadge: 'Variable name is robot_arms',
      secondaryBadge: 'Number options are 1 or 2',
    },
    {
      id: 'wheels',
      done: roverState.wheelCount > 0,
      title: '4. Wheel Drive Units Variable Declaration (Number)',
      storyHint: 'Specify how many all-terrain wheel drive assemblies should be attached to the base.',
      primaryBadge: 'Variable name is wheel_units',
      secondaryBadge: 'Number options are 1 to 3',
    },
    {
      id: 'battery',
      done: roverState.hasBatteryMath,
      title: '5. Total Battery Capacity Variable Calculation',
      storyHint:
        'Assign any numeric values to core_battery and backup_battery, then add both variables together inside total_battery.',
      primaryBadge: 'Variables are core_battery, backup_battery, and total_battery',
      secondaryBadge: 'Operation uses variable addition (+)',
    },
  ];

  const activeSteps = activeChallenge === 'smart-home' ? homeSteps : roverSteps;
  const completedCount = activeChallenge === 'smart-home' ? homeState.completedSteps : roverState.completedSteps;

  return (
    <div className="w-full space-y-4">
      {/* Top Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#15284f] text-white">
              Hands-On Practice Lab
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#15284f]">
            Interactive Story Lab for{' '}
            <span className="text-[#f59e0b]">Building 3D Worlds with Python Variables</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Solve two real-world story challenges and watch the 3D visual assemble piece by piece as you write each
            Python variable.
          </p>
        </div>

        {/* 2 Story Problem Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => setActiveChallenge('smart-home')}
            className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeChallenge === 'smart-home'
                ? 'bg-[#15284f] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#15284f]'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Challenge 1 Smart Home 3D ({homeState.completedSteps}/5)</span>
          </button>
          <button
            onClick={() => setActiveChallenge('ai-rover')}
            className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeChallenge === 'ai-rover'
                ? 'bg-[#15284f] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#15284f]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Challenge 2 AI Rover Robot ({roverState.completedSteps}/5)</span>
          </button>
        </div>
      </div>

      {/* Story Context & Mission Bar */}
      <div className="bg-gradient-to-r from-[#15284f] via-[#1c3568] to-[#15284f] rounded-2xl p-4 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f59e0b] text-slate-950 flex items-center justify-center shrink-0 font-mono font-black text-sm shadow">
            {activeChallenge === 'smart-home' ? '01' : '02'}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                {activeChallenge === 'smart-home'
                  ? 'Practice Story 1 • Smart Home Architecture'
                  : 'Practice Story 2 • Autonomous AI Logistics Rover'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              {activeChallenge === 'smart-home'
                ? 'A smart residential district needs an automated home configuration powered by Python. Your mission is to construct a complete Smart Home unit from an empty plot by declaring variables for the roof type, wall material, number of windows, and number of garden trees, followed by calculating the total electrical power from the main grid and solar panels.'
                : 'The Robotics Laboratory is preparing an Autonomous Courier Robot unit for the university library. Your mission is to assemble the robot components on the workbench by declaring variables for the head sensor type, body armor color, number of mechanical arms, and number of wheel drive units, followed by calculating the total battery capacity.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={() => {
              if (activeChallenge === 'smart-home') {
                setHomeCode(DEFAULT_HOME_CODE);
              } else {
                setRoverCode(DEFAULT_ROVER_CODE);
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer border border-white/15"
            title="Clear the editor to start typing from scratch"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
            <span>Clear Canvas</span>
          </button>
        </div>
      </div>

      {/* Main 12-Column Interactive Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT COLUMN (7 Cols) Live Python Editor and Interactive Story Checklist */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Live Python Compiler Editor Card */}
          <div className="bg-[#0b1329] rounded-3xl border-2 border-[#15284f] shadow-xl overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-[#15284f] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-mono text-xs font-bold text-white">
                  {activeChallenge === 'smart-home' ? 'smart_home_builder.py' : 'ai_rover_assembler.py'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-300">
                {Object.keys(parsed.vars).length} Active Variables
              </span>
            </div>

            {/* Code Editor Textarea with Line Numbers */}
            <div className="relative flex font-mono text-xs sm:text-sm bg-[#080e20] min-h-[210px]">
              {/* Line Numbers Gutter */}
              <div className="py-3.5 px-2.5 text-right select-none bg-[#060a17] text-slate-500 border-r border-slate-800/80 font-mono text-xs leading-relaxed">
                {currentCode.split('\n').map((_, idx) => (
                  <div key={idx}>{idx + 1}</div>
                ))}
              </div>

              {/* Editable Code Area */}
              <textarea
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                spellCheck={false}
                className="w-full p-3.5 bg-transparent text-amber-100 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y min-h-[210px]"
                placeholder="Type your Python variables here..."
              />
            </div>

            {/* Real-Time SyntaxError & Reassignment Diagnostics Bar */}
            {parsed.syntaxErrors.length > 0 ? (
              <div className="px-4 py-2.5 bg-rose-950/90 border-t border-rose-500/50 text-rose-200 text-xs font-mono space-y-1">
                {parsed.syntaxErrors.map((err, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">On Line {err.line},</strong> {err.reason}
                    </span>
                  </div>
                ))}
              </div>
            ) : Object.keys(parsed.reassignedVars).length > 0 ? (
              <div className="px-4 py-2 bg-amber-500/15 border-t border-amber-500/30 text-amber-200 text-xs font-mono flex items-center justify-between">
                <span>
                  Reassignment Detected where{' '}
                  {Object.entries(parsed.reassignedVars).map(([k, v]) => (
                    <span key={k} className="mr-3">
                      <strong className="text-white">{k}</strong> changed from{' '}
                      <span className="line-through text-rose-300">{String(v.oldVal)}</span> to{' '}
                      <span className="text-emerald-300 font-bold">{String(v.newVal)}</span>
                    </span>
                  ))}
                </span>
              </div>
            ) : null}

            {/* Live Terminal Output & Memory Inspector Footer */}
            <div className="p-3.5 bg-[#060a17] border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                <span>Current Variable Memory Boxes in RAM Inspector</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {Object.entries(parsed.vars).length === 0 ? (
                  <span className="text-xs font-mono text-slate-500 italic">
                    No variables have been declared yet. Type your first variable in the editor above!
                  </span>
                ) : (
                  Object.entries(parsed.vars).map(([key, val]) => (
                    <div
                      key={key}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs flex items-center gap-1.5"
                    >
                      <span className="text-cyan-300 font-bold">{key}</span>
                      <span className="text-slate-500">=</span>
                      <span className="text-amber-300 font-bold">
                        {typeof val === 'string' ? `"${val}"` : String(val)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {parsed.printOutputs.length > 0 && (
                <div className="pt-1.5 border-t border-slate-800/80 font-mono text-xs text-emerald-400">
                  {parsed.printOutputs.map((out, i) => (
                    <div key={i}>&gt;&gt;&gt; {out}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Step-by-Step Story Tasks (Static Reference Only) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-md space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#15284f]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#15284f]">
                  Variable Mission Checklist
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#b45309]">
                {completedCount} of 5 Components Built
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-2.5 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                    idx === 4 ? 'sm:col-span-2' : ''
                  } ${
                    step.done
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            step.done ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        />
                        <span className="font-bold text-xs text-[#15284f]">{step.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 pl-5 leading-snug">{step.storyHint}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pl-5 select-none">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-200/80 border border-slate-300 text-[#15284f] font-mono text-[10px] font-bold">
                      {step.primaryBadge}
                    </span>
                    {step.secondaryBadge && (
                      <span className="px-2 py-1 rounded-lg bg-amber-50 text-[#b45309] border border-amber-200 font-mono text-[10px] font-semibold">
                        {step.secondaryBadge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols) Live 3D Blueprint Visual Builder Canvas */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-[#15284f] p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b45309] block">
                LIVE 3D BLUEPRINT VISUALIZER
              </span>
              <h3 className="text-lg font-extrabold text-[#15284f]">
                {activeChallenge === 'smart-home'
                  ? 'Smart Home 3D Construction Canvas'
                  : 'AI Courier Rover Assembly Canvas'}
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full font-mono text-xs font-black bg-amber-100 text-[#b45309] border border-amber-300">
              {completedCount * 20}% Complete
            </div>
          </div>

          {/* 3D Modular Sprite Scene */}
          <div className="my-3 relative rounded-2xl bg-gradient-to-b from-[#0b152c] via-[#112246] to-[#0c1933] border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[340px] shadow-inner overflow-hidden">
            {/* Blueprint Grid Overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {activeChallenge === 'smart-home' ? (
              /* ==============================================================
                 HIGH-RES 3D MODULAR SMART HOME SPRITE SHEET ASSEMBLY
                 Matches exact proportions of the assembled reference image (1024x765)
                 ============================================================== */
              <div className="relative w-full aspect-[1024/765] max-h-[340px] mx-auto select-none z-10">
                {/* Holographic Total Power Banner */}
                {homeState.hasPowerMath && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 px-3.5 py-0.5 rounded-full bg-emerald-950/95 border border-emerald-400 text-emerald-100 font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>total_power = {homeState.totalWatt} W (AI ONLINE)</span>
                  </div>
                )}

                {/* Ghost Blueprint Outlines when parts are not yet declared */}
                {!homeState.hasRoof && (
                  <div
                    className="absolute border-2 border-dashed border-sky-400/40 rounded-lg flex items-center justify-center pointer-events-none"
                    style={{ left: '26.56%', top: '6.0%', width: '49.02%', height: '21.0%' }}
                  >
                    <span className="text-[10px] font-mono text-sky-300/70 bg-slate-950/60 px-2 py-0.5 rounded">
                      [ Roof Area for roof ]
                    </span>
                  </div>
                )}

                {!homeState.hasWalls && (
                  <div
                    className="absolute border-2 border-dashed border-amber-400/35 rounded-lg flex items-center justify-center pointer-events-none"
                    style={{ left: '28.71%', top: '27.5%', width: '44.92%', height: '60.0%' }}
                  >
                    <span className="text-[10px] font-mono text-amber-300/70 bg-slate-950/60 px-2 py-0.5 rounded">
                      [ Wall Area for wall ]
                    </span>
                  </div>
                )}

                {homeState.treeCount === 0 && (
                  <div
                    className="absolute border-2 border-dashed border-emerald-400/35 rounded-lg flex items-center justify-center pointer-events-none"
                    style={{ left: '3%', top: '85.5%', width: '94%', height: '12%' }}
                  >
                    <span className="text-[10px] font-mono text-emerald-300/70 bg-slate-950/60 px-2 py-0.5 rounded">
                      [ Garden Lawn and Trees Area for garden_trees ]
                    </span>
                  </div>
                )}

                {/* LAYER 1 2-STORY 3D BRICK WALL + STONE BASE + SMART FRONT DOOR */}
                {homeState.hasWalls && (
                  <>
                    <img
                      src="/images/smart-home/wall_brick_2story.png"
                      alt="3D Smart Home Wall"
                      className="absolute object-fill drop-shadow-2xl transition-all duration-500"
                      style={{
                        left: '27.5%',
                        top: '26.2%',
                        width: '47.3%',
                        height: '64.5%',
                        zIndex: 15,
                        filter:
                          homeState.wallStyle === 'modern'
                            ? 'grayscale(0.95) brightness(1.35) contrast(1.05)'
                            : homeState.wallStyle === 'wood'
                            ? 'sepia(0.55) saturate(1.4) brightness(0.82) contrast(1.1)'
                            : 'none',
                      }}
                    />
                    <img
                      src="/images/smart-home/door_smart.png"
                      alt="3D Smart Door"
                      className="absolute object-contain drop-shadow-md transition-all duration-500"
                      style={{
                        left: '56.54%',
                        top: '62.2%',
                        width: '11.62%',
                        height: '25.5%',
                        zIndex: 22,
                      }}
                    />
                  </>
                )}

                {/* LAYER 2 3D GLOWING WINDOWS */}
                {homeState.windowCount > 0 &&
                  [
                    { left: '33.30%', top: '32.8%', width: '14.55%', height: '19.35%' },
                    { left: '54.98%', top: '32.8%', width: '14.55%', height: '19.35%' },
                    { left: '33.30%', top: '62.8%', width: '14.65%', height: '19.35%' },
                  ]
                    .slice(0, homeState.windowCount)
                    .map((pos, idx) => (
                      <img
                        key={idx}
                        src="/images/smart-home/window_glow.png"
                        alt={`3D Smart Window ${idx + 1}`}
                        className="absolute object-contain transition-all duration-500"
                        style={{
                          left: pos.left,
                          top: pos.top,
                          width: pos.width,
                          height: pos.height,
                          zIndex: 24,
                          filter: homeState.hasPowerMath
                            ? 'brightness(1.18) saturate(1.25) drop-shadow(0 0 12px rgba(250, 204, 21, 0.65))'
                            : 'brightness(0.95)',
                        }}
                      />
                    ))}

                {/* LAYER 3 3D SOLAR PITCHED ROOF */}
                {homeState.hasRoof && (
                  <img
                    src="/images/smart-home/roof_solar.png"
                    alt="3D Solar Roof"
                    className="absolute object-contain drop-shadow-2xl transition-all duration-500"
                    style={{
                      left: '26.56%',
                      top: '5.8%',
                      width: '49.02%',
                      height: '22.61%',
                      zIndex: 30,
                      filter:
                        homeState.roofStyle === 'red'
                          ? 'hue-rotate(145deg) saturate(1.35) brightness(1.05)'
                          : homeState.roofStyle === 'blue'
                          ? 'hue-rotate(15deg) saturate(1.2) brightness(1.1)'
                          : homeState.hasPowerMath
                          ? 'drop-shadow(0 0 14px rgba(56, 189, 248, 0.55))'
                          : 'none',
                    }}
                  />
                )}

                {/* LAYER 4 3D GARDEN TREES + FULL-WIDTH GREEN GRASS & SOIL PLATFORM */}
                {homeState.treeCount > 0 && (
                  <>
                    {[
                      { left: '8.5%', top: '54.0%', width: '20.5%', height: '35.5%', zIndex: 25 },
                      { left: '72.5%', top: '54.0%', width: '20.5%', height: '35.5%', zIndex: 25 },
                      { left: '2.0%', top: '59.0%', width: '17.0%', height: '30.5%', zIndex: 24 },
                    ]
                      .slice(0, homeState.treeCount)
                      .map((t, idx) => (
                        <img
                          key={idx}
                          src="/images/smart-home/tree_3d.png"
                          alt={`3D Garden Tree ${idx + 1}`}
                          className="absolute object-contain drop-shadow-xl transition-all duration-500"
                          style={{
                            left: t.left,
                            top: t.top,
                            width: t.width,
                            height: t.height,
                            zIndex: t.zIndex,
                          }}
                        />
                      ))}

                    <img
                      src="/images/smart-home/ground_lawn_wide.png"
                      alt="3D Grass Platform Base"
                      className="absolute object-fill drop-shadow-xl transition-all duration-500"
                      style={{
                        left: '2.0%',
                        top: '83.5%',
                        width: '96.0%',
                        height: '14.5%',
                        zIndex: 28,
                      }}
                    />
                  </>
                )}
              </div>
            ) : (
              /* ==============================================================
                 HIGH-RES 3D MODULAR AI ROVER ROBOT SPRITE SHEET ASSEMBLY
                 Matches exact proportions of the assembled reference image (1024x765)
                 ============================================================== */
              <div className="relative w-full aspect-[1024/765] max-h-[340px] mx-auto select-none z-10">
                {/* Holographic Total Battery Banner */}
                {roverState.hasBatteryMath && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 px-3.5 py-0.5 rounded-full bg-emerald-950/95 border border-emerald-400 text-emerald-100 font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>total_battery = {roverState.totalBat}% (ONLINE)</span>
                  </div>
                )}

                {/* Ghost Blueprint Outlines when parts are not yet declared */}
                {!roverState.hasHead && (
                  <div
                    className="absolute border-2 border-dashed border-sky-400/40 rounded-2xl flex items-center justify-center pointer-events-none"
                    style={{ left: '39.45%', top: '4.5%', width: '21.09%', height: '25.5%' }}
                  >
                    <span className="text-[10px] font-mono text-sky-300/70 bg-slate-950/60 px-2 py-0.5 rounded">
                      [ Head Area for head_sensor ]
                    </span>
                  </div>
                )}

                {!roverState.hasBody && (
                  <div
                    className="absolute border-2 border-dashed border-amber-400/35 rounded-2xl flex items-center justify-center pointer-events-none"
                    style={{ left: '36.33%', top: '31.0%', width: '27.34%', height: '29.0%' }}
                  >
                    <span className="text-[10px] font-mono text-amber-300/70 bg-slate-950/60 px-2 py-0.5 rounded">
                      [ Torso Area for body_armor ]
                    </span>
                  </div>
                )}

                {roverState.wheelCount === 0 && (
                  <div
                    className="absolute border-2 border-dashed border-emerald-400/35 rounded-2xl flex items-center justify-center pointer-events-none"
                    style={{ left: '23.05%', top: '61.5%', width: '53.90%', height: '33.5%' }}
                  >
                    <span className="text-[10px] font-mono text-emerald-300/70 bg-slate-950/60 px-2 py-0.5 rounded">
                      [ Wheels and Base Area for wheel_units ]
                    </span>
                  </div>
                )}

                {/* LAYER 1 WHEELS + METALLIC DOCKING BASE PLATFORM */}
                {roverState.wheelCount >= 1 && (
                  <img
                    src="/images/ai-rover/wheel_center_base.png"
                    alt="3D Center Wheel and Metallic Base"
                    className="absolute object-contain drop-shadow-2xl transition-all duration-500"
                    style={{
                      left: '33.20%',
                      top: '60.13%',
                      width: '33.59%',
                      height: '35.29%',
                      zIndex: 18,
                    }}
                  />
                )}

                {roverState.wheelCount >= 2 && (
                  <img
                    src="/images/ai-rover/wheel_left_unit.png"
                    alt="3D Left Wheel Assembly"
                    className="absolute object-contain drop-shadow-2xl transition-all duration-500"
                    style={{
                      left: '23.05%',
                      top: '65.36%',
                      width: '16.99%',
                      height: '30.07%',
                      zIndex: 19,
                    }}
                  />
                )}

                {roverState.wheelCount >= 3 && (
                  <img
                    src="/images/ai-rover/wheel_right_unit.png"
                    alt="3D Right Wheel Assembly"
                    className="absolute object-contain drop-shadow-2xl transition-all duration-500"
                    style={{
                      left: '59.96%',
                      top: '65.36%',
                      width: '16.99%',
                      height: '30.07%',
                      zIndex: 19,
                    }}
                  />
                )}

                {/* LAYER 2 ARTICULATED MECHANICAL ARMS */}
                {roverState.armCount >= 1 && (
                  <img
                    src="/images/ai-rover/arm_left.png"
                    alt="3D Left Mechanical Arm"
                    className="absolute object-contain drop-shadow-xl transition-all duration-500"
                    style={{
                      left: '25.98%',
                      top: '32.94%',
                      width: '11.91%',
                      height: '31.63%',
                      zIndex: 20,
                    }}
                  />
                )}

                {roverState.armCount >= 2 && (
                  <img
                    src="/images/ai-rover/arm_right.png"
                    alt="3D Right Mechanical Arm"
                    className="absolute object-contain drop-shadow-xl transition-all duration-500"
                    style={{
                      left: '62.11%',
                      top: '32.94%',
                      width: '11.91%',
                      height: '31.63%',
                      zIndex: 20,
                    }}
                  />
                )}

                {/* LAYER 3 3D ARMOR CHASSIS TORSO WITH EMPTY CHEST SOCKET */}
                {roverState.hasBody && (
                  <img
                    src="/images/ai-rover/torso_navy.png"
                    alt="3D Robot Torso Armor"
                    className="absolute object-contain drop-shadow-2xl transition-all duration-500"
                    style={{
                      left: '36.33%',
                      top: '30.59%',
                      width: '27.34%',
                      height: '30.33%',
                      zIndex: 22,
                      filter:
                        roverState.armorColor === 'amber'
                          ? 'hue-rotate(155deg) saturate(1.45) brightness(1.08)'
                          : roverState.armorColor === 'emerald'
                          ? 'hue-rotate(270deg) saturate(1.35) brightness(1.05)'
                          : 'none',
                    }}
                  />
                )}

                {/* LAYER 4 GLOWING ARC REACTOR CORE ORB */}
                {roverState.hasBatteryMath && (
                  <img
                    src="/images/ai-rover/core_glow.png"
                    alt="3D Glowing Battery Core"
                    className="absolute object-contain transition-all duration-500"
                    style={{
                      left: '44.92%',
                      top: '37.65%',
                      width: '10.16%',
                      height: '13.59%',
                      zIndex: 26,
                      filter: 'drop-shadow(0 0 12px rgba(45, 212, 191, 0.75))',
                    }}
                  />
                )}

                {/* LAYER 5 3D HEAD VISOR, ANTENNAS & LIDAR DOME */}
                {roverState.hasHead && (
                  <img
                    src="/images/ai-rover/head_lidar.png"
                    alt="3D Robot Head Sensor"
                    className="absolute object-contain drop-shadow-2xl transition-all duration-500"
                    style={{
                      left: '39.45%',
                      top: '3.92%',
                      width: '21.09%',
                      height: '27.45%',
                      zIndex: 28,
                      filter: roverState.hasBatteryMath
                        ? 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.45))'
                        : 'none',
                    }}
                  />
                )}
              </div>
            )}

            {/* Status Overlay Pill at Bottom of 3D Viewport */}
            <div className="mt-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-slate-200 flex items-center gap-2 z-10">
              <Layers className="w-3.5 h-3.5 text-[#f59e0b]" />
              {completedCount === 0 ? (
                <span>The canvas is currently empty, so please type your variables in the left editor.</span>
              ) : completedCount < 5 ? (
                <span>
                  3D components appear as you declare each variable ({5 - completedCount} remaining)
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">
                  Awesome work! All 3D components and variable calculations are 100% complete!
                </span>
              )}
            </div>
          </div>

          {/* Pedagogical Summary Card at Bottom Right */}
          <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-slate-700 space-y-1">
            <div className="font-mono font-bold text-[#15284f] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Core Variable Concepts Practiced in This Lab</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              1. <strong>Assignment (=)</strong> stores a value in memory and immediately triggers the 3D component.{' '}
              2. <strong>Reassignment</strong> updates an existing variable and changes colors or counts in real time.{' '}
              3. <strong>Variable Math (+)</strong> combines two memory boxes into a total power or battery value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
