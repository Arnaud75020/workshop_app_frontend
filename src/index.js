import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserContextProvider from "./Context/UserContext";
import WorkshopContextProvider from "./Context/WorkshopContext";
import axios from "axios";

axios.defaults.baseURL =
  "https://lisbon-js-202003-pjt3-productized-backend.jsrover.wilders.dev";
console.log(axios.defaults.baseURL);

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <WorkshopContextProvider>
        <App />
      </WorkshopContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
