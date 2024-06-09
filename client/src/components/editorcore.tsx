import { Delta } from 'quill/core';
import * as React from 'react';
import { Quill } from 'react-quill';
import ReactQuill from 'react-quill';
import QuillEditor from "react-quill";
import 'react-quill/dist/quill.snow.css';




export interface IOperation {
  insert?: string,
  delete?: string
}


export interface IOps {
  ops: IOperation[]
}

export interface IProps {
  setDeltaArray: React.Dispatch<React.SetStateAction<Delta[] | undefined>>
  delta: Delta | undefined
}


export default function EditorCore({ setDeltaArray, delta }: IProps) {

  const [value, setValue] = React.useState<string | Delta | undefined>('');
  const handleClick1 = () => {
    const death = new Delta().insert('White');
    quill.current?.editor?.setContents(death);
  }

  React.useEffect(() => {
    if (delta)
      quill.current?.editor?.setContents(delta);
  }, [delta]);

  const quill = React.useRef<ReactQuill>();
  const handleChange = (value: any) => {
    setDeltaArray(prev => {
      prev?.push(quill.current?.lastDeltaChangeSet)
      return prev
    });
    setValue(value);
    // console.log(value);
  }


  const handleClick = () => {
    console.log(quill.current?.getEditorContents);
    console.log(value);
  }

  return (
    <div>
      <QuillEditor
        theme="snow"
        value={value}
        onChange={handleChange}
        ref={(el) => { if (el !== null) quill.current = el }}
      />
      <button onClick={handleClick1}>button1</button>
      {/* <button onClick={handleConnect}>
        connect
      </button>
      <button onClick={handleDisconnect}>
        Disconnect
      </button> */}
    </div>
  );
}
