import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(Cookies.get('authToken'));

  return (
    <div>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
