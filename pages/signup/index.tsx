import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import Link from 'next/link';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { SecurityKey } from '../../src/assets/icons/icons';
import InputField from '../../src/components/inputs/Input-field';
import AuthWrapper from '../../src/layout/Auth-wrapper';
import Public from '../../src/layout/Public';
import { firebase } from '../../src/utils/firbase-config';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const onRegister = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const newUser = firebase.auth().currentUser;
      newUser.updateProfile({
        displayName: name,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error) {
        if (error && error.message) {
          addToast(error?.message, { appearance: 'error' });
        }
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
            minHeight="30rem"
            py={{ base: '2rem', md: '3rem' }}
            mx={{ md: '8rem', base: '1rem' }}
            mt={{ base: '2rem', md: '8rem' }}
            shadow="xs"
          >
            <Box display="flex" justifyContent="center">
              <Text>
                <SecurityKey /> CREATE ACCOUNT
              </Text>
            </Box>
            <form onSubmit={onRegister}>
              <Box mb="2rem">
                <InputField
                  value={name}
                  label="Full Name"
                  type="text"
                  placeholder="Enter name"
                  required
                  onChange={e => setName(e.target.value)}
                />
              </Box>
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
              <Box display="flex" mt="1rem">
                <Text fontSize="xs">
                  Accept{' '}
                  <a
                    href="https://ujali.co.uk/about-us/terms-of-use/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    terms and conditions
                  </a>{' '}
                </Text>{' '}
                <Switch ml="1rem" colorScheme="brand.orange" />
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
                mt="1rem"
              >
                {!loading ? ' Sign up' : 'Loading...'}
              </Button>
            </form>
            <Box
              display="flex"
              mt="1rem"
              fontSize="xs"
              justifyContent="space-between"
            >
              <Text>
                Already have an account? <Link href="/login">Login</Link>{' '}
              </Text>
            </Box>
          </Box>
        </Box>
      </AuthWrapper>
    </Public>
  );
};

export default SignUp;
