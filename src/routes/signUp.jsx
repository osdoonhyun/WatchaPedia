import { authService } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import GoogleLogIn from '../component/googleLogIn';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ourUer, setOurUser] = useState(false);
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
    let data;
    try {
      if (!ourUer) {
        data = await createUserWithEmailAndPassword(authService, email, password);
        setOurUser(true);
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
        <input type='submit' value={ourUer ? '회원가입이 완료되었습니다.' : 'Sign Up'} />
        <span>{error}</span>
      </form>
      <GoogleLogIn />
    </>
  );
};

export default SignUp;
