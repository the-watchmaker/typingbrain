import styled from 'styled-components';

const ColumnBetween = styled.div<{ width?: string }>`
  display: flex;
  width: ${(props) => props.width || '100%'};
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export default ColumnBetween;
