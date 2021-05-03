import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { MdSearch } from 'react-icons/md';
import { EmptyStateSvg } from '../../../src/assets/icons/empty-state';
import Protected from '../../../src/layout/Protected';

const Workshop = () => {
  return (
    <Protected>
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
                placeholder="Search workshops..."
                borderRadius="lg"
              />
            </InputGroup>
          </Box>
          <Box>
            <Text color="white" pt="1.5rem">
              Showing: <span style={{ fontWeight: 'bold' }}>1</span> out of 1{' '}
              <span style={{ fontWeight: 'bold' }}>Workshops</span>
            </Text>
          </Box>
        </Box>
      </Box>
      <Box px="2rem">
        <Box textAlign="center" pt="4rem">
          <Text fontWeight="bold" fontSize="xl">
            No Workshop found
          </Text>
          <Box d="flex" justifyContent="center">
            <Icon as={EmptyStateSvg} w={60} h={60} />
          </Box>
        </Box>
      </Box>
    </Protected>
  );
};

export default Workshop;
