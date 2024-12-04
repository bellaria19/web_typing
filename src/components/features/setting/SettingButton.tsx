import styled from "styled-components";
import { foundations } from "@/styles/foundation";

interface SettingButtonProps {
  $isSelected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<{ $isSelected: boolean }>`
  padding: ${foundations.spacing.sm} ${foundations.spacing.md};
  border-radius: ${foundations.radius.md};
  background-color: ${({ $isSelected }) =>
    $isSelected ? foundations.colors.primary : foundations.colors.secondary};
  color: ${foundations.colors.text};
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const SettingButton = ({
  $isSelected,
  onClick,
  children,
}: SettingButtonProps) => {
  return (
    <StyledButton $isSelected={$isSelected || false} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
