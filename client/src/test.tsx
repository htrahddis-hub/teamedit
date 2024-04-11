import React from 'react';
import { io, Manager } from "socket.io-client";
import { test } from "./api";
import './App.css';

function App() {

  React.useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  });

  const [email, setEmail] = React.useState<string>("");
  const [room, setRoom] = React.useState<string>("");

  const manager = new Manager("http://localhost:3000", {
    autoConnect: false,
    query: { 'myusername_key': email },
  });

  const socket = manager.socket("/"); // main namespace

  const handleClick = async function () {
    // const ans: string = await test();
    socket.emit('message', "hello from socket");
  }

  const handleConnect = async function () {
    socket.connect();
  }

  const handleDisconnect = async function () {
    socket.disconnect();
  }

  const handleInput = async function (event:React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  const handleInput1 = async function (event:React.ChangeEvent<HTMLInputElement>) {
    setRoom(event.target.value);
  }

  const handleCreateRoom= async function () {
    await test(socket);
  }


  return (
    <div style={{marginLeft:"200px",marginTop:"200px"}}>
      Hello world
      <button onClick={handleClick}>
        presshjfdr
      </button>
      <input type="email" name="email" id="" value={email} onChange={handleInput} />
      <button onClick={handleConnect}>
        connect
      </button>
      <button onClick={handleDisconnect}>
        Disconnect
      </button>
      <input type="email" name="email" id="" value={room} onChange={handleInput1} />
      <button onClick={handleCreateRoom}>
        create room
      </button>
    </div>
  );
}

export default App;
