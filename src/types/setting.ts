export type TypingDifficulty = "normal" | "expert" | "master";
export type QuickRestartType = "off" | "tab" | "esc" | "enter";
export type ConfidenceModeType = "off" | "on" | "max";
export type IndicateTyposType = "off" | "below" | "replace";
export type CaretStyleType = "off" | "line" | "block" | "outline" | "underline";
export type ClickSoundType = "off" | "click" | "beep" | "pop";
export type ErrorSoundType = "off" | "beep" | "bump";

export interface TypingSettings {
  behavior: {
    difficulty: TypingDifficulty;
    quickRestart: QuickRestartType;
    blindMode: boolean;
    confidenceMode: ConfidenceModeType;
    indicateTypos: IndicateTyposType;
  };
  appearance: {
    fontSize: number;
    smoothCaret: boolean;
    caretStyle: CaretStyleType;
  };
  sound: {
    volume: number;
    clickSound: ClickSoundType;
    errorSound: ErrorSoundType;
  };
}
