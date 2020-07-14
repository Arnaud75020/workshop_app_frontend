import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { WorkshopContext } from '../../Context/WorkshopContext';

import MonthlySpeakers from './MonthlySpeakers'
const NavBar = () => {
  const { speakers, user } = useContext(UserContext);
  const { months } = useContext(WorkshopContext);

  return (
    <div className='nav'>
      <div className='multi-level'>
        <div className='item'>
          <img src='Logo_productized.png' className='logo' />
        </div>
        {user.role === "speaker" &&
        <div className="item">
            <Link to="/speaker">My Workshop</Link>
        </div>
        }
        {user.role === "attendee" &&
        <div className="item">
            <Link to="/attendee">My Workshops</Link>
        </div>
        }
        {user.role === "admin" &&
        <div>
            <div className='item'>
              <Link to='/admin'>ALL WORKSHOPS</Link>
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
                      <MonthlySpeakers month={month.month}/>
                     </ul>
                    </div>
                  </li>
                  )
                })}
              </ul>
            </div>
            <div className='item'>
              <Link to='/admin/all-registrations'>ALL DATA</Link>
            </div>
            <div className='item'>
              <Link to='/admin/all-notifications'>NOTIFICATIONS</Link>
            </div>
        </div>}
      </div>
    </div>
  );
};

export default NavBar;
