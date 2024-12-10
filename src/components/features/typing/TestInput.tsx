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

  // 입력 필드에 포커스를 주는 함수 (블러 상태가 아닐 때만 동작)
  const focusInput = useCallback(() => {
    if (!isBlurred) {
      inputRef.current?.focus();
      setIsFocused(true);
    }
  }, [isBlurred]);

  // 언어 설정에 따른 IME(입력기) 설정
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.lang = i18n.language;
      if (i18n.language === "ko") {
        // 한글 입력을 위한 IME 활성화
        inputRef.current.setAttribute("inputmode", "text");
        inputRef.current.setAttribute("ime-mode", "active");
      } else {
        // 영문 입력을 위한 IME 비활성화
        inputRef.current.setAttribute("inputmode", "text");
        inputRef.current.setAttribute("ime-mode", "disabled");
      }
    }
  }, [i18n.language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 테스트가 완료되었거나 블러 상태면 입력 무시
      if (isFinished || isBlurred) return;

      // 포커스가 없는 경우 포커스 설정
      if (!isFocused) {
        focusInput();
        return;
      }

      // 단일 문자 입력에 대한 처리
      if (e.key.length === 1) {
        e.preventDefault(); // 기본 입력 동작 방지
        start(); // 타이핑 테스트 시작
        handleInput(e.key); // 입력된 키 처리
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, start, isFinished, isFocused, isBlurred, focusInput]);

  // 클릭 이벤트에 대한 포커스 처리
  useEffect(() => {
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, [isBlurred, focusInput]);

  return <TypingArea ref={inputRef} onBlur={() => setIsFocused(false)} />;
};

export default TestInput;
