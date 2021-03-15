import React from 'react';
import { useAuth } from '../providers/auth-provider/Auth-provider';
import Login from '../../pages/login';

const Protected: React.FC = ({ children }) => {
  const { user, loading, logout } = useAuth();

  return (
    <div>
      {user && !loading ? (
        <div>
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
  );
};

export default Protected;
