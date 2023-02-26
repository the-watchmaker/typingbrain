import styled from 'styled-components';

const Column = styled.div<{ width?: string }>`
  display: flex;
  width: ${(props) => props.width || '100%'};
  height: 100%;
  flex-direction: row;
`;

export default Column;
