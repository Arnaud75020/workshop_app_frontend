import React, { useContext } from 'react';
import ChangePhoto from './ProfileSubcomponents/ChangePhoto';
import './Profile.scss'
import EditMyWorkshops from './ProfileSubcomponents/EditMyWorkshops';
import UserSettings from './ProfileSubcomponents/UserSettings';
import ContactSettings from './ProfileSubcomponents/ContactSettings';
import { UserContext } from '../../Context/UserContext';

const Profile = () => {

  const { user } = useContext(UserContext)

    return(
      <div className="profile"> 
        <h1>Profile</h1>
        <div className="profile-body">
          <div className="left">
            <ChangePhoto />
            <EditMyWorkshops />
          </div>
          <div className="right">
            <UserSettings user={user} />
            <ContactSettings user={user} />
          </div>
        </div>
      </div>
       
    )
}

export default Profile