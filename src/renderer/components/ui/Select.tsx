import ReactSelect from 'react-select';
import styled from 'styled-components';

const SelectWrapper = styled.div<{ width?: string }>`
  width: ${(props) => props.width || '100%'};

  .react-select-container {
    font-size: 0.8rem;

    .react-select__control {
      min-height: 24px;
      border-radius: 0px;
      background-color: transparent;
      * {
        color: var(--theme-white);
      }
    }

    .react-select__indicator {
      padding: 0px;
    }

    .react-select__input-container {
      padding: 0px;
    }

    .react-select__menu {
      margin-top: 0px;
      background-color: var(--theme-bg-lighter);
    }

    .react-select__option {
      color: var(--theme-white);
      cursor: pointer;
    }

    .react-select__option--is-selected {
      color: var(--theme-white);
      background-color: var(--theme-item-bg-selected) !important;
      &:hover {
        background-color: var(--theme-item-bg-selected-hover) !important;
      }
    }

    .react-select__option:hover,
    .react-select__option--is-focused {
      background-color: var(--theme-item-bg-hover);
      color: var(--theme-white);
    }
  }
`;

export default function Select({ options }: { options: any[] }) {
  return (
    <SelectWrapper>
      <ReactSelect
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </SelectWrapper>
  );
}
