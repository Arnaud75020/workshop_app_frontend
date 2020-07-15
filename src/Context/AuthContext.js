import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(false);

  // MOVE TO USER CONTEXT AND ADD USER
  useEffect(() => {
    axios
      .get('/auth/verify-token')
      .then((response) => {
        console.log('RESPONSE DATA', response.data);
        setAuth(true);
      })
      .catch(() => setAuth(false));
  }, []);
  // MOVE TO USER CONTEXT AND ADD USER

  return (
    <div>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
