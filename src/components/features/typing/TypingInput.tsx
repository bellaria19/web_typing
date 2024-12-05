import { useTypingStore } from "@/store/typingStore";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Input = styled.textarea`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
`;

const TypingInput = () => {
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

  return <Input ref={inputRef} />;
};

export default TypingInput;
