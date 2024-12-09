import { Char, TextWrapper, LineWrapper } from "@/styles/typing.styles";
import { useTypingStore } from "@/store/typingStore";
import { useEffect, useState } from "react";

const TextDisplay = () => {
  const { text, currentIndex, errorIndices } = useTypingStore();
  const [isFocused, setIsFocused] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    // 텍스트를 단어로 분할
    const words = text.split(" ");
    const textLines: string[] = [];

    // 5개 단어씩 묶어서 한 줄로 만듦
    for (let i = 0; i < words.length; i += 5) {
      const line = words.slice(i, i + 5).join(" ");
      textLines.push(line);
    }

    setLines(textLines);
    setVisibleLines(textLines.slice(0, 2));
  }, [text]);

  useEffect(() => {
    let charCount = 0;
    let lineIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length + 1 > currentIndex) {
        lineIndex = i;
        break;
      }
      charCount += lines[i].length + 1;
    }

    if (lineIndex !== currentLineIndex) {
      setCurrentLineIndex(lineIndex);
      setVisibleLines(lines.slice(lineIndex, lineIndex + 2));
    }
  }, [currentIndex, lines, currentLineIndex]);

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

  let charCount = 0;
  for (let i = 0; i < currentLineIndex; i++) {
    charCount += lines[i].length + 1;
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
            const currentCharIndex = charCount + i;
            const isCurrentLine = idx === 0;

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
