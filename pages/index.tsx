import Protected from '../src/layout/Protected';
import { useAuth } from '../src/providers/auth-provider/Auth-provider';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { firebase } from '../src/utils/firbase-config';
import PageLoader from '../src/components/loaders/PageLoader';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (user) {
      getUserDetails();
    }
  }, [user]);

  const getUserDetails = async () => {
    const db = firebase.firestore();
    let userResponse = {};
    db.collection('users')
      .where('uid', '==', user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          userResponse = doc.data();
        });
        setLoading(false);
      })
      .then(() => {
        return userResponse;
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <Protected>{loading ? <PageLoader /> : <div> logged in</div>}</Protected>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { name: 'hello' } };
};

export default Home;
