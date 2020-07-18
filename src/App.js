import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Admin from './Components/Admin/Admin';
import Speaker from './Components/Speaker/Speaker';
import Attendee from './Components/Attendee/Attendee';
import Login from './Components/SharedComponents/Login';
import SignUp from './Components/SharedComponents/SignUp';
import { UserContext } from './Context/UserContext';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path='/admin' component={Admin} />
          <ProtectedRoute path='/speaker' component={Speaker} />
          <ProtectedRoute path='/attendee' component={Attendee} />
          <LoginSignUpRoute path='/login' component={Login} />
          <LoginSignUpRoute path='/signup/:id' component={SignUp} />
          <LoginSignUpRoute path='/signup' component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const LoginSignUpRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(UserContext);

  return (
    <Route
      {...rest}
      component={(props) =>
        !auth ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/${window.localStorage.getItem('userRole')}`} />
        )
      }
    />
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(UserContext);
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
