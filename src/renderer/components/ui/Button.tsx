import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  padding: 5px 1rem;
  background-color: var(--theme-blue-dark);
  color: var(--theme-white);
  cursor: pointer;
  &:hover {
    background-color: var(--theme-blue-darker);
  }
`;

export default Button;
