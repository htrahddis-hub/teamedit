import { Delta } from 'quill/core';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import { Socket } from 'socket.io-client';
import EditorWrapper from './editorWrapper';
import _ from "lodash";


export interface IOperation {
  insert?: string,
  delete?: string
}
export interface IOps {
  ops: IOperation[]
}
export interface IProps {
  user: string,
  filename: string,
  socket: Socket
}

export default function EditorSocket({ user, socket, filename }: IProps) {


  const [ops, setOps] = React.useState<Delta>(new Delta());

  const message = (delta: Delta) => {
    console.log({ ...delta });
    console.log(ops);


    if (_.isEqual({ ...delta }, ops)) {
      console.log("here1");
      return;
    } else {
      console.log("here2");
      socket.emit('message', { delta, user: user, filename: filename });
      console.log('here3');

    }
    // console.log('it fired');
  }

  React.useEffect(() => {

    socket.on('fwd', (data: { delta: React.SetStateAction<Delta> }) => {

      setOps(data.delta);
      console.log("data recived");

    });

    return () => {
      socket.off('fwd');
    }
  }, []);
  return (
    <div>
      <EditorWrapper user={user} message={message} ops={ops} />
    </div>
  );
}
