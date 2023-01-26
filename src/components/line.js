import React, { useEffect, useState } from 'react'
import SignOut from './SignOut';
import { auth, db } from "../firebase";
import { FiveG } from '@mui/icons-material';
import SendMessage from './SendMessage';

function Line() {
  // Use "useState" to manage the state
  // Original value is an emoty array
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // collection is a function to fetch data from firebase
    db.collection("messages")
    // orderBy is a function to to manage the order of show data is showen
    .orderBy("createdAt")
    // only 50 messages to be showen
    .limit(50)
    // onSnapshot is a function you can get from firebase. in snapshot, you have variety of data that you can fetch
    // When page is loaded, this useState function renders the data once. by updating with snapshot
    .onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    })
  }, [])
  // ↑↑ as we do not need multiple rendering, the second argument is empty
  return (
    <div>
      {console.dir(messages)}
      <SignOut />
      <div className='messages'>
        {messages.map(({id, text, photoURL, uid}) => (
          <div>
            <div key={id} className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}>
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
