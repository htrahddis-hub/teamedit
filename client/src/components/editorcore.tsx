import { Delta } from 'quill/core';
import * as React from 'react';
import { Quill } from 'react-quill';
import ReactQuill from 'react-quill';
import QuillEditor from "react-quill";
import 'react-quill/dist/quill.snow.css';
// import QuillEditor from './QuillEditor';




export interface IOperation {
  insert?: string,
  delete?: string
}


export interface IOps {
  ops: IOperation[]
}

export interface IProps {
  setDeltaArray: React.Dispatch<React.SetStateAction<Delta[]>>
  delta: Delta
}


export default function EditorCore({ setDeltaArray, delta }: IProps) {

  // const [value, setValue] = React.useState<string | Delta | undefined>('');
  const handleClick1 = () => {
    const death = new Delta().insert('White');
    quill.current?.editor?.setContents(death);
  }

  React.useEffect(() => {
    if (delta)
      quill.current?.editor?.updateContents(delta);
  }, [delta]);

  const quill = React.useRef<ReactQuill>();
  // const handleChange = (value: any) => {
  //   quill.current?.editor?.on('text-change', (delta, oldelta, source) => {
  //     if (source === 'user') {
  //       setDeltaArray(prev => {
  //         prev?.push(quill.current?.lastDeltaChangeSet)
  //         return prev;
  //       });
  //       console.log("it fired");
  //       setValue(value);
  //     } else {
  //       setValue(value);
  //     }

  //   });
  //   // console.log(value);
  // }

  quill.current?.editor?.on('text-change', (delta, oldelta, source) => {
    if (source === 'user') {
      setDeltaArray(prev => {
        prev?.push(quill.current?.lastDeltaChangeSet)
        return prev;
      });
      console.log("it fired");
      // setValue(value);
    } else {
      // setValue(value);
    }
  });

  const handleClick = () => {
    console.log(quill.current?.getEditorContents);
    // console.log(value);
  }

  return (
    <div>
      <QuillEditor
        theme="snow"
        // value={value}
        // onChange={handleChange}
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
