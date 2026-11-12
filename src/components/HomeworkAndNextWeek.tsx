import React, { useState, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Eye,
  X,
  Layers,
  FileText,
  Award,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import { SlideData } from '../types/slides';

interface HomeworkAndNextWeekProps {
  slide: SlideData;
  theme?: string;
}

interface StudentProfile {
  fullName: string;
  studentId: string;
  studyProgram: string;
  courseName: string;
  className: string;
}

interface VariableMathRecord {
  targetVar: string;
  expression: string;
  result: number;
}

interface ParsedProjectEnvironment {
  vars: Record<string, string | number | boolean>;
  varTypes: Record<string, string>;
  reassignedVars: Record<
    string,
    { firstVal: string | number | boolean; oldVal: string | number | boolean; newVal: string | number | boolean }
  >;
  mathRecords: VariableMathRecord[];
  syntaxErrors: { line: number; raw: string; reason: string }[];
  printOutputs: string[];
  validAssignmentCount: number;
}

/**
 * Python Variables Compiler for Slide 26 Take-Home Capstone Project (Slides 21-23).
 * Evaluates variable assignments, reassignments, arithmetic expressions (+, -, *),
 * print() statements, and enforces Python identifier rules (snake_case).
 */
function evaluateProjectPython(code: string): ParsedProjectEnvironment {
  const vars: Record<string, string | number | boolean> = {};
  const varTypes: Record<string, string> = {};
  const firstValues: Record<string, string | number | boolean> = {};
  const reassignedVars: Record<
    string,
    { firstVal: string | number | boolean; oldVal: string | number | boolean; newVal: string | number | boolean }
  > = {};
  const mathRecords: VariableMathRecord[] = [];
  const syntaxErrors: { line: number; raw: string; reason: string }[] = [];
  const printOutputs: string[] = [];
  let validAssignmentCount = 0;

  const lines = code.split('\n');

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    const commentIndex = rawLine.indexOf('#');
    const cleanLine = (commentIndex !== -1 ? rawLine.slice(0, commentIndex) : rawLine).trim();
    if (!cleanLine) return;

    // Handle print(...)
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
        return `NameError: name '${token}' is not defined`;
      });
      printOutputs.push(resolved.join(' '));
      return;
    }

    if (!cleanLine.includes('=')) {
      syntaxErrors.push({
        line: lineNum,
        raw: cleanLine,
        reason: `SyntaxError: Command line '${cleanLine}' is neither a variable declaration ('=') nor a print() statement.`,
      });
      return;
    }

    const eqIdx = cleanLine.indexOf('=');
    const lhs = cleanLine.slice(0, eqIdx).trim();
    const rhs = cleanLine.slice(eqIdx + 1).trim();

    // Python Naming Rules Validation
    if (/^[0-9]/.test(lhs)) {
      syntaxErrors.push({
        line: lineNum,
        raw: cleanLine,
        reason: `SyntaxError: Variable name '${lhs}' starts with a number. Python rule: use a letter or underscore at the start.`,
      });
      return;
    }
    if (lhs.includes('-')) {
      syntaxErrors.push({
        line: lineNum,
        raw: cleanLine,
        reason: `SyntaxError: Variable name '${lhs}' contains a hyphen (-). Use snake_case: '${lhs.replace(/-/g, '_')}'.`,
      });
      return;
    }
    if (lhs.includes(' ')) {
      syntaxErrors.push({
        line: lineNum,
        raw: cleanLine,
        reason: `SyntaxError: Variable name '${lhs}' contains spaces. Use underscores (_): '${lhs.replace(/\s+/g, '_')}'.`,
      });
      return;
    }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(lhs)) {
      syntaxErrors.push({
        line: lineNum,
        raw: cleanLine,
        reason: `SyntaxError: Variable name '${lhs}' contains characters not allowed by Python identifier rules.`,
      });
      return;
    }

    if (!rhs) {
      syntaxErrors.push({
        line: lineNum,
        raw: cleanLine,
        reason: `SyntaxError: Variable '${lhs}' is missing a value after '='.`,
      });
      return;
    }

    let evaluatedValue: string | number | boolean | undefined;
    let detectedType = 'str';
    let isMathOp = false;

    if ((rhs.startsWith('"') && rhs.endsWith('"')) || (rhs.startsWith("'") && rhs.endsWith("'"))) {
      evaluatedValue = rhs.slice(1, -1);
      detectedType = 'str';
    } else if (rhs === 'True' || rhs === 'False') {
      evaluatedValue = rhs === 'True';
      detectedType = 'bool';
    } else if (/^-?\d+(\.\d+)?$/.test(rhs)) {
      evaluatedValue = Number(rhs);
      detectedType = rhs.includes('.') ? 'float' : 'int';
    } else if (/[+\-*]/.test(rhs)) {
      const tokens = rhs.split(/([+\-*])/).map((t) => t.trim()).filter(Boolean);
      let validMath = tokens.length >= 3;
      const numericValues: (number | string)[] = [];
      let involvesVar = false;

      for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        if (i % 2 === 1) {
          if (tok !== '+' && tok !== '-' && tok !== '*') {
            validMath = false;
            break;
          }
          numericValues.push(tok);
        } else {
          if (/^-?\d+(\.\d+)?$/.test(tok)) {
            numericValues.push(Number(tok));
          } else if (typeof vars[tok] === 'number') {
            numericValues.push(Number(vars[tok]));
            involvesVar = true;
          } else {
            validMath = false;
            syntaxErrors.push({
              line: lineNum,
              raw: cleanLine,
              reason: `NameError / TypeError: Variable '${tok}' in '${rhs}' has not been defined or is not numeric.`,
            });
            break;
          }
        }
      }

      if (validMath && numericValues.length >= 3) {
        const afterMul: (number | string)[] = [numericValues[0]];
        for (let i = 1; i < numericValues.length; i += 2) {
          const op = numericValues[i];
          const nextVal = Number(numericValues[i + 1]);
          if (op === '*') {
            const prevVal = Number(afterMul.pop());
            afterMul.push(prevVal * nextVal);
          } else {
            afterMul.push(op, nextVal);
          }
        }
        let acc = Number(afterMul[0]);
        for (let i = 1; i < afterMul.length; i += 2) {
          const op = afterMul[i];
          const nextVal = Number(afterMul[i + 1]);
          if (op === '+') acc += nextVal;
          else if (op === '-') acc -= nextVal;
        }
        evaluatedValue = acc;
        detectedType = Number.isInteger(acc) ? 'int' : 'float';
        isMathOp = involvesVar;
      }
    } else if (Object.prototype.hasOwnProperty.call(vars, rhs)) {
      evaluatedValue = vars[rhs];
      detectedType = varTypes[rhs] || typeof evaluatedValue;
    } else {
      syntaxErrors.push({
        line: lineNum,
        raw: cleanLine,
        reason: `SyntaxError / NameError: Value '${rhs}' is unrecognized. Use quotation marks for string literals or ensure the variable is defined.`,
      });
      return;
    }

    if (evaluatedValue !== undefined) {
      if (!Object.prototype.hasOwnProperty.call(firstValues, lhs)) {
        firstValues[lhs] = evaluatedValue;
      } else if (vars[lhs] !== evaluatedValue) {
        reassignedVars[lhs] = {
          firstVal: firstValues[lhs],
          oldVal: vars[lhs],
          newVal: evaluatedValue,
        };
      }
      vars[lhs] = evaluatedValue;
      varTypes[lhs] = detectedType;
      validAssignmentCount += 1;

      if (isMathOp && typeof evaluatedValue === 'number') {
        const existingIdx = mathRecords.findIndex((r) => r.targetVar === lhs);
        const rec = { targetVar: lhs, expression: rhs, result: evaluatedValue };
        if (existingIdx >= 0) mathRecords[existingIdx] = rec;
        else mathRecords.push(rec);
      }
    }
  });

  return {
    vars,
    varTypes,
    reassignedVars,
    mathRecords,
    syntaxErrors,
    printOutputs,
    validAssignmentCount,
  };
}

