import React, { useEffect, useState, useRef } from 'react'
import SignOut from './SignOut';
import { auth, db } from "../firebase";
import { FiveG } from '@mui/icons-material';
import SendMessage from './SendMessage';

function Line() {

  const deleteMessage = (messageId) => {
    db.collection("messages").doc(messageId).delete();
  }

  // Create a reference variable "messagesEndRef" to track the last message element
  const messagesEndRef = useRef(null);
  // Use "useState" to manage the state
  // Original value is an emoty array
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // Scroll to the bottom of the page on load
    window.scrollTo(0,document.body.scrollHeight);
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
      // Check if the reference to the end of the messages exists, if it does, smoothly scroll to it
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
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
                {/* <button onClick={() => deleteMessage(id)}>Delete</button> */}
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      <SendMessage />
    </div>
  )
}

export default Line
