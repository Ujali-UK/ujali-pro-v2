import React, { useEffect } from 'react';
import { useAuth } from '../providers/auth-provider/Auth-provider';
import { useRouter } from 'next/router';
import PageLoader from '../components/loaders/PageLoader';

const Public: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading]);
  return <div>{!loading ? <div>{children}</div> : <PageLoader />}</div>;
};

export default Public;
