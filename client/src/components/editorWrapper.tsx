import { Delta } from 'quill/core';
import * as React from 'react';
import { Quill } from 'react-quill';
import ReactQuill from 'react-quill';
import QuillEditor from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Editor from './editor';

export interface IOperation {
  insert?: string,
  delete?: string
}
export interface IOps {
  ops: IOperation[]
}
export interface IProps {
  user: string,
  message: Function,
  ops: Delta | undefined
}

export default function EditorWrapper({ user, message, ops }: IProps) {

  const [deltaArraySent, setDeltaArraySent] = React.useState<Delta[] | undefined>([]);
  const [value, setValue] = React.useState<Delta | undefined>();


  function freshState(): Delta | undefined {
    const delta = new Delta();
    const sumWithInitial: Delta | undefined = deltaArraySent?.reduce((delta, curr) => delta.compose(curr), delta);
    return sumWithInitial;
  }

  React.useEffect(() => {
    setValue(() => {
      var deltaval = freshState();
      if (ops)
        deltaval = deltaval?.compose(ops);
      console.log(deltaval);
      return deltaval;
    })
  }, [ops]);
  return (
    <div>
      <Editor user={user} message={message} value={value} setDeltaArraySent={setDeltaArraySent} />
    </div>
  );
}
