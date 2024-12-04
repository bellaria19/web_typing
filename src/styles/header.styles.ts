import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 62rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const HeaderText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

export const Nav = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const NavButton = styled.button`
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
