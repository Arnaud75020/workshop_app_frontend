import React, {useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewWorkshop from './NewWorkshop';
import NotificationContextProvider from '../../Context/NotificationContext';
import WorkshopAttendees from './WorkshopAttendees';
import AllNotifications from './AllNotifications';
import AllWorkshops from './AllWorkshops';
import AllRegistrations from './AllRegistrations';
import NewNotification from './NewNotification';
import NavBar from '../SharedComponents/NavBar';
import './Admin.scss';
import Profile from '../SharedComponents/Profile';

const Admin = (props) => {

  useEffect(() => {
    console.log("ADMIN")
  },[])
  
  return (
    <BrowserRouter>
      <NotificationContextProvider>
        <div className='page'>
          <NavBar />
          <div className='body'>
            <Switch>
              <Route
                path={`${props.match.path}`}
                exact
                component={AllWorkshops}
              />
              <Route
                path={`${props.match.path}/new-workshop`}
                component={NewWorkshop}
              />
              <Route
                path={`${props.match.path}/workshop-attendees/:id`}
                component={WorkshopAttendees}
              />
              <Route
                path={`${props.match.path}/all-notifications`}
                component={AllNotifications}
              />
              <Route
                path={`${props.match.path}/new-notification`}
                component={NewNotification}
              />
              <Route
                path={`${props.match.path}/all-registrations`}
                component={AllRegistrations}
              />
              <Route path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </NotificationContextProvider>
    </BrowserRouter>
  );
};

export default Admin;
