import React, { useState } from 'react';
import { firebase } from '../../src/utils/firbase-config';
import { useToasts } from 'react-toast-notifications';
import Link from 'next/link';
import Public from '../../src/layout/Public';
import { Box, Button } from '@chakra-ui/react';
import InputField from '../../src/components/inputs/Input-field';

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
      <Box display={{ md: 'flex' }} justifyContent={{ md: 'space-between' }}>
        <Box>SVG here</Box>
        <Box
          width={{ md: '50%', base: '100%' }}
          d="flex"
          justifyContent="center"
        >
          <Box width="100%" px={{ md: '8rem' }}>
            <form onSubmit={onLogin}>
              <Box mb="2rem">
                <InputField
                  value={email}
                  label="Email"
                  type="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </Box>
              <InputField
                value={password}
                label="Password"
                type="password"
                required
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                disabled={loading}
                borderRadius="lg"
                color="white"
                width="50%"
                type="submit"
                mt="2rem"
              >
                {!loading ? ' Log In' : 'Loading...'}
              </Button>
            </form>
            <p>
              Don't have an account? <Link href="/signup">Register</Link>{' '}
            </p>
          </Box>
        </Box>
      </Box>
    </Public>
  );
};

export default Login;
