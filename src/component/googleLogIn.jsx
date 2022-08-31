import { authService } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogIn = () => {
  const Navigate = useNavigate();

  const onSocialClick = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authService, provider);
    Navigate('/');
  };

  return (
    <>
      <button name='google' onClick={onSocialClick}>
        Continue with Google
      </button>
    </>
  );
};

export default GoogleLogIn;
