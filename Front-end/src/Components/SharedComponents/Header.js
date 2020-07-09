import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'; //context to add state
import './Header.scss';

const Header = (props) => {

  const { user } = useContext(UserContext)

  return (
    <div className='header'>
      {/* Tranform into useForm // Can be called as separate component? */}
      <form className='search-form'>
        <input id='searchbar' type='search' placeholder='Search for ...' />
        <input id='searchbtn' type='submit' value='&#128269;&#xFE0E;' />
      </form>

      {/* To be generated dynamicaly, connected to login state */}
      <div className='user'>
        <p>{`${user.firstname} ${user.lastname}`}</p>
        <Link to={`/attendee/profile`}>
          <img src='avatar5.jpeg' alt='user avatar' />
        </Link>
      </div>
    </div>
  );
};

export default Header;
