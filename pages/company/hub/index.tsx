import { Box } from '@chakra-ui/layout';
import React from 'react';
import Protected from '../../../src/layout/Protected';

const Hub = () => {
  return (
    <Protected>
      <Box>Company hub uploaded here</Box>
    </Protected>
  );
};

export default Hub;
