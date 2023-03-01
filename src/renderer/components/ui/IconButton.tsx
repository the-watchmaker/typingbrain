import styled from 'styled-components';

const IconButton = styled.div<{ fontSize?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(opts) => opts.fontSize || '1.25rem'};
  line-height: 1.25rem;
  padding: 5px 5px;
  margin: 0 5px;
  color: var(--theme-grey);
  height: 30px;
  width: 30px;
  border-radius: 3px;
  cursor: pointer;

  &:first-of-type {
    margin-left: 0px;
  }

  &:last-of-type {
    margin-right: 0px;
  }

  &:hover {
    color: var(--theme-white);
    background-color: var(--theme-item-bg-hover);
  }
`;

export default IconButton;
