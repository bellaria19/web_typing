import { Char, TextWrapper, LineWrapper } from "@/styles/typing.styles";
import { useTypingStore } from "@/store/typingStore";
import { useEffect, useState } from "react";

const TextDisplay = () => {
  const { text, currentIndex, errorIndices, mode } = useTypingStore();
  const [isFocused, setIsFocused] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "word" || mode === "time") {
      const words = text.split(" ");
      const textLines: string[] = [];
      for (let i = 0; i < words.length; i += 5) {
        const line = words.slice(i, i + 5).join(" ");
        textLines.push(line);
      }
      setLines(textLines);
      setVisibleLines(textLines.slice(0, 2));
    } else if (mode === "short" || mode === "long") {
      const textLines = text.split("\n");
      setLines(textLines);
      setVisibleLines(textLines.slice(0, 2));
    }
  }, [text, mode]);

  useEffect(() => {
    let charCount = 0;
    let lineIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length;
      if (charCount + lineLength >= currentIndex) {
        lineIndex = i;
        break;
      }
      charCount += lineLength + (mode === "word" || mode === "time" ? 1 : 0);
    }

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
