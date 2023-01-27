import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { db, auth } from "../firebase.js";
import firebase from "firebase/compat/app";
import SendIcon from "@mui/icons-material/Send";


function SendMessage() {
  const [message, setMessage] = useState('');

  function sendMessage(e) {
    // preventDefault prevents webpage from being rerendered
    e.preventDefault();
    // fetch uid and photURL from firebase with currentUser helper
    const { uid, photoURL } = auth.currentUser;
    // with collection function, we can have access to data. This is fetching data with "messages"
    // You can use add function simply to add to firebase
    db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
    // ↑↑ Delete inputs when rerendered
  }

  // ********** NOTE ********** //
  // with Onchange, we fetch the input written by users
  // So each time there is a change (each hit to keyboards), the use state is being updated
  // ********** NOTE ********** //
  // With onSubmmit, we use sendMEssage function to update onto firebase
  // ********** NOTE ********** //
  return (
    <div className="send__message__bottom">
     <form onSubmit={sendMessage}>
      <div className='sendMessage'>
        <Input className="send__message__bottom__input"
               type="text"
               placeholder='Input messages'
               onChange={(e) => setMessage(e.target.value)}
               value={message}
               />
        <Button><SendIcon style={{ color: "black", marginLeft: "10px" }}/></Button>
      </div>
     </form>
    </div>
  )
}

export default SendMessage
