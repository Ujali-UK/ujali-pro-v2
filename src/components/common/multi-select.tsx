import { Box } from '@chakra-ui/layout';
import { topicOptions } from '../../utils/static-variables';
import Select from 'react-select';

const CustomMultiSelect = () => {
  return (
    <Box>
      <Select
        isMulti
        name="colors"
        options={topicOptions}
        classNamePrefix="select"
      />
    </Box>
  );
};

export default CustomMultiSelect;
