import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React from 'react';

interface Iprops {
  route: string;
}

const CompanyTabs: React.FC<Iprops> = ({ route }) => {
  const router = useRouter();

  return (
    <Box height="4rem" bgColor="brand.gray" width="100%">
      <Box
        display="flex"
        justifyContent="center"
        color="white"
        pt="1.5rem"
        fontWeight="bold"
        textTransform="uppercase"
      >
        <Box
          mr="2rem"
          cursor="pointer"
          width="6rem"
          textAlign="center"
          borderBottom={route.includes('overview') ? '4px solid white' : ''}
          pb="0.5rem"
          onClick={() => router.push('/company/onboarding/overview')}
        >
          Overview
        </Box>
        <Box
          ml="2rem"
          cursor="pointer"
          width="6rem"
          textAlign="center"
          borderBottom={route.includes('gigs') ? '4px solid white' : ''}
          pb="0.5rem"
          onClick={() => router.push('/company/onboarding/gigs')}
        >
          Gigs
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyTabs;
