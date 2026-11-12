export type StoryThread = 'python' | 'ai' | 'convergence' | 'neutral';
export type PresentationTheme = 'kinetic' | 'focus' | 'slideegg';

export type SlideLayout =
  | 'vscode-macbook'
  | 'hook-question'
  | 'split-visual'
  | 'flags-logos'
  | 'minimal-timeline'
  | 'ranking-chart'
  | 'python-zoom-reveal'
  | 'code-comparison'
  | 'origin-story'
  | 'growth-curve'
  | 'three-column-compare'
  | 'ai-definition'
  | 'ai-timeline'
  | 'old-vs-ai'
  | 'three-ingredients'
  | 'big-reveal'
  | 'why-python-grid'
  | 'official-title'
  | 'agenda-slide'
  | 'before-tools-question'
  | 'toolkit-flow'
  | 'vectorization-speed'
  | 'live-demo'
  | 'exploding-transition'
  | 'variables-box'
  | 'variables-lunchbox-drag'
  | 'variables-multi-box-lab'
  | 'variables-story-practice'
  | 'data-types'
  | 'print-terminal'
  | 'if-else-branch'
  | 'for-loop-cycle'
  | 'functions-machine'
  | 'revisit-demo-annotated'
  | 'your-turn'
  | 'key-takeaways'
  | 'lecture-conclusion-recap'
  | 'homework-next-week'
  | 'closing-qa';

export interface SpeakerNotes {
  timing: string;
  hook: string;
  speakingPoints: string[];
  pedagogicalTip: string;
}

export interface SlideData {
  id: number;
  sectionId: string;
  sectionName: string;
  title: string;
  subtitle?: string;
  caption?: string;
  thread: StoryThread;
  layout: SlideLayout;
  bullets?: string[];
  codeSnippets?: {
    language: string;
    label?: string;
    code: string;
    output?: string;
    highlightLines?: number[];
  }[];
  visualData?: Record<string, any>;
  speakerNotes: SpeakerNotes;
  customImage?: string;
}
