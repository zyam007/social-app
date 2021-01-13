import React, { useState, useEffect } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import InputOptions from './InputOptions';
import {
  Image as ImageIcon,
  Subscriptions,
  EventNote,
  CalendarViewDay,
} from '@material-ui/icons';
import Post from './Post';
import { db } from './firebase';
import firebase from 'firebase';

export default function () {
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  //real time listener
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    db.collection('posts').add({
      name: 'Nick S',
      description: 'this is a test',
      message: input,
      photoUrl:
        'https://images.unsplash.com/photo-1530041686259-53d26f863313?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHVnfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOptions Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOptions Icon={Subscriptions} title="Video" color="#C7A33C" />
          <InputOptions Icon={EventNote} title="Event" color="#C0CBCD" />
          <InputOptions
            Icon={CalendarViewDay}
            title="Write Article"
            color="#7FC15E"
          />
        </div>
      </div>
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </div>
  );
}
