import { Char, TextWrapper, LineWrapper } from "@/styles/typing.styles";
import { useTypingStore } from "@/store/typingStore";
import { useEffect, useState } from "react";

const TextDisplay = () => {
  const { text, currentIndex, errorIndices, mode } = useTypingStore();
  const [isFocused, setIsFocused] = useState(false);
  // 전체 텍스트를 라인 단위로 분리하여 저장
  const [lines, setLines] = useState<string[]>([]);
  // 현재 타이핑 중인 라인의 인덱스
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  // 화면에 표시될 라인들 (현재 라인 + 다음 라인)
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  // 모드에 따른 텍스트 라인 분할 처리
  useEffect(() => {
    if (mode === "word" || mode === "time") {
      // 단어 모드: 5개 단어씩 묶어서 라인 생성
      const words = text.split(" ");
      const textLines: string[] = [];
      for (let i = 0; i < words.length; i += 5) {
        const line = words.slice(i, i + 5).join(" ");
        textLines.push(line);
      }
      setLines(textLines);
      setVisibleLines(textLines.slice(0, 2));
    } else if (mode === "short" || mode === "long") {
      // 문장 모드: 줄바꿈 기준으로 라인 분할
      const textLines = text.split("\n");
      setLines(textLines);
      setVisibleLines(textLines.slice(0, 2));
    }
  }, [text, mode]);

  // 현재 타이핑 위치에 따른 라인 업데이트
  useEffect(() => {
    let charCount = 0;
    let lineIndex = 0;

    // 현재 타이핑 위치가 속한 라인 찾기
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length;
      if (charCount + lineLength >= currentIndex) {
        lineIndex = i;
        break;
      }
      charCount += lineLength + (mode === "word" || mode === "time" ? 1 : 0);
    }

    // 라인이 변경되었을 때 visible 라인 업데이트
    if (lineIndex !== currentLineIndex) {
      setCurrentLineIndex(lineIndex);
      setVisibleLines(lines.slice(lineIndex, lineIndex + 2));
    }
  }, [currentIndex, lines, currentLineIndex, mode]);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleKeyDown = () => setIsFocused(true);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 현재 라인 이전까지의 전체 문자 수 계산
  let displayCharCount = 0;
  for (let i = 0; i < currentLineIndex; i++) {
    displayCharCount +=
      lines[i].length + (mode === "word" || mode === "time" ? 1 : 0);
  }

  return (
    <TextWrapper $isFocused={isFocused}>
      {visibleLines.map((line, idx) => (
        <LineWrapper
          key={currentLineIndex + idx}
          $isNext={idx === 1}
          $isVisible={true}
        >
          {line.split("").map((char, i) => {
            const currentCharIndex = displayCharCount + i;
            const isCurrentLine = idx === 0;

            // 문자의 상태 결정
            // - current: 현재 타이핑할 문자
            // - correct: 올바르게 입력된 문자
            // - incorrect: 잘못 입력된 문자
            // - waiting: 아직 입력하지 않은 문자
            let state: "current" | "correct" | "incorrect" | "waiting" =
              "waiting";

            if (isCurrentLine) {
              if (currentCharIndex === currentIndex) {
                state = "current";
              } else if (currentCharIndex < currentIndex) {
                state = errorIndices.includes(currentCharIndex)
                  ? "incorrect"
                  : "correct";
              }
            }

            return (
              <Char key={currentCharIndex} $state={state}>
                {char}
              </Char>
            );
          })}
        </LineWrapper>
      ))}
    </TextWrapper>
  );
};

export default TextDisplay;
