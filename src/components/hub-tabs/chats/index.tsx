import { Box, Text } from '@chakra-ui/layout';
import React from 'react';

const Chats = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Text fontSize="xl" fontWeight="bold" pt="10rem">
          YOU HAVE NO ACTIVE CHAT
        </Text>
      </Box>
    </Box>
  );
};

export default Chats;
