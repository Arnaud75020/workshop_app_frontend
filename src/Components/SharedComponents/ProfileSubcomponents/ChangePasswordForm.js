import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import './ChangePasswordForm.scss'
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';


const ChangePasswordForm = ({ handleChangePassword }) => {

  const { user } = useContext(UserContext);
    

    const [passwordErr, setPasswordErr] = useState(false)
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
    const [active, setActive] = useState("current")

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
          axios
            .post('/auth/change-password', data)
            .then((response) => response.data)
            .then((data) => {
                if(data.message === "password correct"){
                    setActive("new")
                }
            })
            .catch((error) => {
                 if (error.response) {
                    setPasswordErr(true)
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const changePassword = (data) => {
        const { newPassword, confirmPassword } = data;
        if(newPassword === confirmPassword){
            axios
                .put('users/change-password', data )
                setActive("success")
                setTimeout(() => handleChangePassword(), 1500)
                setTimeout(() => setActive("current"), 2000)
        } else{
            setPasswordsDontMatch(true)
        }
    }

    return(
        <div className="change-password-modal">
           {active === "current" && 
            <form className="password-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    name='email'
                    type='hidden'
                    value={user.email}
                    contentEditable={false}
                    ref={register}
                 />
                <label htmlFor="previous-password">insert current password</label>
                <input
                    name="password"
                    id="previous-password"
                    type="password"
                    ref={register} />
                {passwordErr && <p>incorrect password</p>}
                <div className="change-password-btns">
                    <button type="submit">submit</button>
                    <button className="cancel" onClick={handleChangePassword}>cancel</button>
                </div>
            </form>}
            {active === "new" &&
            <form className="password-form" onSubmit={handleSubmit(changePassword)}> 
                <input
                    name='email'
                    type='hidden'
                    value={user.email}
                    contentEditable={false}
                    ref={register}
                />
                
                <label htmlFor="new-password">New Password</label>
                <input
                    name="newPassword"
                    id="new-password"
                    type="password"
                    ref={register({
                        required: true,
                        minLength: { value: 8, message: "minimum 8 characters" },
                      })} 
                />
                {errors.newPassword && <p>{errors.newPassword.message}</p>}
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input
                    name="confirmPassword"
                    id="confirm-password"
                    type="password"
                    ref={register} 
                />
            {passwordsDontMatch && <p>passwords don't match</p>}
            <button type="submit">submit</button>
            </form>}
            {active === "success" &&
            <div className="password-form">
                <p>password changed</p>
            </div>
            }
        </div>        
    )
}

export default ChangePasswordForm;