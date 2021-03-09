import { firebaseClient } from '../../firbase/firebase.config';
import React, { useState, useEffect, createContext } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import 'firbase/auth';

const AuthContext = createContext({});

export const AuthProvider: React.FC = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async user => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', {});
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, 'token', token, {});
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
