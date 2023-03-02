import ReactSelect from 'react-select';
import styled from 'styled-components';

const SelectWrapper = styled.div<{ width?: string }>`
  width: ${(props) => props.width || '100%'};

  .react-select-container {
    font-size: 0.8rem;

    .react-select__control {
      min-height: 24px;
    }

    .react-select__indicator {
      padding: 0px;
    }

    .react-select__input-container {
      padding: 0px;
    }
  }
`;

export default function Select({
  options,
  width = '100%',
}: {
  options: any[];
  width?: string;
}) {
  return (
    <SelectWrapper width={width}>
      <ReactSelect
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </SelectWrapper>
  );
}
