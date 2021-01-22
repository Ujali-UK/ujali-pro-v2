import { Login } from '../src/containers/auth/Login';
import styles from '../styles/Home.module.css';
import Wrapper from '../src/redux/wrapper/Wrapper';

const Home = () => {
  return (
    <div className={styles.container}>
      <Wrapper>
        <Login />
      </Wrapper>
    </div>
  );
};

export default Home;
