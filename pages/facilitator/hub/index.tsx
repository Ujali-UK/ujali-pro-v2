import { Box } from '@chakra-ui/layout';
import React from 'react';
import Subnav from '../../../src/components/navbar/Subnav';
import Protected from '../../../src/layout/Protected';

const Hub = () => {
  return (
    <Protected>
      <Subnav />
      <Box>hub updated</Box>
    </Protected>
  );
};

export default Hub;
