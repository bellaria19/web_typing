import Hangul from "hangul-js";
// import Config from "../config";
import * as TestInput from "@/types/test-input";
import { typingService } from "@/services/typingService";
import {
  TestMode,
  Difficulty,
  TypingRecord,
  TypingWord,
  TypingShort,
  TypingLong,
} from "@/types/typing";
import { create } from "zustand";

type CharCount = {
  spaces: number;
  correctWordChars: number;
  allCorrectChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  correctSpaces: number;
};

// type Stats = {
//   wpm: number;
//   wpmRaw: number;
//   acc: number;
//   correctChars: number;
//   incorrectChars: number;
//   missedChars: number;
//   extraChars: number;
//   allChars: number;
//   time: number;
//   spaces: number;
//   correctSpaces: number;
// };

const config = {
  mode: "word",
};

interface TypingConfig {
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
  time: number;

  correctChars: number;
  incorrectChars: number;
  missedChars: number;
  extraChars: number;
  allChars: number;
  spaces: number;
  correctSpaces: number;

  // 기록 및 통계
  rawHistory: string[];
  errorIndices: number[];
  keypressTimings: { spacing: number[]; duration: number[] };

  setText: (text: string) => void;

  start: () => void;
  reset: () => void;

  handleInput: (input: string) => void;
  calculate: () => void;

  loadContent: (language: string) => void;
  saveRecord: () => void;

  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: TestMode) => void;
  setTimeLimit: (timeLimit: number) => void;
}

export const useTypingStore = create<TypingConfig>((set, get) => ({
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
  mode: "word",
  wordCount: 200,
  time: 15,
  correctChars: 0,
  incorrectChars: 0,
  missedChars: 0,
  extraChars: 0,
  allChars: 0,
  spaces: 0,
  correctSpaces: 0,
  rawHistory: [],
  errorIndices: [],
  keypressTimings: { spacing: [], duration: [] },

  setText: (text: string) => set({ text }),

  start: () => set({ isStarted: true, startTime: Date.now() }),

  handleInput: (input: string) => {
    const { text, currentIndex, isStarted } = get();

    if (!isStarted) {
      set({ isStarted: true, startTime: Date.now() });
    }

    if (text[currentIndex] !== input) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        errorIndices: [...state.errorIndices, currentIndex],
      }));
    }

    if (currentIndex + 1 >= text.length) {
      set({
        isFinished: true,
        endTime: Date.now(),
      });
    } else {
      set((state) => ({
        currentIndex: state.currentIndex + 1,
      }));
    }
  },

  reset: () => {
    set({
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
      rawHistory: [],
      errorIndices: [],
      keypressTimings: { spacing: [], duration: [] },
    });
  },

  calculate: () => {
    const { text, currentIndex, startTime, errorIndices } = get();
    if (!startTime) return;

    const currentTime = Date.now();
    const testTime = (currentTime - startTime) / 1000 / 60; // 분 단위로 변환

    const chars = countChars(text, currentIndex, errorIndices);

    const wpm = Math.round(
      ((chars.correctWordChars + chars.correctSpaces) * (1 / testTime)) / 5
    );

    const cpm = Math.round(
      (chars.allCorrectChars + chars.spaces) * (1 / testTime)
    );

    const accuracy =
      Math.round(
        ((chars.allCorrectChars + chars.correctSpaces) /
          (currentIndex + chars.spaces)) *
          100
      ) || 0;

    set({ wpm, cpm, accuracy });
  },

  loadContent: async (language: string) => {
    const { mode, wordCount } = get();
    try {
      let text = "";
      let data: TypingWord[] | TypingShort[] | TypingLong[] = [];

      switch (mode) {
        case "word":
          data = await typingService.loadWords(wordCount);
          console.log("data", data);
          text = (data as TypingWord[])
            .map((word) =>
              language === "ko" ? word.korean_word : word.english_word
            )
            .join(" ");
          break;
        case "short":
          data = await typingService.loadShorts(20);
          text = (data as TypingShort[])
            .map((short) => short.content)
            .join("\n");
          break;
        case "long":
          data = await typingService.loadLongs(10);
          text = (data as TypingLong[]).map((long) => long.content).join("\n");
          break;
      }

      if (!text) {
        throw new Error("텍스트를 생성할 수 없습니다.");
      }

      set({
        text,
        currentIndex: 0,
        isFinished: false,
        isStarted: false,
        startTime: null,
        endTime: null,
        mistakes: 0,
        wpm: 0,
        cpm: 0,
        accuracy: 0,
        rawHistory: [],
        errorIndices: [],
        keypressTimings: { spacing: [], duration: [] },
      });

      console.log("타이핑 상태 초기화 완료");
      return true;
    } catch (error) {
      console.error("타이핑 콘텐츠 로딩 실패:", error);
      set({ text: "데이터를 불러오는데실패했습니다. 다시 시도해주세요." });
      return false;
    }
  },

  saveRecord: async () => {
    const { text, mistakes, wpm, cpm, accuracy } = get();

    try {
      await typingService.saveRecord({
        text,
        mistakes,
        wpm,
        cpm,
        accuracy,
      } as TypingRecord);
    } catch (error) {
      console.error(error);
    }
  },

  setDifficulty: (difficulty: Difficulty) => {
    set({ difficulty });
  },
  setMode: (mode: TestMode) => {
    set({ mode });
  },
  setTimeLimit: (timeLimit: number) => {
    set({ time: timeLimit });
  },
}));

