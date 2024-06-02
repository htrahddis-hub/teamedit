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
}


export default function EditorCore({ setDeltaArray }: IProps) {

  const [value, setValue] = React.useState<string | Delta | undefined>('');
  // const [deltaArray, setDeltaArray] = React.useState<Delta[] | undefined>([]);
  // const [deltaArraySent, setDeltaArraySent] = React.useState<Delta[] | undefined>([]);

  // const MINUTE_MS = 500;
  // const sentMessage = () => {
  //   const delta = new Delta();
  //   // if (deltaArray?.length ? deltaArray?.length > 0 : false) {
  //     const sumWithInitial: Delta | undefined = deltaArray?.reduce((delta, curr) => delta.compose(curr), delta);
  //     console.log(sumWithInitial);
  //     message(sumWithInitial);
  //     setDeltaArray([]);
  //   // }
  //   // else {
  //     console.log("empty");
  //   // }
  // }

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     sentMessage();
  //   }, MINUTE_MS);

  //   return () => clearInterval(interval);
  // });
  // const handleClick = () => {
  //   const death = new Delta().retain(5)
  //     .insert('White')
  //   quill.current?.editor?.updateContents(death)
  // }

  const quill = React.useRef<ReactQuill>();
  const handleChange = (value: any) => {
    setDeltaArray(prev => {
      prev?.push(quill.current?.lastDeltaChangeSet)
      return prev
    });
    setValue(value);
    // console.log(value);
  }


  const handleClick1 = () => {
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
