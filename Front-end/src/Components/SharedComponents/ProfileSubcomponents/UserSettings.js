import React from 'react';
import { useForm } from 'react-hook-form';

const UserSettings = ({ user, handleChangePassword }) => {

    const {register, handleSubmit, errors, watch} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        //edit user in the database
    }
    
    return(
        <div className="user-settings">
          <h2 className="user-settings-title">User Settings</h2>
          <form className="user-settings-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="name">
              <div className="label-input">
                <label htmlFor="firstname">First Name</label>
                <input
                  name="firstname"
                  id="firstname"
                  defaultValue={user.firstname}
                  type="text"
                  ref={register} />
              </div>
              <div className="label-input">
                <label htmlFor="lastname">Last Name</label>
                <input
                  name="lastname"
                  id="lastname"
                  defaultValue={user.lastname}
                  type="text"
                  ref={register} />
              </div>
            </div>
            <div className="email">
              <div className="label-input">
                <label htmlFor="email">Email Address</label>
                <input
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  type="text"
                  ref={register} />
              </div>
            </div>
            
            <button type="submit">Save Settings</button>
          </form>
          <button onClick={handleChangePassword} className="change-password-btn">change password</button>
        </div>
    );
}

export default UserSettings;