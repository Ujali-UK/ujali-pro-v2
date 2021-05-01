import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { MdSearch } from 'react-icons/md';

interface Iprops {
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

const Subnav: React.FC<Iprops> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  return (
    <Box height="5rem" bgColor="brand.gray" width="full">
      {router.pathname.includes('gigs') && (
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
      )}
      <Box
        d={{ md: 'flex', base: 'none' }}
        justifyContent="space-between"
        px={{ base: '1rem', md: '8rem' }}
        pt="1.5rem"
      >
        <Box
          onClick={() => setActiveTab('chats')}
          _hover={{ border: '1px solid white' }}
          cursor="pointer"
          color={'white'}
          fontWeight="bold"
          border={activeTab === 'chats' ? '1px solid orange' : ''}
          px="2rem"
          borderRadius="md"
        >
          <Text>CHATS</Text>
        </Box>
        <Box
          onClick={() => setActiveTab('bookings')}
          _hover={{ border: '1px solid white' }}
          cursor="pointer"
          color={'white'}
          fontWeight="bold"
          border={activeTab === 'bookings' ? '1px solid orange' : ''}
          px="2rem"
          borderRadius="md"
        >
          <Text>BOOKINGS</Text>
        </Box>
        <Box
          onClick={() => setActiveTab('billing')}
          _hover={{ border: '1px solid white' }}
          cursor="pointer"
          color={'white'}
          fontWeight="bold"
          border={activeTab === 'billing' ? '1px solid orange' : ''}
          px="2rem"
          borderRadius="md"
        >
          <Text>BILLING</Text>
        </Box>
        <Box
          onClick={() => setActiveTab('calendar')}
          _hover={{ border: '1px solid white' }}
          cursor="pointer"
          color={'white'}
          fontWeight="bold"
          border={activeTab === 'calendar' ? '1px solid orange' : ''}
          px="2rem"
          borderRadius="md"
        >
          <Text>CALENDAR</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Subnav;
