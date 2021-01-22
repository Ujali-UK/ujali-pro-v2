import React from 'react';

export const Login: React.FC = () => {
  return (
    <div>
      This is a basic login
      <div>
        <form>
          <div>
            <label>Email</label>
            <input type="email" />
          </div>
          <div>
            <label>password</label>
            <input type="password" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