export function calculateAccuracy(): number {
  const acc =
    (TestInput.accuracy.correct /
      (TestInput.accuracy.correct + TestInput.accuracy.incorrect)) *
    100;
  return isNaN(acc) ? 100 : acc;
}

const countChars = (
  text: string,
  currentIndex: number,
  errorIndices: number[]
): CharCount => {
  let correctWordChars = 0;
  let correctChars = 0;
  let incorrectChars = 0;
  const extraChars = 0;
  let missedChars = 0;
  let spaces = 0;
  let correctSpaces = 0;

  const words = text.split(" ");
  let charCount = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const containsKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(word);
    const wordLength = containsKorean
      ? Hangul.disassemble(word).length
      : word.length;

    if (charCount + wordLength <= currentIndex) {
      const hasErrors = errorIndices.some(
        (idx) => idx >= charCount && idx < charCount + wordLength
      );

      if (!hasErrors) {
        correctWordChars += wordLength;
        correctChars += wordLength;
        if (i < words.length - 1) correctSpaces++;
      } else {
        for (let c = 0; c < wordLength; c++) {
          if (errorIndices.includes(charCount + c)) {
            incorrectChars++;
          } else {
            correctChars++;
          }
        }
      }
    } else if (charCount < currentIndex) {
      const inputPart = currentIndex - charCount;
      for (let c = 0; c < inputPart; c++) {
        if (errorIndices.includes(charCount + c)) {
          incorrectChars++;
        } else {
          correctChars++;
        }
      }
      missedChars += wordLength - inputPart;
    }

    if (i < words.length - 1) spaces++;
    charCount += wordLength + 1;
  }

  return {
    spaces,
    correctWordChars,
    allCorrectChars: correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    correctSpaces,
  };
};

export function calculateTestSeconds(now?: number): number {
  if (now === undefined) {
    return (end - start) / 1000;
  } else {
    return (now - start) / 1000;
  }
}

export function calculateAfkSeconds(testSeconds: number): number {
  let extraAfk = 0;
  if (testSeconds !== undefined) {
    if (config.mode === "time") {
      extraAfk =
        Math.round(testSeconds) - TestInput.keypressCountHistory.length;
    } else {
      extraAfk = Math.ceil(testSeconds) - TestInput.keypressCountHistory.length;
    }
    if (extraAfk < 0) extraAfk = 0;
    // console.log("-- extra afk debug");
    // console.log("should be " + Math.ceil(testSeconds));
    // console.log(keypressPerSecond.length);
    // console.log(
    //   `gonna add extra ${extraAfk} seconds of afk because of no keypress data`
    // );
  }
  const ret = TestInput.afkHistory.filter((afk) => afk).length;
  return ret + extraAfk;
}

export let start: number, end: number;
export let start2: number, end2: number;
export let start3: number, end3: number;

export function setEnd(e: number): void {
  end = e;
  end2 = Date.now();
  end3 = new Date().getTime();
}

export function setStart(s: number): void {
  start = s;
  start2 = Date.now();
  start3 = new Date().getTime();
}
