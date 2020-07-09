import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Context/UserContext';
import { WorkshopContext } from '../../Context/WorkshopContext';
import './Login.scss';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const { setUserInformation } = useContext(UserContext);
  const { userWorkshops, getUserWorkshops, getWorkshop, getAttendees } = useContext(WorkshopContext);
  const { setAuth } = useContext(AuthContext);

  const onSubmit = async (data) => {
    //run validation
    //  axios
    //       .post('/auth/login', data)
    //       .then((response) => response.data)
    //       .then((user) => {
    //         getUser(user);
    //         if (user.role === 'attendee') {
    //           getUserWorkshops(user.id);
    //         }
    //       })
    //       .then(() => setAuth(true))
    //       .catch(() => console.log('Error logging in'));
    const response = await axios.post('/auth/login', data);
    console.log("response",response.data.message)
    await setUserInformation(response.data);
    const { id, role } = response.data.user
    if(role === "attendee"){
      getUserWorkshops(id)
    }
    if(role === "speaker"){
        getWorkshop(id);
        getAttendees(id)
    }
    setAuth(true);
    //redirect to role-based view
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
            <input
              name='password'
              type='password'
              placeholder='Password'
              ref={register}
            />
            <button type='submit'>Login</button>
            <hr />
          </form>
          <p>Forgot your account?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
