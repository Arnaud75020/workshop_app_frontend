import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Admin from './Components/Admin/Admin';
import Speaker from './Components/Speaker/Speaker';
import Attendee from './Components/Attendee/Attendee';
import Login from './Components/SharedComponents/Login';
import SignUp from './Components/SharedComponents/SignUp';
import { UserContext } from './Context/UserContext';
import { WorkshopContext } from './Context/WorkshopContext';
import AuthContextProvider, { AuthContext } from './Context/AuthContext';

function App() {

  return (
    <div className='App'>
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <LoginSignUpRoute path='/login' component={Login} />
            <LoginSignUpRoute path='/signup' component={SignUp} />
            <ProtectedRoute path='/admin' component={Admin} />
            <ProtectedRoute path='/speaker' component={Speaker} />
            <ProtectedRoute path='/attendee' component={Attendee} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

const LoginSignUpRoute = ({ component: Component, ...props }) => {
  const { auth } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <Route
      {...props}
      component={(props) =>
        !auth ? <Component {...props} /> : <Redirect to={`/${user.role}`} />
      }
    />
  );
};

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <Route
      {...props}
      component={(props) =>
        auth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default App;
