import React from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { getUser } from "../reducers/user";
import { getFiles } from "../reducers/file";
import { fetch, create } from "../actions/file";
import { Delta } from "quill/core";
import FileList from "../components/fileList";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    navigate('/editor');
  };

  const handleChange = () => {
    setFileLoaded((prev) => {
      return !prev;
    })
  };

  const handleChangeI = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };

  const handleClickFile = () => {
    dispatch(create(filename));
  }

  return (
    <div style={{ marginLeft: '10px' }}>
      <h1>Editor team</h1>
      {fileLoaded || <FileList data={files.data} />}
      <button onClick={handleClick}>Open Editor</button>
      <br />
      <input type="text" value={filename} onChange={handleChangeI} />{" "}
      <button onClick={handleClickFile}>createFile</button>
    </div>
  );
}
