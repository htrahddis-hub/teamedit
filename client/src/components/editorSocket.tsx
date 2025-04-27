import Quill, { Delta } from 'quill/core';
import * as React from 'react';
import 'quill/dist/quill.snow.css';
import { Socket } from 'socket.io-client';
import QuillEditor from './QuillEditor';


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

  const quillRef = React.useRef<Quill | null>(null);

  return (
    <QuillEditor
      ref={quillRef}
      readOnly={false}
      defaultValue={'{}'}
      socket = {socket}
    />
  );
}
