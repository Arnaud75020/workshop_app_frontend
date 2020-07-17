import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Context/UserContext';
import { WorkshopContext } from '../../Context/WorkshopContext';
import { Link } from 'react-router-dom';
import './Login.scss';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const { setUserInformation, setAuth } = useContext(UserContext);
  const {
    userWorkshops,
    getUserWorkshops,
    getWorkshop,
    getAttendees,
  } = useContext(WorkshopContext);

  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const onSubmit = async (data) => {
    //run validation
    axios
      .post('/auth/login', data)
      .then((response) => response.data)
      .then((user) => {
        console.log(user);
        setUserInformation(user);
        const { id, role } = user.user;
        if (role === 'attendee') {
          // getUserWorkshops(user.id);
        }
        if (role === 'speaker') {
          ////////???////////
          getWorkshop(id);
          getAttendees(id);
          ////////???//////
        }
      })
      .then(() => setAuth(true))
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === 'Incorrect email.') {
          setIncorrectEmail(true);
          if (incorrectPassword === true) {
            setIncorrectPassword(false);
          }
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.response.data.message === 'Incorrect password.') {
          setIncorrectPassword(true);
          if (incorrectEmail === true) {
            setIncorrectEmail(false);
          }
          //console.log(error.request);
        }
      });
    //const response = await axios.post('/auth/login', data);
    //console.log("response",response)
    //await setUserInformation(response.data);
    //const { id, role } = response.data.user
    //if(role === "attendee"){
    //  getUserWorkshops(id)
    //}
    //if(role === "speaker"){
    //    getWorkshop(id);
    //    getAttendees(id)
    //}
    //setAuth(true);
    ////redirect to role-based view
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
            don't have an account yet?{' '}
            <Link to='/signup/edjDFKJ'>create an account</Link>
          </p>

          <p>Forgot your account?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
