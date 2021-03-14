import React from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth } from '../providers/auth-provider/Auth-provider';
import Login from '../../pages/login';

const Protected: React.FC = ({ children }) => {
  const { user, loading, logout } = useAuth();

  return (
    <Box>
      {user && !loading ? (
        <Box>
          <Box>
            Navbar
            <button onClick={logout}>logout</button>
          </Box>
          {children}
        </Box>
      ) : (
        <Login />
      )}
    </Box>
  );
};

export default Protected;
