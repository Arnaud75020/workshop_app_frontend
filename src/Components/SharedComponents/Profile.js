import React, {  useState, useEffect } from 'react';
import './Profile.scss';
import UserSettings from './ProfileSubcomponents/UserSettings';
import ContactSettings from './ProfileSubcomponents/ContactSettings';
import ChangePasswordForm from './ProfileSubcomponents/ChangePasswordForm';

const Profile = () => {

  useEffect(()=> {
    console.log("PROFILE MOUNTED")
  },[])

  const [changePasswordDisplaying, setChangePasswordDisplaying] = useState(
    false
  );

  const [isSaved, setIsSaved] = useState(false)

  const handleIsSaved = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 20000)
  }

  const handleChangePassword = () => {
    setChangePasswordDisplaying(!changePasswordDisplaying);
  };

  console.log("isSaved", isSaved)

  return (
    <div className='profile'>
      <div className="profile-header">
        <h1>Profile</h1>
        {isSaved && <p>saved</p>}
      </div>
      <div className='profile-body'>
        <div className='right'>
          <UserSettings
            handleChangePassword={handleChangePassword}
            handleIsSaved={handleIsSaved}
          />
          <ContactSettings
            handleIsSaved={handleIsSaved}
          />
        </div>
      </div>
      {changePasswordDisplaying && (
        <ChangePasswordForm
          handleChangePassword={handleChangePassword}
        />
      )}
    </div>
  );
};

export default Profile;
