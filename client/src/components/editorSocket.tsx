import Quill, { Delta } from 'quill/core';
import * as React from 'react';
import 'quill/dist/quill.snow.css';
import { Socket } from 'socket.io-client';
import QuillEditor from './QuillEditor';


export interface IProps {
  socket: Socket
}

export default function EditorSocket({socket}: IProps) {

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
