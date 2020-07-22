import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import './Login.scss';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { setUserInformation, setAuth } = useContext(UserContext);

  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const onSubmit = async (data) => {
    axios
      .post('/auth/login', data)
      .then((response) => response.data)
      .then((user) => {
        setUserInformation(user);
      })
      .then(() => setAuth(true))
      .catch((error) => {
        if(error){

        if (error.response.data.message === 'Incorrect email.') {
          setIncorrectEmail(true);
          if (incorrectPassword === true) {
            setIncorrectPassword(false);
          }
        } else if (error.response.data.message === 'Incorrect password.') {
          setIncorrectPassword(true);
          if (incorrectEmail === true) {
            setIncorrectEmail(false);
          }
        }
      }
      });
  };

  return (
    <div className='login-page-container'>
      <div className='login-container'>
        <div className='login-img' />
        <div className='right-side-container'>
          <h1>Welcome to productized</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name='email'
              type='text'
              placeholder='Email Address'
              ref={register}
            />
            {incorrectEmail && <p>no user found with this email</p>}
            <input
              name='password'
              type='password'
              placeholder='Password'
              ref={register}
            />
            {incorrectPassword && <p>incorrect password</p>}
            <button type='submit'>Login</button>
            <hr />
          </form>
          <p>
            Don't have an account? <Link to='/signup/edjDFKJ'>create one</Link>
          </p>
          <p><Link to='/forgot-password'>Forgot your password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;