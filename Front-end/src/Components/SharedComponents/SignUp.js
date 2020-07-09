import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.scss';
import axios from 'axios';

const SignUp = () => {
  const { register, handleSubmit, reset, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    console.log(data);
    //run validation
    axios
      .post('/auth/signup', data)
      .then((response) => console.log(response.data));
    reset();
    //redirect to role-based view
  };

  return (
    <div className='signUp-page-container'>
      <div className='signUp-container'>
        <div className='signUp-img' />
        <div className='signUp-right-side-container'>
          <h1>Create an Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='name'>
              <input
                name='firstname'
                type='text'
                placeholder='First Name'
                ref={register({
                  required: 'First Name is required',
                })}
              />
              <input
                name='lastname'
                type='text'
                placeholder='Last Name'
                ref={register({ required: 'Last Name is required' })}
              />
            </div>
            <div className='comp-country'>
              <input
                name='company'
                type='text'
                placeholder='Company'
                ref={register}
              />
              <input
                name='country'
                type='text'
                placeholder='Country'
                ref={register({ required: 'Country is required' })}
              />
            </div>
            <input
              id='email'
              name='email'
              type='text'
              placeholder='Email Address'
              ref={register({ required: 'Email is required' })}
            />
            <div className='password'>
              <input
                name='password'
                type='password'
                placeholder='Password'
                ref={register({
                  required: 'Password is required',
                  minLength: { value: 8, message: 'minimum 8 characters' },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <input
              name='role_id'
              type='hidden'
              value='2'
              contentEditable={false}
              ref={register}
            />
            <input
              name='max_workshops'
              type='hidden'
              value='3'
              contentEditable={false}
              ref={register}
            />
            <button type='submit'>Register Account</button>
            <hr />
          </form>
          <p>Forgot your account?</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