const DEFAULT_PROJECT_CODE = `# INDEPENDENT CAPSTONE PROJECT:
# Smart Campus AI Energy & Logistics Management System
# Review the 5-Stage instructions on the left, then write your Python code below:

`;

const DEFAULT_PROFILE: StudentProfile = {
  fullName: '',
  studentId: '',
  studyProgram: '',
  courseName: 'Python Programming for AI',
  className: '',
};

const STORAGE_KEYS = {
  profile: 'py_ai_slide26_student_profile_v2',
  code: 'py_ai_slide26_project_code_v2',
};

let cachedProfile: StudentProfile = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.profile);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        !parsed.courseName ||
        parsed.courseName.includes('Python fo') ||
        parsed.courseName.includes('(Python for AI)') ||
        parsed.courseName.includes('Pemrograman Python')
      ) {
        parsed.courseName = 'Python Programming for AI';
      }
      return { ...DEFAULT_PROFILE, ...parsed };
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_PROFILE;
})();

let cachedProjectCode: string = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.code);
    if (raw !== null && !raw.includes('# TUGAS PROYEK MANDIRI') && !raw.includes('nama_gedung')) return raw;
  } catch {
    // ignore storage errors
  }
  return DEFAULT_PROJECT_CODE;
})();

export const HomeworkAndNextWeek: React.FC<HomeworkAndNextWeekProps> = () => {
  const [profile, setProfileState] = useState<StudentProfile>(() => cachedProfile);
  const [code, setCodeState] = useState<string>(() => cachedProjectCode);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pdfFeedback, setPdfFeedback] = useState<string | null>(null);
  const [activeStageFilter, setActiveStageFilter] = useState<number | 'all'>('all');
  const [activeRightTab, setActiveRightTab] = useState<'telemetry' | 'ram'>('telemetry');

  const updateProfile = (field: keyof StudentProfile, value: string) => {
    setProfileState((prev) => {
      const next = { ...prev, [field]: value };
      cachedProfile = next;
      try {
        localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const setCode = (next: string) => {
    cachedProjectCode = next;
    try {
      localStorage.setItem(STORAGE_KEYS.code, next);
    } catch {
      // ignore storage errors
    }
    setCodeState(next);
  };

  const parsed = useMemo(() => evaluateProjectPython(code), [code]);

  // Evaluate the 5 Capstone Project Stages (Strictly based on Slides 21-23)
  const evaluation = useMemo(() => {
    const v = parsed.vars;

    // Stage 1: Smart Building Profile (building_name, system_status, floor_count, room_count)
    const buildingNameVal = v.building_name ?? v.nama_gedung;
    const hasBuildingName = typeof buildingNameVal === 'string' && buildingNameVal.trim().length > 0;
    const systemStatusVal = v.system_status ?? v.status_sistem;
    const hasSystemStatus = typeof systemStatusVal === 'string' && systemStatusVal.trim().length > 0;
    const floorCountVal = v.floor_count ?? v.total_floors ?? v.jumlah_lantai;
    const hasFloorCount = typeof floorCountVal === 'number' && floorCountVal > 0;
    const roomCountVal = v.room_count ?? v.total_rooms ?? v.jumlah_ruangan;
    const hasRoomCount = typeof roomCountVal === 'number' && roomCountVal > 0;
    const stage1Done = hasBuildingName && hasSystemStatus && hasFloorCount && hasRoomCount;

    // Stage 2: Sensors & AI Hardware Units (temperature_sensor, delivery_robots, security_cameras)
    const tempSensorVal = v.temperature_sensor ?? v.sensor_suhu;
    const hasTempSensor = typeof tempSensorVal === 'number' && tempSensorVal > 0;
    const deliveryRobotsVal = v.delivery_robots ?? v.delivery_robot_units ?? v.unit_robot_kurir;
    const hasDeliveryRobots = typeof deliveryRobotsVal === 'number' && deliveryRobotsVal > 0;
    const securityCamerasVal = v.security_cameras ?? v.kamera_keamanan;
    const hasSecurityCameras = typeof securityCamerasVal === 'number' && securityCamerasVal > 0;
    const stage2Done = hasTempSensor && hasDeliveryRobots && hasSecurityCameras;

    // Stage 3: Variable Operations & Calculations
    const buildingPowerVal = v.building_power ?? v.daya_gedung;
    const hasBuildingPower = typeof buildingPowerVal === 'number' && buildingPowerVal > 0;
    const aiServerPowerVal = v.ai_server_power ?? v.daya_server_ai;
    const hasAiServerPower = typeof aiServerPowerVal === 'number' && aiServerPowerVal > 0;
    const solarPowerVal = v.solar_backup_power ?? v.daya_cadangan_surya;
    const hasSolarPower = typeof solarPowerVal === 'number' && solarPowerVal > 0;

    const totalAiDevicesVal = v.total_ai_devices ?? v.total_perangkat_ai;
    const hasTotalAiDevices =
      typeof totalAiDevicesVal === 'number' &&
      hasDeliveryRobots &&
      hasSecurityCameras &&
      totalAiDevicesVal === Number(deliveryRobotsVal) + Number(securityCamerasVal);

    const totalPowerConsumptionVal = v.total_power_consumption ?? v.total_konsumsi_daya;
    const hasTotalPowerConsumption =
      typeof totalPowerConsumptionVal === 'number' &&
      hasBuildingPower &&
      hasAiServerPower &&
      totalPowerConsumptionVal === Number(buildingPowerVal) + Number(aiServerPowerVal);

    const totalEnergyCapacityVal = v.total_energy_capacity ?? v.total_kapasitas_energi;
    const hasTotalEnergyCapacity =
      typeof totalEnergyCapacityVal === 'number' &&
      hasTotalPowerConsumption &&
      hasSolarPower &&
      totalEnergyCapacityVal === Number(totalPowerConsumptionVal) + Number(solarPowerVal);

    const stage3Done =
      hasBuildingPower &&
      hasAiServerPower &&
      hasSolarPower &&
      hasTotalAiDevices &&
      hasTotalPowerConsumption &&
      hasTotalEnergyCapacity;

    // Stage 4: Variable Reassignment (system_status & temperature_sensor)
    const hasReassignedStatus = Boolean(parsed.reassignedVars.system_status || parsed.reassignedVars.status_sistem);
    const hasReassignedTemp = Boolean(parsed.reassignedVars.temperature_sensor || parsed.reassignedVars.sensor_suhu);
    const stage4Done = hasReassignedStatus && hasReassignedTemp;

    // Stage 5: Output Terminal print() & snake_case Validation
    const stage5Done = parsed.printOutputs.length >= 2 && parsed.syntaxErrors.length === 0 && Object.keys(v).length >= 8;

    const stages = [
      {
        index: 1,
        id: 'stage-1',
        num: 'Stage 1',
        title: 'Smart Building Profile',
        desc: 'Declare the following 4 basic variables to record the identity and capacity of the AI research building.',
        primaryBadge: 'First line syntax example: building_name = "AI Center Building"',
        varsList: [
          {
            name: 'building_name',
            type: 'String (Text)',
            hint: 'Assign a research building name in quotation marks, for example building_name = "AI Center Building"',
            ok: hasBuildingName,
          },
          {
            name: 'system_status',
            type: 'String (Text)',
            hint: 'Assign the initial operating state or status of the building system as a text string.',
            ok: hasSystemStatus,
          },
          {
            name: 'floor_count',
            type: 'Number (Integer)',
            hint: 'Assign the total number of building floors or levels as an integer.',
            ok: hasFloorCount,
          },
          {
            name: 'room_count',
            type: 'Number (Integer)',
            hint: 'Assign the total count of laboratory rooms in the building as an integer.',
            ok: hasRoomCount,
          },
        ],
        done: stage1Done,
        detailStatus: `${[hasBuildingName, hasSystemStatus, hasFloorCount, hasRoomCount].filter(Boolean).length}/4`,
      },
      {
        index: 2,
        id: 'stage-2',
        num: 'Stage 2',
        title: 'Sensors & AI Hardware Units',
        desc: 'Create 3 numeric variables to record the baseline room temperature and deployed smart device quantities.',
        primaryBadge: 'All 3 variables must be assigned numeric values greater than 0',
        varsList: [
          {
            name: 'temperature_sensor',
            type: 'Number (Numeric)',
            hint: 'Assign the baseline room temperature before the cooling system activates.',
            ok: hasTempSensor,
          },
          {
            name: 'delivery_robots',
            type: 'Number (Numeric)',
            hint: 'Assign the total quantity of document delivery robot units operating in the building.',
            ok: hasDeliveryRobots,
          },
          {
            name: 'security_cameras',
            type: 'Number (Numeric)',
            hint: 'Assign the total count of active smart surveillance cameras.',
            ok: hasSecurityCameras,
          },
        ],
        done: stage2Done,
        detailStatus: `${[hasTempSensor, hasDeliveryRobots, hasSecurityCameras].filter(Boolean).length}/3`,
      },
      {
        index: 3,
        id: 'stage-3',
        num: 'Stage 3',
        title: 'Variable Operations & Calculations',
        desc: 'Define values for 3 electrical power sources, then calculate 3 total variables by summing variable names.',
        primaryBadge: 'Reference and add variable names together instead of adding raw numbers',
        varsList: [
          {
            name: 'building_power',
            type: 'Number (Numeric)',
            hint: 'Assign a numeric value for the building main electrical load in Watts.',
            ok: hasBuildingPower,
          },
          {
            name: 'ai_server_power',
            type: 'Number (Numeric)',
            hint: 'Assign a numeric value for the AI server room electrical consumption in Watts.',
            ok: hasAiServerPower,
          },
          {
            name: 'solar_backup_power',
            type: 'Number (Numeric)',
            hint: 'Assign a numeric value for the rooftop solar backup power supply in Watts.',
            ok: hasSolarPower,
          },
          {
            name: 'total_ai_devices',
            type: 'Variable Calculation',
            hint: 'Compute total AI devices by summing delivery_robots and security_cameras.',
            ok: hasTotalAiDevices,
          },
          {
            name: 'total_power_consumption',
            type: 'Variable Calculation',
            hint: 'Compute total power consumption by summing building_power and ai_server_power.',
            ok: hasTotalPowerConsumption,
          },
          {
            name: 'total_energy_capacity',
            type: 'Variable Calculation',
            hint: 'Compute total energy capacity by summing total_power_consumption and solar_backup_power.',
            ok: hasTotalEnergyCapacity,
          },
        ],
        done: stage3Done,
        detailStatus: `${
          [
            hasBuildingPower,
            hasAiServerPower,
            hasSolarPower,
            hasTotalAiDevices,
            hasTotalPowerConsumption,
            hasTotalEnergyCapacity,
          ].filter(Boolean).length
        }/6`,
      },
      {
        index: 4,
        id: 'stage-4',
        num: 'Stage 4',
        title: 'Variable Value Reassignment',
        desc: 'Simulate peak operational hours by updating the system status to active and recording room cooling after smart AC turns on.',
        primaryBadge: 'Reassign variable names on new lines with updated operational values',
        varsList: [
          {
            name: 'system_status',
            type: 'Reassign (Text)',
            hint: 'Update system_status from initial "Standby" to a fully active operational condition such as "Active" or "Optimal".',
            ok: hasReassignedStatus,
          },
          {
            name: 'temperature_sensor',
            type: 'Reassign (Number)',
            hint: 'Initial room temperature was recorded at 25 degrees Celsius. Because smart cooling is now running, assign a new temperature number lower than before.',
            ok: hasReassignedTemp,
          },
        ],
        done: stage4Done,
        detailStatus: `${[hasReassignedStatus, hasReassignedTemp].filter(Boolean).length}/2`,
      },
      {
        index: 5,
        id: 'stage-5',
        num: 'Stage 5',
        title: 'Terminal print() & snake_case Validation',
        desc: 'Ensure all variable names follow Python identifier rules and display final results on the terminal screen.',
        primaryBadge: 'Must be free of SyntaxError & execute at least 2 print statements',
        varsList: [
          {
            name: 'Variable Naming Validation (snake_case)',
            type: 'snake_case Standard',
            hint: 'All variable names must use lowercase letters or underscores without spaces, hyphens, or leading digits.',
            ok: parsed.syntaxErrors.length === 0 && Object.keys(v).length > 0,
          },
          {
            name: `Terminal print() Statements (${parsed.printOutputs.length}/2 lines)`,
            type: 'Terminal Output',
            hint: 'Use the print function to display at least 2 project variable outputs on the terminal screen.',
            ok: parsed.printOutputs.length >= 2,
          },
        ],
        done: stage5Done,
        detailStatus: `${parsed.printOutputs.length}/2`,
      },
    ];

    const completedCount = stages.filter((s) => s.done).length;
    const scorePercent = completedCount * 20;

    return {
      stages,
      completedCount,
      scorePercent,
    };
  }, [parsed]);



  const visibleStages =
    activeStageFilter === 'all'
      ? evaluation.stages
      : evaluation.stages.filter((s) => s.index === activeStageFilter);

  // Generate Official A4 PDF Report for Microsoft Teams Submission
  const handleDownloadPdfReport = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 14;
    let y = 14;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageH - 16) {
        doc.addPage();
        y = 16;
      }
    };

    // 1. TOP NAVY HEADER BANNER
    doc.setFillColor(21, 40, 79);
    doc.roundedRect(margin, y, pageW - margin * 2, 26, 3, 3, 'F');

    doc.setTextColor(245, 158, 11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('OFFICIAL ACADEMIC ASSIGNMENT REPORT', margin + 5, y + 7);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text('INDEPENDENT PROJECT REPORT: PYTHON VARIABLES', margin + 5, y + 14.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(226, 232, 240);
    const nowStr = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });
    doc.text(`Project: Smart Campus AI Energy & Logistics Management System  |  Printed: ${nowStr}`, margin + 5, y + 21.5);

    y += 33;

    // 2. STUDENT IDENTITY & COURSE METADATA BOX
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, pageW - margin * 2, 34, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(21, 40, 79);
    doc.text('A. STUDENT IDENTITY & COURSE METADATA', margin + 4, y + 6.5);

    doc.setFontSize(8.5);
    const leftX = margin + 4;
    const rightX = pageW / 2 + 2;

    const drawField = (x: number, py: number, label: string, val: string) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text(label, x, py);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(val || '-', x + 34, py);
    };

    drawField(leftX, y + 13.5, 'Student Name', profile.fullName.trim() || '(Not provided)');
    drawField(leftX, y + 20, 'Student ID / NIM', profile.studentId.trim() || '(Not provided)');
    drawField(leftX, y + 26.5, 'Major / Program', profile.studyProgram.trim() || '(Not provided)');

    drawField(rightX, y + 13.5, 'Course Name', profile.courseName.trim() || 'Python Programming for AI');
    drawField(rightX, y + 20, 'Class / Semester', profile.className.trim() || '-');
    drawField(
      rightX,
      y + 26.5,
      'Completion Score',
      `${evaluation.scorePercent}% (${evaluation.completedCount}/5 Stages Completed)`
    );

    y += 42;

    // 3. PROJECT RUBRIC EVALUATION SUMMARY
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(21, 40, 79);
    doc.text('B. PROJECT RUBRIC EVALUATION SUMMARY', margin, y);
    y += 5;

    evaluation.stages.forEach((st) => {
      checkPageBreak(11);
      doc.setFillColor(st.done ? 236 : 248, st.done ? 253 : 250, st.done ? 245 : 252);
      doc.setDrawColor(st.done ? 110 : 203, st.done ? 231 : 213, st.done ? 183 : 225);
      doc.roundedRect(margin, y, pageW - margin * 2, 8.5, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      if (st.done) {
        doc.setTextColor(4, 120, 87);
        doc.text('[COMPLETE]', margin + 3, y + 5.5);
      } else {
        doc.setTextColor(180, 83, 9);
        doc.text('[PENDING]', margin + 3, y + 5.5);
      }

      doc.setTextColor(15, 23, 42);
      doc.text(`${st.num} ${st.title}`, margin + 22, y + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(st.detailStatus, pageW - margin - 20, y + 5.5);
      y += 10.5;
    });

    y += 9;

    // 4. PYTHON SOURCE CODE SECTION
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(21, 40, 79);
    doc.text('C. PYTHON SOURCE CODE (smart_campus_project.py)', margin, y);
    y += 5;

    const codeLines = code.split('\n');
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);

    codeLines.forEach((rawLine, idx) => {
      const wrapped = doc.splitTextToSize(rawLine || ' ', pageW - margin * 2 - 16);
      const blockH = Math.max(5, wrapped.length * 4.2 + 1);
      checkPageBreak(blockH);

      doc.setFillColor(15, 23, 42);
      doc.rect(margin, y, pageW - margin * 2, blockH, 'F');

      doc.setTextColor(148, 163, 184);
      doc.text(String(idx + 1).padStart(2, '0'), margin + 3, y + 3.8);

      doc.setTextColor(254, 243, 199);
      doc.text(wrapped, margin + 12, y + 3.8);
      y += blockH;
    });

    y += 10;

    // 5. TERMINAL OUTPUT & DIAGNOSTICS SECTION
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(21, 40, 79);
    doc.text('D. PYTHON TERMINAL EXECUTION OUTPUT', margin, y);
    y += 5;

    if (parsed.printOutputs.length === 0) {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y, pageW - margin * 2, 9, 1.5, 1.5, 'F');
      doc.setFont('courier', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('(No print statements executed yet)', margin + 4, y + 5.8);
      y += 12;
    } else {
      parsed.printOutputs.forEach((outLine) => {
        const wrappedOut = doc.splitTextToSize(`>>> ${outLine}`, pageW - margin * 2 - 8);
        const hOut = Math.max(6, wrappedOut.length * 4.5 + 1.5);
        checkPageBreak(hOut);
        doc.setFillColor(6, 78, 59);
        doc.rect(margin, y, pageW - margin * 2, hOut, 'F');
        doc.setFont('courier', 'bold');
        doc.setFontSize(8.2);
        doc.setTextColor(167, 243, 208);
        doc.text(wrappedOut, margin + 4, y + 4.3);
        y += hOut + 1;
      });
      y += 4;
    }

    if (parsed.syntaxErrors.length > 0) {
      checkPageBreak(15);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(190, 18, 60);
      doc.text(`Syntax Error Diagnostic Notes (${parsed.syntaxErrors.length} found)`, margin, y);
      y += 4.5;
      parsed.syntaxErrors.forEach((err) => {
        const wrappedErr = doc.splitTextToSize(`Line ${err.line}: ${err.reason}`, pageW - margin * 2 - 6);
        const hErr = Math.max(6, wrappedErr.length * 4.2 + 1);
        checkPageBreak(hErr);
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(190, 18, 60);
        doc.text(wrappedErr, margin + 2, y + 3.5);
        y += hErr;
      });
      y += 4;
    }

    y += 10;

    // 6. RAM VARIABLE INSPECTOR & REASSIGNMENT TABLE
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(21, 40, 79);
    doc.text('E. RAM VARIABLE INSPECTION & REASSIGNMENT HISTORY', margin, y);
    y += 5;

    const varEntries = Object.entries(parsed.vars);
    if (varEntries.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('No variables currently stored in RAM memory.', margin, y + 4);
      y += 10;
    } else {
      // Table Header
      doc.setFillColor(21, 40, 79);
      doc.rect(margin, y, pageW - margin * 2, 7.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(255, 255, 255);
      doc.text('Variable Name (snake_case)', margin + 3, y + 5);
      doc.text('Type', margin + 48, y + 5);
      doc.text('Final Value in RAM', margin + 68, y + 5);
      doc.text('Reassignment / Operation History', margin + 104, y + 5);
      y += 7.5;

      varEntries.forEach(([k, val], idx) => {
        const reassign = parsed.reassignedVars[k];
        const mathRec = parsed.mathRecords.find((m) => m.targetVar === k);
        let historyText = 'Initial assignment (=)';
        let historyColor: [number, number, number] = [100, 116, 139];

        if (reassign) {
          historyText = `Reassigned: ${String(reassign.firstVal)} -> ${String(reassign.newVal)}`;
          historyColor = [4, 120, 87];
        } else if (mathRec) {
          historyText = `Calculation: ${mathRec.expression}`;
          historyColor = [3, 105, 161];
        }

        // Wrap history column to maximum 74mm so it stays strictly within the 78mm cell boundary
        const wrappedHistory = doc.splitTextToSize(historyText, 74);
        const rowHeight = Math.max(7, wrappedHistory.length * 4.2 + 2.5);

        checkPageBreak(rowHeight + 2);

        doc.setFillColor(idx % 2 === 0 ? 248 : 241, idx % 2 === 0 ? 250 : 245, idx % 2 === 0 ? 252 : 249);
        doc.rect(margin, y, pageW - margin * 2, rowHeight, 'F');

        doc.setFont('courier', 'bold');
        doc.setFontSize(7.8);
        doc.setTextColor(15, 23, 42);
        doc.text(k, margin + 3, y + 4.8);

        doc.setFont('courier', 'normal');
        doc.setTextColor(71, 85, 105);
        doc.text(parsed.varTypes[k] || typeof val, margin + 48, y + 4.8);

        const formattedVal = typeof val === 'string' ? `"${val}"` : String(val);
        doc.setFont('courier', 'bold');
        doc.setTextColor(180, 83, 9);
        doc.text(formattedVal.slice(0, 18), margin + 68, y + 4.8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(historyColor[0], historyColor[1], historyColor[2]);
        doc.text(wrappedHistory, margin + 104, y + 4.8);

        y += rowHeight;
      });
    }

    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Independent Project: Python Variables • ${profile.fullName.trim() || 'Student'} (${
          profile.studentId.trim() || 'ID'
        }) • Page ${p} of ${totalPages}`,
        margin,
        pageH - 7
      );
    }

    const safeNim = (profile.studentId.trim() || 'ID').replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeName = (profile.fullName.trim() || 'Student').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Assignment_Report_Python_Variables_${safeNim}_${safeName}.pdf`;
    doc.save(fileName);

    setPdfFeedback(`PDF Report "${fileName}" has been successfully downloaded! Please save and submit this report.`);
    setTimeout(() => setPdfFeedback(null), 7000);
  };

  return (
    <div className="w-full space-y-3 relative z-10">
      {/* COMPACT TOP HEADER + STUDENT IDENTITY BAR */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-3.5 sm:p-4 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#15284f]">
            Independent Project{' '}
            <span className="text-[#f59e0b]">Smart Campus AI Energy &amp; Logistics Management System</span>
          </h2>

          {/* Action Buttons: Preview Report & Download PDF */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#15284f] border border-slate-300 font-mono text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#15284f]" />
              <span>Preview Report</span>
            </button>

            <button
              onClick={handleDownloadPdfReport}
              className="px-3.5 py-2 rounded-xl bg-[#15284f] hover:bg-[#1d366b] text-white font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

        {/* Student Identity Inputs */}
        <div className="pt-2.5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 mb-0.5">
                Full Student Name *
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => updateProfile('fullName', e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#15284f] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 mb-0.5">
                Student ID / NIM *
              </label>
              <input
                type="text"
                value={profile.studentId}
                onChange={(e) => updateProfile('studentId', e.target.value)}
                placeholder="e.g. 2026101045"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-[#15284f] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 mb-0.5">
                Major / Degree Program *
              </label>
              <input
                type="text"
                value={profile.studyProgram}
                onChange={(e) => updateProfile('studyProgram', e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#15284f] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 mb-0.5">
                Course Name *
              </label>
              <input
                type="text"
                value={profile.courseName}
                onChange={(e) => updateProfile('courseName', e.target.value)}
                placeholder="Python Programming for AI"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#15284f] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-600 mb-0.5">
                Class / Semester
              </label>
              <input
                type="text"
                value={profile.className}
                onChange={(e) => updateProfile('className', e.target.value)}
                placeholder="e.g. Class A / Semester 1"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#15284f] focus:bg-white"
              />
            </div>
          </div>
      </div>

      {/* Feedback Toast when PDF is downloaded */}
      {pdfFeedback && (
        <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-400 text-emerald-100 text-xs font-mono flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{pdfFeedback}</span>
          </div>
          <button onClick={() => setPdfFeedback(null)} className="text-emerald-300 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ====================================================================
          SIDE-BY-SIDE ERGONOMIC IDE WORKSPACE (NO UP-AND-DOWN SCROLLING!)
          LEFT (5 Cols): Soal & Instruksi 5 Tahap (Tetap di kiri sejajar mata)
          RIGHT (7 Cols): Python Compiler + Output Terminal + Monitor Variabel
         ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT PANE (5 COLUMNS): PROJECT OBJECTIVES & 5-STAGE INSTRUCTIONS */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-[#15284f] shadow-lg overflow-hidden flex flex-col">
          {/* Left Pane Header */}
          <div className="px-4 py-3 bg-[#15284f] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#f59e0b]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Project Objectives &amp; Instructions
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono text-[10px] font-black">
              {evaluation.completedCount}/5 Completed
            </span>
          </div>

          {/* Story Brief Box */}
          <div className="px-4 py-2.5 bg-slate-900 text-slate-200 border-b border-slate-800 text-[11px] leading-relaxed">
            <strong className="text-amber-300 font-mono uppercase text-[10px] block mb-0.5">
              Scenario: Smart Campus AI Command Center
            </strong>
            Read each objective below and type your code directly into the{' '}
            <strong className="text-white">Compiler on the right</strong>. Variable indicators will automatically
            turn <span className="text-emerald-400 font-bold">Green (✓)</span> once your code passes verification.
          </div>

          {/* Quick Stage Filter Tabs (Allows viewing All or focusing on 1 Stage) */}
          <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveStageFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition cursor-pointer shrink-0 ${
                activeStageFilter === 'all'
                  ? 'bg-[#15284f] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-[#15284f] border border-slate-200'
              }`}
            >
              All (5)
            </button>
            {evaluation.stages.map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveStageFilter(st.index)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 ${
                  activeStageFilter === st.index
                    ? 'bg-[#15284f] text-white shadow-xs'
                    : st.done
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-white text-slate-700 hover:text-[#15284f] border border-slate-200'
                }`}
              >
                <span>Stage {st.index}</span>
                {st.done && <span className="text-emerald-500 font-black">✓</span>}
              </button>
            ))}
          </div>

          {/* Independent Scrollable Stage Cards List (Eye-level next to the compiler!) */}
          <div className="p-3.5 space-y-2.5 max-h-[500px] overflow-y-auto">
            {visibleStages.map((st) => (
              <div
                key={st.id}
                className={`p-3 rounded-2xl border transition-all space-y-2 ${
                  st.done
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200/90 text-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${st.done ? 'text-emerald-600' : 'text-slate-300'}`}
                    />
                    <span className="px-2 py-0.5 rounded bg-[#15284f] text-white font-mono text-[10px] font-bold">
                      {st.num}
                    </span>
                    <h4 className="font-bold text-xs text-[#15284f]">{st.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#b45309] shrink-0">
                    {st.detailStatus}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug">{st.desc}</p>

                <div className="inline-block px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-[#b45309] font-mono text-[10px] font-bold">
                  {st.primaryBadge}
                </div>

                {/* Live Per-Variable Checklist + Conceptual Hints (No formula spoilers, no text truncation!) */}
                <div className="grid grid-cols-1 gap-1.5 pt-0.5">
                  {st.varsList.map((vItem, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-xl border transition-all space-y-1 ${
                        vItem.ok
                          ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                        <span className="font-bold text-[#15284f] break-all">
                          {vItem.ok ? '✓ ' : '○ '}
                          {vItem.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                            vItem.ok
                              ? 'bg-emerald-200/80 text-emerald-900'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {vItem.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug pl-3.5">
                        <strong className="text-[#b45309]">Hint:</strong> {vItem.hint}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANE (7 COLUMNS): LIVE PYTHON COMPILER + OUTPUT + MONITOR */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Python Compiler Editor Card */}
          <div className="bg-[#0b1329] rounded-3xl border-2 border-[#15284f] shadow-xl overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-[#15284f] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-mono text-xs font-bold text-white">smart_campus_project.py</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono text-cyan-300">
                  Variables: {Object.keys(parsed.vars).length}
                </span>
                <span className="text-[11px] font-mono text-amber-300">
                  Reassigned: {Object.keys(parsed.reassignedVars).length}
                </span>
                <button
                  onClick={() => setCode(DEFAULT_PROJECT_CODE)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] font-bold flex items-center gap-1 transition cursor-pointer border border-white/15"
                  title="Clear code editor to start over"
                >
                  <RotateCcw className="w-3 h-3 text-amber-300" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Code Editor Textarea with Line Numbers */}
            <div className="relative flex font-mono text-xs sm:text-sm bg-[#080e20] min-h-[290px] max-h-[340px] overflow-y-auto">
              <div className="py-3.5 px-2.5 text-right select-none bg-[#060a17] text-slate-500 border-r border-slate-800/80 font-mono text-xs leading-relaxed">
                {code.split('\n').map((_, idx) => (
                  <div key={idx}>{idx + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full p-3.5 bg-transparent text-amber-100 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y min-h-[290px]"
                placeholder="Review the instructions in the left panel, then type your Python variables here..."
              />
            </div>

            {/* Syntax Error Diagnostics */}
            {parsed.syntaxErrors.length > 0 && (
              <div className="px-4 py-2 bg-rose-950/90 border-t border-rose-500/50 text-rose-200 text-xs font-mono space-y-1">
                {parsed.syntaxErrors.map((err, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Line {err.line}:</strong> {err.reason}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Terminal Output Console */}
            <div className="p-3 bg-[#060a17] border-t border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                <span>Python Terminal Output (print results):</span>
                <span>{parsed.printOutputs.length} output lines</span>
              </div>

              {parsed.printOutputs.length === 0 ? (
                <div className="text-xs font-mono text-slate-500 italic">
                  No terminal output yet. Call print(...) in Stage 5.
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-xs text-emerald-400 space-y-0.5">
                  {parsed.printOutputs.map((out, i) => (
                    <div key={i}>&gt;&gt;&gt; {out}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Compact Tabbed Telemetry & RAM Inspector Card */}
          <div className="relative z-10 bg-white rounded-3xl border border-slate-200/90 p-3.5 shadow-md space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveRightTab('telemetry')}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] font-bold transition cursor-pointer ${
                    activeRightTab === 'telemetry'
                      ? 'bg-[#15284f] text-white'
                      : 'text-slate-600 hover:text-[#15284f]'
                  }`}
                >
                  Smart Campus AI Monitor
                </button>
                <button
                  onClick={() => setActiveRightTab('ram')}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] font-bold transition cursor-pointer ${
                    activeRightTab === 'ram'
                      ? 'bg-[#15284f] text-white'
                      : 'text-slate-600 hover:text-[#15284f]'
                  }`}
                >
                  RAM Memory Table ({Object.keys(parsed.vars).length})
                </button>
              </div>
            </div>

            {activeRightTab === 'telemetry' ? (
              <div className="rounded-2xl bg-gradient-to-r from-[#0b152c] via-[#112246] to-[#0c1933] border border-slate-800 p-3.5 text-white space-y-2.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[9px] text-sky-300 uppercase block">building_name</span>
                    <span className="text-white font-bold truncate block">
                      {parsed.vars.building_name ?? parsed.vars.nama_gedung ? String(parsed.vars.building_name ?? parsed.vars.nama_gedung) : '-'}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[9px] text-amber-300 uppercase block">system_status</span>
                    <span className="text-emerald-300 font-bold truncate block">
                      {parsed.vars.system_status ?? parsed.vars.status_sistem ? String(parsed.vars.system_status ?? parsed.vars.status_sistem) : 'OFFLINE'}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">Floors / Rooms</span>
                    <span className="text-amber-300 font-bold">
                      {parsed.vars.floor_count ?? parsed.vars.total_floors ?? parsed.vars.jumlah_lantai ?? 0} Fl / {parsed.vars.room_count ?? parsed.vars.total_rooms ?? parsed.vars.jumlah_ruangan ?? 0} Rm
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">temperature_sensor</span>
                    <span className="text-cyan-300 font-bold">{parsed.vars.temperature_sensor ?? parsed.vars.sensor_suhu ?? 0} °C</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">total_ai_devices</span>
                    <span className="text-emerald-300 font-bold">
                      {parsed.vars.total_ai_devices ?? parsed.vars.total_perangkat_ai ?? 0} Units
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">total_energy_capacity</span>
                    <span className="text-amber-300 font-bold">
                      {parsed.vars.total_energy_capacity ?? parsed.vars.total_kapasitas_energi ?? 0} Watts
                    </span>
                  </div>
                </div>

                {/* Reassignment Tracker Bar */}
                {Object.keys(parsed.reassignedVars).length > 0 && (
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="text-amber-300 font-bold">Reassigned:</span>
                    {Object.entries(parsed.reassignedVars).map(([k, v]) => (
                      <span
                        key={k}
                        className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-white"
                      >
                        <strong>{k}</strong>: <span className="line-through text-rose-300">{String(v.firstVal)}</span> ➔{' '}
                        <span className="text-emerald-300 font-bold">{String(v.newVal)}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="max-h-[140px] overflow-y-auto rounded-2xl border border-slate-200 divide-y divide-slate-100">
                {Object.entries(parsed.vars).length === 0 ? (
                  <div className="p-3 text-center text-xs font-mono text-slate-400 italic">
                    No variables currently stored in RAM memory.
                  </div>
                ) : (
                  Object.entries(parsed.vars).map(([k, val]) => (
                    <div key={k} className="px-3 py-1.5 flex items-center justify-between text-xs font-mono bg-slate-50/60">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3 text-[#15284f]" />
                        <span className="font-bold text-[#15284f]">{k}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[9px]">
                          {parsed.varTypes[k] || typeof val}
                        </span>
                      </div>
                      <span className="font-bold text-[#b45309]">
                        {typeof val === 'string' ? `"${val}"` : String(val)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ON-SCREEN REPORT PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-2 border-[#15284f] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#15284f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Official Assignment PDF Report Preview
                </span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-800">
              <div className="p-4 rounded-2xl bg-[#15284f] text-white space-y-1">
                <div className="text-[10px] font-mono text-amber-300 font-bold uppercase">
                  OFFICIAL ACADEMIC ASSIGNMENT REPORT
                </div>
                <div className="text-base font-extrabold">
                  INDEPENDENT PROJECT REPORT: PYTHON VARIABLES
                </div>
                <div className="text-[11px] text-slate-300">
                  Project: Smart Campus AI Energy &amp; Logistics Management System
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">Student Name:</span>
                  <strong className="text-slate-900">{profile.fullName || '(Not provided)'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">Student ID / NIM:</span>
                  <strong className="font-mono text-slate-900">{profile.studentId || '(Not provided)'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">Major / Program:</span>
                  <strong className="text-slate-900">{profile.studyProgram || '(Not provided)'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">Course Name:</span>
                  <strong className="text-slate-900">{profile.courseName || '-'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">Class / Semester:</span>
                  <strong className="text-slate-900">{profile.className || '-'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">Project Completion Score:</span>
                  <strong className="text-emerald-700 font-mono">
                    {evaluation.scorePercent}% ({evaluation.completedCount}/5 Stages Completed)
                  </strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-mono font-bold text-[#15284f] uppercase text-[11px]">
                  Python Source Code (smart_campus_project.py):
                </h4>
                <pre className="p-3.5 rounded-2xl bg-slate-950 text-amber-100 font-mono text-xs overflow-x-auto leading-relaxed">
                  {code}
                </pre>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-mono font-bold text-[#15284f] uppercase text-[11px]">
                  Terminal Output (print):
                </h4>
                <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-200 font-mono text-xs space-y-1">
                  {parsed.printOutputs.length === 0 ? (
                    <span className="italic text-slate-400">(No print statements executed yet)</span>
                  ) : (
                    parsed.printOutputs.map((o, idx) => <div key={idx}>&gt;&gt;&gt; {o}</div>)
                  )}
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownloadPdfReport();
                  setShowPreviewModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#15284f] text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#f59e0b]" />
                <span>Download PDF Report Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
