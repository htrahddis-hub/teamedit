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


export default function Home() {

  const delta: IOps = {
    ops: [
      { insert: 'Gandalf' },
      { insert: ' the ' },
      { insert: 'Grey' }
    ]
  }
  const [value, setValue] = React.useState<string | Delta | undefined>('');
  const [deltaArray, setDeltaArray] = React.useState<Delta[] | undefined>([]);

  const handleClick = () => {
    const death = new Delta().retain(5)
      .insert('White')
    quill.current?.editor?.updateContents(death)


    // const curr = quill.current?.editor?.editor.delta;
    // const restored = curr?.compose(death);
    // setValue(restored);
    // setValue((prev) => {
    //   return prev + "I changed it";
    // })
  }

  const handleClick1 = () => {

    const delta = new Delta();

    const sumWithInitial: Delta | undefined = deltaArray?.reduce((delta, curr) => delta.compose(curr), delta);
    console.log(sumWithInitial);

  }

  const quill = React.useRef<ReactQuill>();
  const handleChange = (value: any) => {
    setDeltaArray(prev => {
      prev?.push(quill.current?.lastDeltaChangeSet)
      return prev
    })
    // deltaArray.push(quill.current?.lastDeltaChangeSet);
    console.log(deltaArray);

    setValue(value)
    console.log(quill.current?.lastDeltaChangeSet);

    // console.log(quill.current?.editor)

    // console.log(quill.current?.setState());

  }

  return (
    <div>
      <QuillEditor
        theme="snow"
        value={value}
        onChange={handleChange}
        ref={(el) => { if (el !== null) quill.current = el }}
      />
      <button onClick={handleClick}>button</button>
      <button onClick={handleClick1}>button1</button>
    </div>
  );
}
