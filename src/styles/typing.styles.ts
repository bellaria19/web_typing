import styled from "styled-components";
import { RestartAlt } from "styled-icons/material";

export const Container = styled.div`
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SelectorContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.subColor};
  border-radius: 4px;
  min-width: 150px;
`;

export const DisplayBox = styled.div`
  border: 1px solid ${({ theme }) => theme.subColor};
  border-radius: 4px;
  padding: 1rem;
  min-width: 150px;
  height: 100px;
`;

export const DisplayLabel = styled.div`
  color: ${({ theme }) => theme.subColor};
  font-size: 1rem;
  font-weight: bold;
`;

export const DisplayValue = styled.div`
  color: ${({ theme }) => theme.mainColor};
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
`;

export const SelectorButton = styled.button<{ $isSelected: boolean }>`
  padding: 0.5rem 1rem;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.mainColor : theme.subColor};
  font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
`;

export const TextWrapper = styled.div`
  font-size: 1.5rem;
  line-height: 1.5;
  white-space: pre-wrap;
  margin: 2rem 0;
  user-select: none;
`;

export const Char = styled.span<{
  $state: "current" | "correct" | "incorrect" | "waiting";
}>`
  color: ${({ $state, theme }) => {
    switch ($state) {
      case "current":
        return theme.mainColor;
      case "correct":
        return theme.textColor;
      case "incorrect":
        return theme.errorColor;
      case "waiting":
        return theme.subColor;
    }
  }};
  background-color: ${({ $state }) =>
    $state === "current" ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border-left: ${({ $state }) =>
    $state === "current" ? "2px solid currentColor" : "none"};
  animation: ${({ $state }) =>
    $state === "current" ? "blink 1s infinite" : "none"};

  @keyframes blink {
    50% {
      border-left-color: transparent;
    }
  }
`;

export const TypingArea = styled.textarea`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
`;

export const RestartButton = styled.button`
  display: flex;
`;

export const RestartIcon = styled(RestartAlt)`
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.mainColor};
`;
