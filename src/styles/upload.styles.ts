import { foundations } from "@/styles/foundation";
import { styled } from "styled-components";

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${foundations.spacing.lg};
`;

export const UploadTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.subColor};
  border-radius: ${foundations.radius.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.mainColor};
  }

  &.content {
    min-height: 200px;
  }

  &.description {
    min-height: 100px;
  }
`;
export const CharCount = styled.div`
  margin-top: ${foundations.spacing.sm};
  text-align: right;
  font-size: ${foundations.typography.size.sm};
  color: ${({ theme }) => theme.textColor};
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const CategoryBtn = styled.button<{ $isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all ${foundations.animation.duration.fast};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.mainColor : theme.bgColor};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.textColor : theme.subColor};
  border: 1px solid ${({ theme }) => theme.subColor};

  &:hover {
    background-color: ${({ theme }) => theme.altColor};
  }
`;

export const TypeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TypeBtn = styled.button<{ $isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all ${foundations.animation.duration.fast};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.mainColor : theme.bgColor};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.textColor : theme.subColor};
`;

export const UploadBtn = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: ${foundations.radius.sm};
  transition: all ${foundations.animation.duration.fast};

  &:hover {
    opacity: 0.9;
  }
`;
