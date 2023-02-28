import styled from 'styled-components';

const Row = styled.div<{ height?: string }>`
  display: flex;
  width: 100%;
  height: ${(props) => props.height || '100%'};
  flex-direction: row;
`;

export default Row;
