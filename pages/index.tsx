import { Login } from '../src/containers/auth/Login';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}
