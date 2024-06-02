import React from "react";
import Editor from "../components/editor";
import { useAppSelector, useAppDispatch } from "../store";
import { getUser } from "../reducers/user";
import { getFiles } from "../reducers/file";
import { fetch } from "../actions/file";
import { Delta } from "quill/core";
import { Manager } from "socket.io-client";
import File from "../components/file";
import FileList from "../components/fileList";

export default function Home() {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // socket.connect();
    dispatch(fetch())
    return () => {
      // socket.disconnect();
    }
  }, []);

  const user = useAppSelector(getUser);
  const files = useAppSelector(getFiles);

  const [fileLoaded, setFileLoaded] = React.useState<boolean>(false);
  const [filename, setFilename] = React.useState<string>('');

  // const manager = new Manager("http://localhost:3000", {
  //   autoConnect: false,
  //   query: { 'myusername_key': user.email },
  // });
  // const socket = manager.socket("/");



  const message = (delta: Delta) => {
    // socket.emit('message', { ...delta, user: user.email });
  }

  const createFile = (name: string) => {
    console.log("here");
    // socket.emit('createFile', { fileName: name, user: user.email });
  }


  const handleClick = () => {
    console.log(files);
  };

  const handleChange = () => {
    setFileLoaded((prev) => {
      return !prev;
    })
  };


  return (
    <div style={{ marginLeft: '10px' }}>
      <h1>Editor team</h1>

      {fileLoaded || <FileList data={files.data} />}
      <button onClick={handleChange}>filechange</button>
      {/* <p>enter the file to open</p>
      <input value={filename} onChange={handleChange} required />
      <button onClick={handleClick}>Open File</button>
      <File createFile={createFile} /> */}
      <button onClick={handleClick}>get File</button>
      {!fileLoaded ||
        <Editor user={user.email} message={message} />}
    </div>
  );
}
