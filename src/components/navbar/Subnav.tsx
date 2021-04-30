import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { MdSearch } from 'react-icons/md';

const Subnav = () => {
  return (
    <Box height="5rem" bgColor="brand.gray" width="full">
      <Box d="flex" justifyContent="space-between" px="1rem">
        <Box pt="1rem" width={{ base: 'full', md: '50%' }}>
          <InputGroup size="lg" color="white">
            <InputLeftElement
              pointerEvents="none"
              color="white"
              fontSize="1.2em"
              children={<Icon as={MdSearch} h="8" w="8" />}
            />
            <Input
              _placeholder={{ color: 'white' }}
              bgColor="brand.orange"
              color="white"
              placeholder="Search gigs..."
              borderRadius="lg"
            />
          </InputGroup>
        </Box>
        <Box>
          <Text color="white" pt="1.5rem">
            Showing: <span style={{ fontWeight: 'bold' }}>1</span> out of 1{' '}
            <span style={{ fontWeight: 'bold' }}>Gigs</span>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Subnav;
