import React from "react";
import { Manager } from "socket.io-client";
import { useAppSelector } from "../store";
import { getUser } from "../reducers/user";
import EditorSocket from "../components/editorSocket";
import { Container, Grid } from "@mui/material";
import { NavbarMain } from "../components/partials/NavbarMain";

const url = import.meta.env.VITE_URL;

export default function EditorHome() {

  const user = useAppSelector(getUser);
  const manager = new Manager(url, {
    autoConnect: false,
    query: { 'myusername_key': user.email },
  });
  const socket = manager.socket("/");


  React.useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  });

  // const sendop = {}

  // const [fileLoaded, setFileLoaded] = React.useState<boolean>(false);
  // const [filename, setFilename] = React.useState<string>('test');

  // const createFile = (name: string) => {
  //   // console.log("here");
  //   socket.emit('createFile', { fileName: name, user: user.email });
  // }


  // const handleClick = () => {
  //   socket.emit('check', { i: 'did' })

  // };

  // const handleClick1 = () => {
  //   socket.disconnect();
  // }

  // const handleClick2 = () => {
  //   socket.connect();
  // }


  // const handleChange = () => {
  //   setFileLoaded((prev) => {
  //     return !prev;
  //   })
  // };


  return (
    <Grid sx={{height:'calc(100vh - 64px)',backgroundColor: '#e9e9e9'}}>
      <NavbarMain />
      <Container maxWidth="xl" sx={{ paddingTop:'40px',backgroundColor:'inherit',  minHeight:'100%', scrollbarGutter: 'stable both-edges' }}>
        <EditorSocket user={user.email} socket={socket} filename={'filename'} />
      </Container>
    </Grid>
    // <div style={{ marginLeft: '10px' }}>
    //   <h1>Editor team</h1>
    //   
    //   <button onClick={handleClick}>message</button>
    //   <button onClick={handleClick1}>disconnect</button>
    //   <button onClick={handleClick2}>connect</button>
    // </div>
  );
}
