import React, { useState } from 'react';
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

export default function () {
  const [posts, setPosts] = useState([]);

  const sendPost = (e) => {
    e.preventDefault();
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input type="text" />
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
      {posts.map((post) => (
        <Post />
      ))}
      <Post
        name="Yanna"
        description="This is a test"
        message="this is working"
      />
    </div>
  );
}
