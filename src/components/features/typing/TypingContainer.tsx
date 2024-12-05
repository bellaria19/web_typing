import { useEffect, useCallback } from "react";
import { Container } from "@/styles/typing.styles";
import TextDisplay from "./TextDisplay";
import TypingInput from "./TypingInput";
import { useTypingStore } from "@/store/typingStore";
import { useSettingStore } from "@/store/settingStore";

const TypingContainer = () => {
  const { loadContent, reset, isFinished, saveRecord } = useTypingStore();
  const { settings } = useSettingStore();

  useEffect(() => {
    loadContent();
    return () => reset();
  }, [loadContent, reset]);

  useEffect(() => {
    if (isFinished) {
      saveRecord();
    }
  }, [isFinished, saveRecord]);

  //   const handleRestart = useCallback(() => {
  //     loadContent();
  //   }, [loadContent]);

  //   useEffect(() => {
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       if (!isFinished) return;

  //       const quickRestart = settings.behavior.quickRestart;
  //       if (
  //         (quickRestart === "tab" && e.key === "Tab") ||
  //         (quickRestart === "esc" && e.key === "Escape") ||
  //         (quickRestart === "enter" && e.key === "Enter")
  //       ) {
  //         e.preventDefault();
  //         handleRestart();
  //       }
  //     };

  //     window.addEventListener("keydown", handleKeyDown);
  //     return () => window.removeEventListener("keydown", handleKeyDown);
  //   }, [isFinished, settings.behavior.quickRestart, handleRestart]);

  return (
    <Container>
      <TextDisplay />
      <TypingInput />
    </Container>
  );
};

export default TypingContainer;
