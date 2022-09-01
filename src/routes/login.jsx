import { authService } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import GoogleLogIn from '../component/googleLogIn';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorM, setErrorM] = useState('');

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
      if (isLoggedIn === false) {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setErrorM(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' value={email} onChange={onChange} required />
        <input name='password' type='password' placeholder='Password' value={password} onChange={onChange} required />
        <input type='submit' value='Log In' />
        <span>{errorM}</span>
      </form>
      <GoogleLogIn />
    </>
  );
};

export default LogIn;
