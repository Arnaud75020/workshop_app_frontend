import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WorkshopContextProvider from "../../Context/WorkshopContext";
import UserContextProvider from "../../Context/UserContext";
import NavBar from '../SharedComponents/NavBar';
import Header from '../SharedComponents/Header';
import './Attendee.scss'
import Profile from "../SharedComponents/Profile";
import MyWorkshops from "../Attendee/MyWorkshops";

const Attendee = (props) => {
  return (
    <BrowserRouter>
      <div className="page">
        <NavBar />
        <div className="body">
          <Header />
          <Switch>
            <Route path={props.match.path} exact component={MyWorkshops} />
            <Route path={`${props.match.path}/profile`} component={Profile} />
          </Switch>
        </div>
      </div>
    </BrowserRouter >
  )
}

export default Attendee