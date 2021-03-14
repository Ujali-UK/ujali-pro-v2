import Protected from '../src/layout/Protected';

const Home = () => {
  return (
    <Protected>
      <h1>Logged in homepage</h1>
    </Protected>
  );
};

export default Home;
