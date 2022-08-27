import { authService } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';

const GoogleLogIn = () => {
  const onSocialClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(authService, provider);
    console.log(result);
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
