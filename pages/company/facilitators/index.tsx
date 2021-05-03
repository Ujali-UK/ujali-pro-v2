import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Badge, Box, Divider, Grid, Text } from '@chakra-ui/layout';
import React from 'react';
import ReactStars from 'react-stars';
import { MdAddCircle, MdSearch } from 'react-icons/md';
import CustomHeading from '../../../src/components/common/custom-heading';
import Protected from '../../../src/layout/Protected';

const Facilitators = () => {
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
                placeholder="Search gigs..."
                borderRadius="lg"
              />
            </InputGroup>
          </Box>
          <Box>
            <Text color="white" pt="1.5rem">
              Showing: <span style={{ fontWeight: 'bold' }}>1</span> out of 1{' '}
              <span style={{ fontWeight: 'bold' }}>Facilitators</span>
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <CustomHeading value="Facilitators" />
        <Grid
          templateColumns={{ md: 'repeat(4, 1fr)', base: 'repeat(1, 1fr)' }}
          gap={4}
          px={{ base: '1rem', md: '2rem' }}
          pt="2rem"
        >
          <Box
            w="100%"
            height="28rem"
            overflowY="scroll"
            boxShadow="md"
            _hover={{ boxShadow: '2xl', border: '1px solid orange' }}
            border="1px solid #d6d4d4"
            cursor="pointer"
            borderRadius="sm"
            pb="2rem"
          >
            <Box
              w="100%"
              height="8rem"
              bgImage="url('https://res.cloudinary.com/w3bh4ck/image/upload/v1617668753/ujali/ujali-pro/facilitators-cover-image.jpg')"
              bgPos="center"
              bgSize="cover"
              d="flex"
              justifyContent="center"
              borderRadius="sm"
              pt="1.5rem"
            >
              <Image
                h="16"
                w="16"
                src="https://res.cloudinary.com/w3bh4ck/image/upload/v1585801837/person-placeholder.jpg"
                alt="IMG"
                borderRadius="full"
              />
            </Box>
            <Box px="0.5rem">
              <Box d="flex" pt="0.5rem">
                <Text
                  textTransform="capitalize"
                  fontWeight="bold"
                  fontSize="lg"
                  pr="0.4rem"
                >
                  {' '}
                  Jane Doe,{' '}
                </Text>
                <Text color="brand.gray">carlisle@gmail.com</Text>
              </Box>
              <Text color="brand.gray">Lagos,</Text>
              <Divider orientation="horizontal" mb="1rem" />
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize="lg"
                pr="0.4rem"
              >
                Voyance Group of Companies
              </Text>
              <Text fontSize="xs" color="brand.orange">
                £30 per day / £100 per week
              </Text>
              <Text fontSize="xs" color="brand.gray">
                This is the exact company bio
              </Text>
              <Divider orientation="horizontal" mb="1rem" mt="0.5rem" />
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize="md"
                pr="0.4rem"
              >
                Topics
              </Text>
              <Grid templateColumns="repeat(4, 1fr)" gap={3}>
                <Box>
                  <Badge ml="1" colorScheme="orange">
                    Leadership
                  </Badge>
                </Box>
                <Box>
                  <Badge ml="1" colorScheme="orange">
                    Finance
                  </Badge>
                </Box>
              </Grid>
              <Divider orientation="horizontal" mb="1rem" mt="0.5rem" />
              <Box d="flex" justifyContent="space-between">
                <Box d="flex" color="brand.orange">
                  <Icon as={MdAddCircle} h="3" w="3" mt="0.2rem" />
                  <Text fontSize="xs" fontWeight="bold">
                    Add to shortlist
                  </Text>
                </Box>
                <Box>
                  <ReactStars count={5} size={24} color2="#FF9717" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Protected>
  );
};

export default Facilitators;
