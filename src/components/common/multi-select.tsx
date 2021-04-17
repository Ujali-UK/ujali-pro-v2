import { Box } from '@chakra-ui/layout';
import { topicOptions } from '../../utils/static-variables';
import Select from 'react-select';

const customStyles = {
  control: provided => ({
    ...provided,
    background: '#f1f1f6',
    color: '#ffffff',
    border: 'none',
    minHeight: '3rem',
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: '#FF9717',
    color: '#ffffff',
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: '#ffffff',
  }),
};

const CustomMultiSelect = ({ onChange, value }) => {
  return (
    <Box>
      <Select
        isMulti
        isSearchable
        name="colors"
        onChange={onChange}
        value={value}
        styles={customStyles}
        options={topicOptions}
        classNamePrefix="select"
      />
    </Box>
  );
};

export default CustomMultiSelect;
