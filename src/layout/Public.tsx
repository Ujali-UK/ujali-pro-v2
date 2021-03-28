import React, { useEffect } from 'react';
import { useAuth } from '../providers/auth-provider/Auth-provider';
import { useRouter } from 'next/router';
import PageLoader from '../components/loaders/PageLoader';
import { Box } from '@chakra-ui/layout';

const Public: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  /**
   * Check if user already exist and determine page to render
   */
  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading]);
  return (
    <Box
      minHeight="100vh"
      backgroundImage="url('https://res.cloudinary.com/w3bh4ck/image/upload/v1616956021/ujali/ujali-pro/background-white.jpg')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      {!loading ? <div>{children}</div> : <PageLoader />}
    </Box>
  );
};

export default Public;
