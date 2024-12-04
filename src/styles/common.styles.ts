import { foundations } from "@/styles/foundation";
import styled from "styled-components";

export const PageContainer = styled.div`
  margin: 0 auto;
  padding: ${foundations.spacing.lg};
  min-height: calc(100vh - 20vh);
  background-color: ${({ theme }) => theme.bgColor};
`;

export const Wrapper = styled.div`
  max-width: ${foundations.layout.maxWidth};
  padding: ${foundations.spacing.md};
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: ${foundations.typography.size.lg};
  font-weight: ${foundations.typography.weight.bold};
  margin-bottom: ${foundations.spacing.lg};
  color: ${({ theme }) => theme.textColor};
`;

export const Label = styled.label`
  display: block;
  font-size: ${foundations.typography.size.sm};
  font-weight: ${foundations.typography.weight.medium};
  margin-bottom: ${foundations.spacing.sm};
  color: ${({ theme }) => theme.textColor};
`;

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${foundations.spacing.lg};
`;
