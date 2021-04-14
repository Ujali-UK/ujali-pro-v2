import {
  useEffect,
  useState,
  createContext,
  FunctionComponent,
  useContext,
} from 'react';
import { firebase } from '../../utils/firbase-config';

interface AuthProps {
  user: any;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthProps>({
  user: null,
  loading: true,
  logout: () => {},
});

const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => cancelAuthListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, logout: () => firebase.auth().signOut() }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
