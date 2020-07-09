import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewWorkshop from './NewWorkshop';
import NotificationContextProvider from '../../Context/NotificationContext';
import WorkshopContextProvider from '../../Context/WorkshopContext';
import UserContextProvider from '../../Context/UserContext';
import WorkshopAttendees from './WorkshopAttendees';
import AllNotifications from './AllNotifications';
import AllWorkshops from './AllWorkshops';
import AllRegistrations from './AllRegistrations';
import NewNotification from './NewNotification';
import NavBar from '../SharedComponents/NavBar';
import Header from '../SharedComponents/Header';
import './Admin.scss';
import Profile from '../SharedComponents/Profile';

const Admin = (props) => {
  return (
    <BrowserRouter>
      <NotificationContextProvider>
        <div className='page'>
          <NavBar />
          <div className='body'>
            <Header props={props} />
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
              <Route path={`${props.match.path}/profile`} component={Profile} />
              {/*<Route path="/notifications-list" component={NotificationsList} />*/}
              <Route
                path={`${props.match.path}/all-registrations`}
                component={AllRegistrations}
              />
            </Switch>
          </div>
        </div>
      </NotificationContextProvider>
    </BrowserRouter>
  );
};

export default Admin;
