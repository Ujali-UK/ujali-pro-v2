import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Public from '../../src/layout/Public';
import { firebase } from '../../src/utils/firbase-config';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addToast } = useToasts();

  const onRegister = async e => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error) {
        if (error && error.message) {
          addToast(error?.message, { appearance: 'error' });
        }
        return error;
      }
    }
  };

  return (
    <Public>
      <form onSubmit={onRegister}>
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
        <button type="submit">Register</button>
      </form>
    </Public>
  );
};

export default SignUp;
