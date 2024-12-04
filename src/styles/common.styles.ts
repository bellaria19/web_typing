import { foundations } from "@/styles/foundation";
import styled from "styled-components";

export const PageContainer = styled.div`
  margin: 0 auto;
  padding: ${foundations.spacing.lg};
  min-height: calc(100vh - 20vh);
  background-color: ${({ theme }) => theme.bgColor};
`;
