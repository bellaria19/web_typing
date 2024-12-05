import { TestMode, Difficulty } from "@/types/typing";
import { create } from "zustand";

interface TypingState {
  // 타이핑 진행 상태
  text: string;
  currentIndex: number;
  isFinished: boolean;
  isStarted: boolean;

  // 시간 측정
  startTime: number | null;
  endTime: number | null;

  // 성능 측정
  mistakes: number;
  wpm: number;
  cpm: number;
  accuracy: number;

  // 타이핑 설정
  difficulty: Difficulty;
  mode: TestMode;
  wordCount: number;
  timeLimit: number;

  // 기록 및 통계
  rawHistory: string[];
  errorHistory: { count: number; words: string[] }[];
  keypressTimings: { spacing: number[]; duration: number[] };

  setText: (text: string) => void;
  //   setCurrentIndex: (index: number) => void;
  //   setIsFinished: (isFinished: boolean) => void;
  //   setIsStarted: (isStarted: boolean) => void;

  //   setStartTime: (startTime: number | null) => void;
  //   setEndTime: (endTime: number | null) => void;

  //   setMistakes: (mistakes: number) => void;
  //   setWpm: (wpm: number) => void;
  //   setCpm: (cpm: number) => void;
  //   setAccuracy: (accuracy: number) => void;

  //   setWordCount: (wordCount: number) => void;

  //   setRawHistory: (rawHistory: string[]) => void;
  //   setErrorHistory: (errorHistory: { count: number; words: string[] }[]) => void;

  start: () => void;
  reset: () => void;

  handleInput: (input: string) => void;
  calculate: () => void;

  loadContent: () => void;
  saveRecord: () => void;

  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: TestMode) => void;
  setTimeLimit: (timeLimit: number) => void;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  text: "",
  currentIndex: 0,
  isFinished: false,
  isStarted: false,
  startTime: null,
  endTime: null,
  mistakes: 0,
  wpm: 0,
  cpm: 0,
  accuracy: 0,
  difficulty: "normal",
  mode: "words",
  wordCount: 0,
  timeLimit: 15,
  rawHistory: [],
  errorHistory: [],
  keypressTimings: { spacing: [], duration: [] },

  setText: (text: string) => set({ text }),

  start: () => set({ isStarted: true, startTime: Date.now() }),

  handleInput: (input: string) => {
    const { text, currentIndex } = get();
    const currentChar = text[currentIndex];
    if (input === currentChar) {
      set({ currentIndex: currentIndex + 1 });
    } else {
      set({ mistakes: get().mistakes + 1 });
      set({
        errorHistory: [...get().errorHistory, { count: 1, words: [input] }],
      });
    }
  },

  reset: () => {
    set({
      text: "",
      currentIndex: 0,
      isFinished: false,
    });
  },

  calculate: () => {
    return;
  },

  loadContent: () => {
    return;
  },

  saveRecord: () => {
    return;
  },

  setDifficulty: (difficulty: Difficulty) => {
    return;
  },
  setMode: (mode: TestMode) => {
    return;
  },
  setTimeLimit: (timeLimit: number) => {
    return;
  },
}));
