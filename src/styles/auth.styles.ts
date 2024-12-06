import { foundations } from "@/styles/foundation";
import { styled } from "styled-components";

export const Label = styled.label`
  display: block;
  font-size: ${foundations.typography.size.sm};
  font-weight: ${foundations.typography.weight.medium};
  margin-bottom: ${foundations.spacing.sm};
`;

export const AuthTitle = styled.div`
  text-align: center;
  font-size: ${foundations.typography.size.lg};
  font-weight: ${foundations.typography.weight.bold};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${foundations.spacing.sm};
  border: 1px solid #eee;
  border-radius: ${foundations.radius.sm};
`;

export const Button = styled.button`
  width: 100%;
  padding: ${foundations.spacing.sm};
  border: 1px solid #eee;
  border-radius: ${foundations.radius.sm};

  &:active {
    background-color: #ddd;
    border-color: #ccc;
  }
`;
