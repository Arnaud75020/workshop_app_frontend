import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const { register, handleSubmit, errors } = useForm();

  const [newPasswordSent, setNewPasswordSent] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [active, setActive] = useState('inputEmail');
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const onSubmit = (data) => {
    const formData = {
      emailsList: data.email,
      subject: 'Productized - Password Recovery',
    };
    axios
      .post('/users/forgot-password', formData)
      .then((response) => response.data)
      .then((result) => {
        if (result.affectedRows === 1) {
        console.log("result", result)
          setNewPasswordSent(true);
          setActive('inputCode');
          setUserEmail(data.email);

        }
      })
      .catch((error) => {
        console.log(error.response.data.message)
        if (error.response.data.message === 'user not found') {
          setEmailNotFound(true);
        }
      });
  };

  const submitCode = (data) => {
    axios
      .post('/auth/change-password', data)
      .then((response) => response.data)
      .then((data) => {
        if (data.message === 'password correct') {
          setActive('new');
        }
      })
      .catch((error) => {
        if (error.response) {
          setPasswordErr(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  const changePassword = (data) => {
    const { newPassword, confirmPassword } = data;
    if (newPassword === confirmPassword) {
      axios.put('users/change-password', data);
      setActive('success');
    } else {
      setPasswordsDontMatch(true);
    }
  };

  return(
    <div className='forgot-password-page-container'>
      <div className='forgot-password-container'>
        <div className='forgot-password-img' />
        <div className='right-side-container'>
          <h1>Welcome to productized</h1>
          {active === "inputEmail" &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name='email'
              type='text'
              placeholder='Email Address'
              ref={register}
            />
            {emailNotFound && <p>no account with that email</p>}
            <button type='submit'>Submit</button>
            <hr />
          </form>}
          {active === "inputCode" &&
          <div>
            <p>you just recieved an email with the recovery code. Please paste it below</p>
            <form onSubmit={handleSubmit(submitCode)}>
              <input
                name='email'
                type='hidden'
                value={userEmail}
                contentEditable={false}
                ref={register}
              />
              <input
                name='password'
                type='text'
                placeholder='Recovery Code'
                ref={register}
              />
            <button type='submit'>Submit</button>
            {passwordErr && <p>invalid code</p>}
            <hr />
          </form>
          </div>
          }
          {active === "new" &&
          <form className="password-form" onSubmit={handleSubmit(changePassword)}> 
            <input
                name='email'
                type='hidden'
                value={userEmail}
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
        {active ==="success" &&
        <div className="password-recovered">
          <p>Password successfully changed!</p>
          <button><Link to='/login'>Go to login</Link></button>
        </div>
        }
          {active !=="success" &&
          <p>
            Already have an account? <Link to='/login'>login</Link>
          </p>}
        </div>
      </div>
</div>
)
};

export default ForgotPassword;
