import { useAuth } from '../src/providers/auth-provider/Auth-provider';
import Login from './login';

const Home = () => {
  const { user, loading, logout } = useAuth();

  if (!user && !loading) {
    return <Login />;
  } else {
    return (
      <div>
        Logged In
        <div>
          <button onClick={() => logout()}>logout</button>
        </div>
      </div>
    );
  }
};

export default Home;
