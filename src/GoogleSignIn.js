// GoogleSignIn.js
import React from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function GoogleSignIn() {
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Signed in as ${user.displayName}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
}

export default GoogleSignIn;
