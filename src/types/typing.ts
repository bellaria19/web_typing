export type TestMode = "time" | "word" | "short" | "long";
export type Difficulty = "normal" | "expert" | "master";

export interface Quote {
  id: number;
  text: string;
  author: string;
  length: number;
}

export interface TypingText {
  id: number;
  content: string;
  description: string;
  category: string;
  difficulty: Difficulty;
}

export interface TypingRecord {
  id: number;
  user_id: string;
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  created_at: string;
}

export interface TypingWord {
  id: number;
  english_word: string;
  korean_word: string;
}

export interface TypingShort {
  id: number;
  content: string;
  description: string;
  category: string;
}

export interface TypingLong {
  id: number;
  content: string;
  description: string;
  category: string;
}

export interface TypingRecord {
  text: string;
  mistakes: number;
  wpm: number;
  cpm: number;
  accuracy: number;
}
