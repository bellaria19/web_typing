import { useEffect } from "react";
import { useTypingStore } from "@/store/typingStore";
import styled from "styled-components";

const TextContainer = styled.div`
  font-size: 1.5rem;
  line-height: 1.5;
  white-space: pre-wrap;
  margin: 2rem 0;
`;

const Character = styled.span<{
  $status: "current" | "correct" | "incorrect" | "waiting";
}>`
  color: ${({ theme, $status }) => {
    switch ($status) {
      case "current":
        return theme.mainColor;
      case "correct":
        return theme.textColor;
      case "incorrect":
        return "red";
      default:
        return theme.subColor;
    }
  }};
  background-color: ${({ $status }) =>
    $status === "current" ? "rgba(255, 255, 255, 0.1)" : "transparent"};
`;

const TypingText = () => {
  const { text, currentIndex, handleInput } = useTypingStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        handleInput(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput]);

  return (
    <TextContainer>
      {text.split("").map((char, index) => (
        <Character
          key={index}
          $status={
            index === currentIndex
              ? "current"
              : index < currentIndex
              ? "correct"
              : "waiting"
          }
        >
          {char}
        </Character>
      ))}
    </TextContainer>
  );
};

export default TypingText;
