import { Delta } from 'quill/core';
import * as React from 'react';
import { Quill } from 'react-quill';
import ReactQuill from 'react-quill';
import QuillEditor from "react-quill";
import 'react-quill/dist/quill.snow.css';
import EditorCore from './editorcore';

export interface IOperation {
  insert?: string,
  delete?: string
}
export interface IOps {
  ops: IOperation[]
}
export interface IProps {
  user: string,
  message: Function
}

export default function Editor({ user, message }: IProps) {

  const [value, setValue] = React.useState<string | Delta | undefined>('');
  const [deltaArray, setDeltaArray] = React.useState<Delta[] | undefined>([]);
  const [deltaArraySent, setDeltaArraySent] = React.useState<Delta[] | undefined>([]);

  const MINUTE_MS = 1000;
  const sentMessage = () => {
    const delta = new Delta();
    if (deltaArray?.length ? deltaArray?.length > 0 : false) {
      const sumWithInitial: Delta | undefined = deltaArray?.reduce((delta, curr) => delta.compose(curr), delta);
      console.log(sumWithInitial);
      message(sumWithInitial);
      if (sumWithInitial) {
        setDeltaArraySent(prev => {
          prev?.push(sumWithInitial)
          return prev
        });
      }
      setDeltaArray([]);
    }
    else {
      // console.log("empty");
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      sentMessage();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  });

  const handleClick = () => {
    const delta = new Delta();
    const sumWithInitial: Delta | undefined = deltaArraySent?.reduce((delta, curr) => delta.compose(curr), delta);
    console.log(sumWithInitial);

  }

  return (
    <div>
      <EditorCore setDeltaArray={setDeltaArray} />
      <button onClick={handleClick}>final</button>
    </div>
  );
}
