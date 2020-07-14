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
            <ProtectedRoute path='/admin' component={Admin} />
            <ProtectedRoute path='/speaker' component={Speaker} />
            <ProtectedRoute path='/attendee' component={Attendee} />
            <LoginSignUpRoute path='/login' component={Login} />
            <LoginSignUpRoute path='/signup/:id' component={SignUp} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

const LoginSignUpRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      component={(props) =>
        !auth ? <Component {...props} /> : <Redirect to={`/${user.role}`} />
      }
    />
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        auth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default App;
