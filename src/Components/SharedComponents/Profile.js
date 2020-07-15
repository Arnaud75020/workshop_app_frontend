import React, { useContext, useState } from 'react';
import ChangePhoto from './ProfileSubcomponents/ChangePhoto';
import './Profile.scss'
import EditMyWorkshops from './ProfileSubcomponents/EditMyWorkshops';
import UserSettings from './ProfileSubcomponents/UserSettings';
import ContactSettings from './ProfileSubcomponents/ContactSettings';
import ChangePasswordForm from './ProfileSubcomponents/ChangePasswordForm';
import { UserContext } from '../../Context/UserContext';

const Profile = () => {

  const { user, confirmUpdatedUser } = useContext(UserContext)

  const [changePasswordDisplaying, setChangePasswordDisplaying] = useState(false)

  const handleChangePassword = () => {
    setChangePasswordDisplaying(!changePasswordDisplaying)
  }

    return(
      <div className="profile"> 
        <h1>Profile</h1>
        <div className="profile-body">
          <div className="left">
            <ChangePhoto />
            <EditMyWorkshops />
          </div>
          <div className="right">
            <UserSettings user={user} handleChangePassword={handleChangePassword} confirmUpdatedUser={confirmUpdatedUser} />
            <ContactSettings user={user} confirmUpdatedUser={confirmUpdatedUser} />
          </div>
        </div>
        {changePasswordDisplaying && 
        <ChangePasswordForm  user={user} handleChangePassword={handleChangePassword}/>}
      </div>
       
    )
}

export default Profile