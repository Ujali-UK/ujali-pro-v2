import React from 'react';
import Public from '../../src/layout/Public';
import { Box } from '@chakra-ui/react';
import { LandingLogo } from '../../src/assets/icons/landing-logo';

interface Props {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Public>
      <Box display={{ md: 'flex' }} justifyContent={{ md: 'space-between' }}>
        <Box
          width={{ md: '50%', base: '100%' }}
          d={{ md: 'flex', base: 'none' }}
          justifyContent="center"
        >
          <Box mt="4rem">
            <LandingLogo boxSize={{ md: '40rem' }} role="presentation" />
          </Box>
        </Box>
        <Box width={{ md: '50%', base: '100%' }}>{children}</Box>
      </Box>
    </Public>
  );
};

export default AuthWrapper;
