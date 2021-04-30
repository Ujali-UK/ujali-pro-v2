import { Box } from '@chakra-ui/layout';
import React from 'react';
import Protected from '../../../src/layout/Protected';

const Hub = () => {
  return (
    <Protected>
      <Box>hub updated</Box>
    </Protected>
  );
};

export default Hub;