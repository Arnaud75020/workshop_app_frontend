import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { WorkshopContext } from '../../Context/WorkshopContext';
import { MdMenu, MdClose} from 'react-icons/md';


import MonthlySpeakers from './MonthlySpeakers'
import { AuthContext } from '../../Context/AuthContext';
const NavBar = () => {
  const { speakers, user, logout } = useContext(UserContext);
  const { setAuth} = useContext(AuthContext);
  const { months } = useContext(WorkshopContext);
  const [isNavExpanded, setNavExpanded] = useState(false)

  const toggleNavExpanded = () => {
    setNavExpanded(!isNavExpanded)
   // if(isNavExpanded === true){
   //   setNavExpanded(false)
   // }
  }

  const handleLogout = () => {
    logout()
    setAuth(false)
  }

  return (
    <div className={isNavExpanded ? 'nav-expanded' : 'nav'}>
      <div className={isNavExpanded ? 'nav-close-menu' : 'nav-burguer-menu'} onClick={toggleNavExpanded}>{isNavExpanded ? <MdClose /> : <MdMenu />}</div>
      <div className='multi-level'>
        {user.role === "speaker" &&
        <div className="item">
            <Link to="/speaker" onClick={toggleNavExpanded}>MY WORKSHOP</Link>
        </div>
        }
        {user.role === "attendee" &&
        <div className="item">
            <Link to="/attendee" onClick={toggleNavExpanded}>MY WORKSHOPS</Link>
        </div>
        }
        {user.role === "admin" &&
        <div>
            <div className='item'>
              <Link to='/admin' onClick={toggleNavExpanded}>ALL WORKSHOPS</Link>
            </div>
            <div className='item'>
              <input type='checkbox' id='A' />
              <label htmlFor='A'>
                WORKSHOPS BY MONTH
                {/* add animation */}
                <img src='chevron-right-1.png' className='arrow' />
              </label>
              <ul>
                {months.map(month => {
                  return(
                  <li>
                    <div className='sub-item'>
                      <input type='checkbox' id={month.month} />
                      <label htmlFor={month.month}>
                        {month.month}
                        {/* add animation */}
                        <img src='chevron-right-1.png' className='arrow' />
                     </label>
                     <ul>
                      <MonthlySpeakers month={month.month} toggleNavExpanded={toggleNavExpanded}/>
                     </ul>
                    </div>
                  </li>
                  )
                })}
              </ul>
            </div>
            <div className='item'>
              <Link to='/admin/all-registrations' onClick={toggleNavExpanded}>ALL DATA</Link>
            </div>
            <div className='item'>
              <Link to='/admin/all-notifications' onClick={toggleNavExpanded}>NOTIFICATIONS</Link>
            </div>
        </div>}
            <div className='item'>
              <Link to={`/profile`} onClick={toggleNavExpanded}>MY PROFILE</Link>
            </div>
            <div className='item'>
              <p onClick={handleLogout}>LOGOUT</p>
            </div>
        <div className='productized-logo' />
      </div>
    </div>
  );
};

export default NavBar;
