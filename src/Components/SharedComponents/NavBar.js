import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { WorkshopContext } from '../../Context/WorkshopContext';
import { MdMenu, MdClose, MdKeyboardArrowRight } from 'react-icons/md';

import MonthlySpeakers from './MonthlySpeakers';

const NavBar = () => {
  const { user, logout, setAuth } = useContext(UserContext);
  const { months } = useContext(WorkshopContext);
  const [isNavExpanded, setNavExpanded] = useState(false);
  const [checkboxCheckedOne, setCheckboxCheckedOne] = useState(false);
  const [checkboxCheckedTwo, setCheckboxCheckedTwo] = useState(false);

  const handleCheckboxOne = () => {
    setCheckboxCheckedOne(!checkboxCheckedOne)
  }

  const handleCheckboxTwo = () => {
    setCheckboxCheckedTwo(!checkboxCheckedTwo)
  }

  const toggleNavExpanded = () => {
    setNavExpanded(!isNavExpanded);
  };

  const closeNavExpanded = () => {
    if (isNavExpanded === true) {
      setNavExpanded(false);
    }
  };

  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  return (
    <div className={isNavExpanded ? 'nav-expanded' : 'nav'}>
      <div
        className={isNavExpanded ? 'nav-close-menu' : 'nav-burguer-menu'}
        onClick={toggleNavExpanded}>
        {isNavExpanded ? <MdClose /> : <MdMenu />}
      </div>
      <div className='productized-logo' />
      <div className='multi-level'>
        {user.role === 'speaker' && (
          <div className='item'>
            <Link to='/speaker' onClick={closeNavExpanded}>
              MY WORKSHOP
            </Link>
          </div>
        )}
        {user.role === 'attendee' && (
          <div className='item'>
            <Link to='/attendee' onClick={closeNavExpanded}>
              MY WORKSHOPS
            </Link>
          </div>
        )}
        {user.role === 'admin' && (
          <div>
            <div className='item'>
              <Link to='/admin' onClick={closeNavExpanded}>
                ALL WORKSHOPS
              </Link>
            </div>
            <div className='item'>
              <input onChange={handleCheckboxOne} type='checkbox' id='A' />
              <label htmlFor='A'>
                WORKSHOPS BY MONTH
                <MdKeyboardArrowRight  className="arrow"/>
              </label>
              <ul>
                {months.map((month) => {
                  return (
                    <li>
                      <div className='sub-item'>
                        <input onChange={handleCheckboxTwo} type='checkbox' id={month.month} />
                        <label htmlFor={month.month}>
                          {month.month}
                         <MdKeyboardArrowRight className="arrow"/>
                        </label>
                        <ul>
                          <MonthlySpeakers
                            month={month.month}
                            closeNavExpanded={closeNavExpanded}
                          />
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='item'>
              <Link to='/admin/all-registrations' onClick={closeNavExpanded}>
                ALL DATA
              </Link>
            </div>
            <div className='item'>
              <Link to='/admin/all-notifications' onClick={closeNavExpanded}>
                NOTIFICATIONS
              </Link>
            </div>
          </div>
        )}
        <div className='item'>
          <Link to={`/profile`} onClick={closeNavExpanded}>
            MY PROFILE
          </Link>
        </div>
        <div className='item'>
          <p onClick={handleLogout}>LOGOUT</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;