import { authService } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import GoogleLogIn from '../component/googleLogIn';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ourUer, setOurUser] = useState(true);
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
      if (ourUer) {
        let data;
        data = await signInWithEmailAndPassword(authService, email, password);
        console.log('로그인 됨!');
      }
    } catch (error) {
      setOurUser(false);
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' value={email} onChange={onChange} required />
        <input name='password' type='password' placeholder='Password' value={password} onChange={onChange} required />
        <input type='submit' value={ourUer ? 'Log In' : '회원가입을 해주세요'} />
        <span>{error}</span>
      </form>
      <GoogleLogIn />
    </>
  );
};

export default LogIn;
