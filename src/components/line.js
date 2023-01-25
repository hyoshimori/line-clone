import React, { useEffect, useState } from 'react'
import SignOut from './SignOut';
import { db } from "../firebase";
import { FiveG } from '@mui/icons-material';
import SendMessage from './SendMessage';

function Line() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
    .orderBy("createdAt")
    .limit(50)
    .onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    })
  }, [])
  return (
    <div>
      {console.dir(messages)}
      <SignOut />
      <div className='messages'>
        {messages.map(({id, text, photoURL, uid}) => (
          <div>
            <div key={id}>
              <img src={photoURL} alt="" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage />
    </div>
  )
}

export default Line
