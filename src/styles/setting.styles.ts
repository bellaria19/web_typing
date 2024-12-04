import { foundations } from "@/styles/foundation";
import styled from "styled-components";

export const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  margin-bottom: 1.5rem;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const OptionLabel = styled.div`
  font-size: ${foundations.typography.size.md};
  color: ${foundations.colors.primary};
  font-weight: 500;
`;

export const OptionDescription = styled.div`
  font-size: ${foundations.typography.size.sm};
  color: ${foundations.colors.text};
  margin-top: 0.25rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  min-width: 300px;
`;

export const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

export const ThemeButton = styled.button<{
  $bgColor: string;
  $textColor: string;
  $isSelected: boolean;
}>`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $textColor }) => $textColor};
  border: 2px solid
    ${({ $isSelected }) => ($isSelected ? "var(--main-color)" : "transparent")};
  transition: all 0.2s;
  word-break: break-all;
  min-height: 4rem;
  width: 100%;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const ThemeOptionGrid = styled(OptionGrid)`
  grid-template-columns: 1fr;
  > div {
    width: 100%;
  }
`;

export const SizeInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.subColor};
  border-radius: ${foundations.radius.sm};
  width: 100px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-size: ${foundations.typography.size.md};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.mainColor};
  }

  /* 숫자 입력 화살표 스타일링 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
    height: 24px;
  }
`;
