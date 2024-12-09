import styled from "styled-components";
import { foundations } from "@/styles/foundation";
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

export const TextWrapper = styled.div<{ $isFocused: boolean }>`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 2;
  font-size: calc(1.2rem * var(--font-scale));
  transition: all 0.3s ease;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 150px;
  overflow: hidden;
`;

export const LineWrapper = styled.div<{
  $isNext?: boolean;
  $isVisible?: boolean;
}>`
  opacity: ${({ $isNext }) => ($isNext ? 0.5 : 1)};
  transform: translateY(${({ $isVisible }) => ($isVisible ? "0" : "-100%")});
  transition: all 0.3s ease;
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

export const ReloadButton = styled.button`
  display: flex;
`;

export const ReloadIcon = styled(RestartAlt)`
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.mainColor};
`;

export const TypingContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.mainColor};
  padding: 1rem 2rem;
`;

export const BlurOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: ${({ theme }) => theme.textColor};
  font-size: ${foundations.typography.size.xl};
  text-align: center;
  user-select: none;
  animation: fadeInOut 1s infinite;
  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

export const BottomTypingArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.subColor};
  border-radius: 4px;
  margin-top: 2rem;
`;

export const BottomInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: calc(1.2rem * var(--font-scale));
  resize: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.subColor};
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const StatusItem = styled.div<{ $active: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${foundations.radius.sm};
  font-size: ${foundations.typography.size.sm};
  color: ${({ theme }) => theme.textColor};
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: all 0.2s ease;
`;
