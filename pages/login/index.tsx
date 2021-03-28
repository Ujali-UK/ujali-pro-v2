import React, { useState } from 'react';
import { firebase } from '../../src/utils/firbase-config';
import { useToasts } from 'react-toast-notifications';
import Link from 'next/link';
import Public from '../../src/layout/Public';
import { Box, Button, Text } from '@chakra-ui/react';
import InputField from '../../src/components/inputs/Input-field';
import { SecurityKey } from '../../src/assets/icons/icons';
import AuthWrapper from '../../src/layout/Auth-wrapper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const onLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
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
            height="30rem"
            py={{ base: '2rem', md: '3rem' }}
            mx={{ md: '8rem', base: '1rem' }}
            mt={{ base: '2rem', md: '10rem' }}
            shadow="xs"
          >
            <Box display="flex" justifyContent="center">
              <Text>
                <SecurityKey /> USER LOGIN
              </Text>
            </Box>
            <form onSubmit={onLogin}>
              <Box mb="2rem">
                <InputField
                  value={email}
                  label="Email"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </Box>
              <InputField
                value={password}
                label="Password"
                type="password"
                placeholder="Password"
                required
                onChange={e => setPassword(e.target.value)}
              />
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

              <Text color="brand.orange">
                <Link href="/signup">Forgot Password</Link>{' '}
              </Text>
            </Box>
          </Box>
        </Box>
      </AuthWrapper>
    </Public>
  );
};

export default Login;
