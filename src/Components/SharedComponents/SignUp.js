import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './SignUp.scss';
import axios from 'axios';

const SignUp = (props) => {
  const cryptedRoleId = props.match.params.id;
  let roleId = '';

  switch (cryptedRoleId) {
    case 'DFJLMdk123CDLEcjks':
      roleId = 1;
      break;
    case 'dfqlQIF':
      roleId = 2;
      break;
    default:
      roleId = 3;
      break;
  }

  const { register, handleSubmit, reset, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const onSubmit = (data) => {
    const { password, repeatPassword } = data;
    if (password === repeatPassword) {
      const {
        firstname,
        lastname,
        company,
        country,
        email,
        role_id,
        max_workshops,
        registration_date,
      } = data;
      const formData = {
        firstname: firstname,
        lastname: lastname,
        company: company,
        country: country,
        email: email,
        role_id: role_id,
        max_workshops: max_workshops,
        registration_date: registration_date,
        password: password,
      };
      console.log(formData);

      axios
        .post('/auth/signup', formData)
        .then((response) => console.log('SIGNUP RES DATA', response.data));
      reset();
      //redirect to role-based view
    } else {
      setPasswordsMatch(false);
    }
  };

  var todayDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    console.log('Newdate', todayDate);
    console.log('id', props.match.params.id);
  });

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
                  required: true,
                })}
              />
              {errors.firstname && <p>please add your firstname</p>}
              <input
                name='lastname'
                type='text'
                placeholder='Last Name'
                ref={register({ required: true })}
              />
              {errors.lastname && <p>please add your lastname</p>}
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
                ref={register({ required: true })}
              />
              {errors.country && <p>please add your country</p>}
            </div>
            <input
              id='email'
              name='email'
              type='text'
              placeholder='Email Address'
              ref={register({ required: true })}
            />
            {errors.email && <p>please add your email</p>}
            <div className='password'>
              <input
                name='password'
                type='password'
                placeholder='Password'
                ref={register({
                  required: true,
                  minLength: { value: 8, message: 'minimum 8 characters' },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <input
                name='repeatPassword'
                type='password'
                placeholder='Repeat Password'
                ref={register({
                  required: true,
                })}
              />
              {errors.repeatPassword && <p>please repeat your password</p>}
              {!passwordsMatch && <p>passwords don't match</p>}
            </div>
            <input
              name='role_id'
              type='hidden'
              value={roleId}
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
            <input
              name='registration_date'
              type='hidden'
              value={todayDate}
              contentEditable={false}
              ref={register}
            />
            <button type='submit'>Register Account</button>
            <hr />
          </form>
          <p>
            already have an account? <Link to='/login'>login</Link>
          </p>
          <p>Forgot your account?</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
