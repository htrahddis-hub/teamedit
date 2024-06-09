import { Delta } from 'quill/core';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import { Socket } from 'socket.io-client';
import EditorWrapper from './editorWrapper';


export interface IOperation {
  insert?: string,
  delete?: string
}
export interface IOps {
  ops: IOperation[]
}
export interface IProps {
  user: string,
  filename:string,
  socket: Socket
}

export default function EditorSocket({ user, socket, filename }: IProps) {


  const [ops, setOps] = React.useState<Delta>();

  const message = (delta: Delta) => {

    if(delta===ops)

    socket.emit('message', { delta, user: user, filename: filename });
    // console.log('it fired');
  }

  React.useEffect(() => {

    socket.on('fwd', (data: { delta: React.SetStateAction<Delta | undefined>; }) => {
      
      setOps(data.delta);
      console.log("data recived");

    });

    return () => {
      socket.off('fwd');
    }
  }, [socket]);
  return (
    <div>
      <EditorWrapper user={user} message={message} ops={ops} />
    </div>
  );
}
