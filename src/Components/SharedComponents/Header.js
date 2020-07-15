import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'; //context to add state
import './Header.scss';
import { AuthContext } from '../../Context/AuthContext';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = (props) => {
  const { user, logout, setAuth } = useContext(UserContext);

  const { role } = user;

  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  return (
    <div className='header'>
      {/* Tranform into useForm // Can be called as separate component? */}
      {/*<form className='search-form'>
        <input id='searchbar' type='search' placeholder='Search for ...' />
        <input id='searchbtn' type='submit' value='&#128269;&#xFE0E;' />
      </form>*/}

      {/* To be generated dynamicaly, connected to login state */}
      <div className='user'>
        <div className='options'>
          <p>{`${user.firstname} ${user.lastname}`}</p>
          <img src='avatar5.jpeg' alt='user avatar' />
        </div>
        <div className='profile-dropdown'>
          <div className='profile'>
            <FaUser className='header-icons' />
            <p>
              <Link to={`/profile`}>profile</Link>
            </p>
          </div>
          <div className='logout'>
            <FiLogOut className='header-icons' />
            <p onClick={handleLogout}>logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
