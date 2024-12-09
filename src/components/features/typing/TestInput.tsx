import { useTypingStore } from "@/store/typingStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { TypingArea } from "@/styles/typing.styles";
import { useTranslation } from "react-i18next";

interface TestInputProps {
  isBlurred: boolean;
}

const TestInput = ({ isBlurred }: TestInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { isFinished, start, handleInput } = useTypingStore();
  const { i18n } = useTranslation();

  const focusInput = useCallback(() => {
    if (!isBlurred) {
      inputRef.current?.focus();
      setIsFocused(true);
    }
  }, [isBlurred]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.lang = i18n.language;
      if (i18n.language === "ko") {
        inputRef.current.setAttribute("inputmode", "text");
        inputRef.current.setAttribute("ime-mode", "active");
      } else {
        inputRef.current.setAttribute("inputmode", "text");
        inputRef.current.setAttribute("ime-mode", "disabled");
      }
    }
  }, [i18n.language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || isBlurred) return;

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
  }, [handleInput, start, isFinished, isFocused, isBlurred, focusInput]);

  useEffect(() => {
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, [isBlurred, focusInput]);

  return <TypingArea ref={inputRef} onBlur={() => setIsFocused(false)} />;
};

export default TestInput;
