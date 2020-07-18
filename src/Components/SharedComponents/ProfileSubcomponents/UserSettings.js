import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../Context/UserContext';

const UserSettings = ({ handleChangePassword, handleIsSaved }) => {

    const {register, handleSubmit, errors, watch} = useForm();

  const { user, confirmUpdatedUser } = useContext(UserContext);


    const onSubmit = (data) => {

      const updatedUser = {
      id: user.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email
      };

      handleIsSaved()

      confirmUpdatedUser(updatedUser);
  // toggleDisplayModal("message", "workshop successfully updated");
  };
    
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