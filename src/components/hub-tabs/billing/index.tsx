import Icon from '@chakra-ui/icon';
import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { EmptyStateSvg } from '../../../assets/icons/empty-state';

const Billing = () => {
  return (
    <Box>
      <Box textAlign="center" pt="6rem">
        <Text fontWeight="bold" fontSize="xl">
          You have no billing history
        </Text>
        <Box d="flex" justifyContent="center">
          <Icon as={EmptyStateSvg} w={60} h={60} />
        </Box>
      </Box>
    </Box>
  );
};

export default Billing;
