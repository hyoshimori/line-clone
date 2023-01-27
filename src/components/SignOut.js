import React from 'react'
import { auth } from '../firebase'
import { Button } from "@mui/material"

function SignOut() {
  return (
    <div className='header'>
      <Button style={{color: "white", fontSize: "15px"}} onClick={() => auth.signOut()}>
        Sign Out
      </Button>
      <h3>{auth.currentUser.displayName}</h3>
    </div>
  )
}

export default SignOut
