import { foundations } from "@/styles/foundation";
import styled from "styled-components";
import { material } from "styled-icons";

export const Section = styled.section`
  padding: ${foundations.spacing.xl} 0;

  &:first-child {
    padding-top: 0;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SectionTitle = styled.h3`
  font-size: ${foundations.typography.size.lg};
  color: ${foundations.colors.text};
  margin: ${foundations.spacing.xl} 0 ${foundations.spacing.md} 0;
  padding-top: ${foundations.spacing.xl};

  &:first-of-type {
    padding-top: 0;
    margin-top: 0;
  }
`;

export const UserInfo = styled.div`
  font-size: ${foundations.typography.size.lg};
  font-weight: ${foundations.typography.weight.bold};
  color: ${({ theme }) => theme.textColor};
`;

export const LogoutBtn = styled.button`
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  transition: opacity ${foundations.animation.duration.fast};

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoutIcon = styled(material.Logout)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${foundations.spacing.lg};
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.altColor};
  padding: ${foundations.spacing.lg};
  border-radius: ${foundations.radius.md};
`;

export const StatTitle = styled.div`
  color: ${({ theme }) => theme.mainColor};
  font-size: ${foundations.typography.size.md};
`;

export const StatSubTitle = styled.div`
  color: ${({ theme }) => theme.subColor};
  font-size: ${foundations.typography.size.sm};
  margin-bottom: ${foundations.spacing.sm};
`;

export const StatValue = styled.div`
  font-size: ${foundations.typography.size.lg};
  font-weight: ${foundations.typography.weight.bold};
  text-align: right;
  color: ${({ theme }) => theme.textColor};
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  background: ${({ theme }) => theme.altColor};
  color: ${({ theme }) => theme.textColor};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.altColor};
  border-radius: 4px;
  margin-top: 0.5rem;
  min-width: 120px;
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.mainColor};
  }
`;

export const DropdownIcon = styled(material.ArrowDropDown)`
  width: 1.5rem;
  height: 1.5rem;
`;
