import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.scss'



const ForgotPassword = () => {

  const { register, handleSubmit, reset, errors } = useForm();

  const [newPasswordSent, setNewPasswordSent] = useState(false)
  const [emailNotFound, setEmailNotFound] = useState(false)

  const onSubmit = (data) => {
      const newPassword ="1qoj4ofmfo40"
      const formData = {
        email: data.email,
        newPassword: newPassword
      }
    axios
        .post('/users/forgot-password', formData)
        .then(response => response.data)
        .then((result) => {
          if(result.affectedRows === 1){
            setNewPasswordSent(true)
          }
        })
        .catch((error) => {
          if (error.response.data.message === 'user not found'){
            setEmailNotFound(true)
          }
        })

  }

    return(
        <div className='forgot-password-page-container'>
          <div className='forgot-password-container'>
            <div className='forgot-password-img' />
            <div className='right-side-container'>
              <h1>Welcome to productized</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name='email'
                  type='text'
                  placeholder='Email Address'
                  ref={register}
                />
                {newPasswordSent && <p>you just recieved an email with your new password</p>}
                {emailNotFound && <p>no account with that email</p>}
                <button type='submit'>Submit</button>
                <hr />
              </form>
              <p>
                Already have an account? <Link to='/login'>login</Link>
              </p>
            </div>
          </div>
    </div>
    )
}

export default ForgotPassword
