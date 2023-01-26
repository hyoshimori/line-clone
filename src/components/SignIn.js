import { Button } from '@mui/material'
import React from 'react'
import firebase from "firebase/compat/app";
import { auth } from "../firebase"

// creating a function with wich we can log in to google account
function SignIn() {
  function signInWithGoogle(){
    // Method you can use to have acces to google account
    // GoogleAuthProvider is a class provided by the Firebase library that allows you to authenticate users using their Google account
    const provider = new firebase.auth.GoogleAuthProvider();
    // This auth is from firebase.js file (passing personal credentials)
    // signInWithPopup is also from the Firebase library with which we can use pop-up for signing in
    auth.signInWithPopup(provider);
  }
  return (
    <div>
      <Button onClick={signInWithGoogle}>
        Log in with Google
      </Button>
    </div>
  )
}

export default SignIn
