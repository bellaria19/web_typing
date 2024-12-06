import { useTypingStore } from "@/store/typingStore";
import { useEffect, useRef } from "react";
import { TypingArea } from "@/styles/typing.styles";

const TestInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isFinished, start, handleInput } = useTypingStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      if (e.key.length === 1) {
        e.preventDefault();
        start();
        handleInput(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, start, isFinished]);

  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };

    focusInput();
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  return <TypingArea ref={inputRef} />;
};

export default TestInput;
