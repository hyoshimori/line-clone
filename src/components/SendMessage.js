import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { db, auth } from "../firebase.js";
import firebase from "firebase/compat/app";
import SendIcon from "@mui/icons-material/Send";


function SendMessage() {
  const [message, setMessage] = useState('');

  function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  }
  return (
    <div>
     <form onSubmit={sendMessage}>
      <div className='sendMessage'>
        <input type="text"
               placeholder='Input messages'
               onChange={(e) => setMessage(e.target.value)}
               value={message}
               />
      </div>
     </form>
    </div>
  )
}

export default SendMessage
