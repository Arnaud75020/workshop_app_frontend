import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get('/auth/verify-token')
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
