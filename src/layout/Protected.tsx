import React from 'react';
import { useAuth } from '../providers/auth-provider/Auth-provider';
import Login from '../../pages/login';
import Navbar from '../components/navbar/Navbar';
import PageLoader from '../components/loaders/PageLoader';

/**
 * @description: only show these pages when the user is logged in.
 * @param param0
 * @returns
 */
const Protected: React.FC = ({ children }) => {
  const { user, loading, logout } = useAuth();

  return (
    <div>
      {!loading ? (
        <div>
          {user && !loading ? (
            <div>
              <Navbar />
              <div>
                Navbar
                <button onClick={logout}>logout</button>
              </div>
              {children}
            </div>
          ) : (
            <Login />
          )}
        </div>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default Protected;
