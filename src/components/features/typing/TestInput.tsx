import { useTypingStore } from "@/store/typingStore";
import { useEffect, useRef, useState } from "react";
import { TypingArea } from "@/styles/typing.styles";

const TestInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { isFinished, start, handleInput } = useTypingStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      if (!isFocused) {
        focusInput();
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        start();
        handleInput(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, start, isFinished, isFocused]);

  const focusInput = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  useEffect(() => {
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  return (
    <>
      <TypingArea ref={inputRef} onBlur={() => setIsFocused(false)} />
    </>
  );
};

export default TestInput;
