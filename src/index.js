import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserContextProvider from './Context/UserContext'
import WorkshopContextProvider from './Context/WorkshopContext'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <WorkshopContextProvider>
        <App />
      </WorkshopContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
