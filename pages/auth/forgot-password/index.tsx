import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Link from 'next/link';
import { Box, Button, Text } from '@chakra-ui/react';
import { firebase } from '../../../src/utils/firbase-config';
import Public from '../../../src/layout/Public';
import AuthWrapper from '../../../src/layout/Auth-wrapper';
import { SecurityKey } from '../../../src/assets/icons/icons';
import InputField from '../../../src/components/inputs/Input-field';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const onLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      addToast('A password reset link has been sent to your email', {
        appearance: 'success',
      });
      setLoading(false);
      setEmail('');
    } catch (error) {
      if (error) {
        addToast(error?.message, { appearance: 'error' });
        setLoading(false);
        return error;
      }
    }
  };

  return (
    <Public>
      <AuthWrapper>
        <Box d="flex" justifyContent="center">
          <Box
            width="100%"
            border="1px solid #ccc"
            borderRadius="1rem"
            px="2rem"
            bgColor="white"
            minHeight="20rem"
            py={{ base: '2rem', md: '3rem' }}
            mx={{ md: '8rem', base: '1rem' }}
            mt={{ base: '2rem', md: '10rem' }}
            shadow="xs"
          >
            <Box display="flex" justifyContent="center">
              <Text>
                <SecurityKey /> FORGOT PASSWORD
              </Text>
            </Box>
            <form onSubmit={onLogin}>
              <Box mb="2rem" mt="2rem">
                <InputField
                  value={email}
                  label="Email"
                  type="email"
                  placeholder="Enter your account email..."
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </Box>

              <Button
                disabled={loading}
                borderRadius="lg"
                color="white"
                bgColor="brand.orange"
                width="50%"
                _hover={{
                  bgColor: 'brand.gray',
                }}
                type="submit"
                mt="2rem"
              >
                {!loading ? ' Log In' : 'Loading...'}
              </Button>
            </form>
            <Box
              display="flex"
              mt="1rem"
              fontSize="xs"
              justifyContent="space-between"
            >
              <Text>
                Don't have an account? <Link href="/signup">Register</Link>{' '}
              </Text>
            </Box>
          </Box>
        </Box>
      </AuthWrapper>
    </Public>
  );
};

export default ForgotPassword;
