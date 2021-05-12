import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Badge, Box, Divider, Grid, Text } from '@chakra-ui/layout';
import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import ReactStars from 'react-stars';

const FacilitatorCard = () => {
  return (
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
        bgGradient="linear(to-r, brand.orange, pink.100)"
        bgPos="center"
        bgSize="cover"
        d="flex"
        justifyContent="center"
        borderRadius="sm"
        pt="2rem"
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
  );
};

export default FacilitatorCard;
