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
  userInfo: any;
}

const AuthContext = createContext<AuthProps>({
  userInfo: null,
  user: null,
  loading: true,
  logout: () => {},
});

const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    if (user) {
      onGetUserInfo();
    }

    return () => cancelAuthListener();
  }, [user]);

  const onGetUserInfo = async () => {
    const db = await firebase.firestore();
    db.collection('users')
      .where('uid', '==', user?.uid)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          setUserInfo(doc.data());
        });
      })
      .catch(error => {
        // console.log("error", error)
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loading,
        logout: () => firebase.auth().signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
