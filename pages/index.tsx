import { useAuth } from '../src/providers/auth-provider/Auth-provider';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { firebase } from '../src/utils/firbase-config';
import PageLoader from '../src/components/loaders/PageLoader';
import { Box } from '@chakra-ui/layout';
import { withRouter } from 'next/router';
import Protected from '../src/layout/Protected';

const Home = ({ router }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  const getUserDetails = async () => {
    setLoading(true);
    const db = firebase.firestore();
    let userResponse;
    db.collection('users')
      .where('uid', '==', user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          userResponse = doc.data();
        });
      })
      .then(() => {
        setLoading(false);
        if (userResponse?.accountType.toLowerCase() === 'facilitator') {
          router.push('/facilitator/onboarding/overview');
        } else {
          router.push('/company/onboarding/overview');
        }
      })
      .catch(error => {
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <Box>
      {loading ? (
        <PageLoader />
      ) : (
        <Protected>
          <PageLoader />
        </Protected>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { name: 'hello' } };
};

export default withRouter(Home);
