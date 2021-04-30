import { Box, Divider, Grid, Text } from '@chakra-ui/layout';
import React from 'react';
import CustomHeading from '../../../src/components/common/custom-heading';
import Subnav from '../../../src/components/navbar/Subnav';
import Protected from '../../../src/layout/Protected';

const Gigs = () => {
  return (
    <Protected>
      <Subnav />
      <Box pt="1rem">
        <CustomHeading value="Gigs" />
        <Text px={{ base: '1rem', md: '2rem' }} fontSize="lg">
          Find quality Gigs that are in line with your core Interest and Values.
        </Text>
        <Box px={{ base: '1rem', md: '2rem' }}>
          <Grid
            templateColumns={{ md: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }}
            gap={6}
            pt="2rem"
          >
            <Box
              w="100%"
              minH="15rem"
              border="1px solid #707070"
              borderRadius="md"
              _hover={{ boxShadow: '2xl' }}
            >
              <Box
                width="100%"
                height="8rem"
                backgroundImage={
                  'url(https://res.cloudinary.com/w3bh4ck/image/upload/v1617668753/ujali/ujali-pro/facilitators-cover-image.jpg)'
                }
                backgroundRepeat="no-repeat"
                bgPos="center"
                bgSize="cover"
              ></Box>
              <Box px="0.5rem" pb="2rem">
                <Text
                  fontSize="lg"
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {/* {nameShortner(gig?.gigName, 30)} */}
                  This is a test gig name
                </Text>
                <Text mt="-0.5" fontSize="sm" color="brand.orange">
                  20£ per person (30 spaces available){' '}
                </Text>
                <Text fontSize="md">
                  {' '}
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.
                </Text>
                <Divider pt="4" orientation="horizontal" />
                <Text>
                  <span style={{ fontWeight: 'bold' }}>Location:</span>{' '}
                  {/* {gig?.eventLocation} */}
                  London
                </Text>
                <Box d="flex" justifyContent="space-between" pt="1rem">
                  <Box>
                    {/* <Icon color="brand.orange" as={MdDateRange} w={8} h={8} />{' '} */}
                    <Text fontWeight="bold">Start Date:</Text>
                    <Text pt="0.2rem">
                      1st may, 2021
                      {/* {format(
                      gig?.eventDateStart ? new Date(gig.fromDate) : new Date(),
                      'Lo LLL, yyyy'
                    )} */}
                    </Text>
                  </Box>
                  <Box>
                    {/* <Icon color="brand.orange" as={MdDateRange} w={8} h={8} />{' '} */}
                    <Text fontWeight="bold">End Date:</Text>
                    <Text>
                      {/* {format(
                      gig?.toDate ? new Date(gig.toDate) : new Date(),
                      'Lo LLL, yyyy'
                    )} */}
                      12th may, 2021
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box d="flex" px="1rem" pb="1rem">
                <Text cursor="pointer" color="brand.orange">
                  View gig
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Protected>
  );
};

export default Gigs;
