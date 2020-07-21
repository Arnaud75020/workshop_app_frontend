import React, {useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from '../SharedComponents/NavBar';
import './Attendee.scss'
import Profile from "../SharedComponents/Profile";
import MyWorkshops from "../Attendee/MyWorkshops";

const Attendee = (props) => {

  useEffect(() => {
    console.log("ATTENDEE")
  },[])

  return (
    <BrowserRouter>
      <div className="page">
        <NavBar />
        <div className="body">
          <Switch>
            <Route path={props.match.path} exact component={MyWorkshops} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Attendee