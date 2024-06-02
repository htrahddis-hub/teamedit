import React from "react";
import { Delta } from "quill/core";
import { Manager } from "socket.io-client";
import Editor from "../components/editor";
import { useAppSelector } from "../store";
import { getUser } from "../reducers/user";


export default function EditorHome() {

  const user = useAppSelector(getUser);
  const manager = new Manager("http://localhost:3000", {
    autoConnect: false,
    query: { 'myusername_key': user.email },
  });
  const socket = manager.socket("/");

  React.useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, [socket]);

  const [fileLoaded, setFileLoaded] = React.useState<boolean>(false);
  const [filename, setFilename] = React.useState<string>('test');


  const message = (delta: Delta) => {
    socket.emit('message', { ...delta, user: user.email, filename: filename });
    console.log('it fired');


  }

  const createFile = (name: string) => {
    console.log("here");
    socket.emit('createFile', { fileName: name, user: user.email });
  }


  const handleClick = () => {
    socket.emit('message', { i: 'did' })

  };

  const handleChange = () => {
    setFileLoaded((prev) => {
      return !prev;
    })
  };


  return (
    <div style={{ marginLeft: '10px' }}>
      <h1>Editor team</h1>
      <Editor user={user.email} message={message} />
      <button onClick={handleClick}>message</button>
    </div>
  );
}
