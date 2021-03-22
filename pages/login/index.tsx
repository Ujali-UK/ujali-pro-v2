import React, { useState } from 'react';
import { firebase } from '../../src/utils/firbase-config';
import { useToasts } from 'react-toast-notifications';
import Link from 'next/link';
import Public from '../../src/layout/Public';

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
      <form onSubmit={onLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{!loading ? 'Login' : 'Loading'}</button>
      </form>
      <p>
        Don't have an account? <Link href="/signup">Register</Link>{' '}
      </p>
    </Public>
  );
};

export default Login;
