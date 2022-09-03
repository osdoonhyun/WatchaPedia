import { authService } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import GoogleLogIn from '../component/googleLogIn';

const SignUp = (isLoggedIn) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isLoggedIn) {
        await createUserWithEmailAndPassword(authService, email, password);
        console.log('회원가입 됨!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' value={email} onChange={onChange} required />
        <input name='password' type='password' placeholder='Password' value={password} onChange={onChange} required />
        <input type='submit' value='회원가입' />
        <span>{error}</span>
      </form>
      <GoogleLogIn />
    </>
  );
};

export default SignUp;
