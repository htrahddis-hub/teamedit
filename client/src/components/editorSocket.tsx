import Quill, { Delta } from 'quill/core';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import { Socket } from 'socket.io-client';
import _ from "lodash";
import RangeStatic from 'quill';
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

const MINUTE_MS = 1000;

export default function EditorSocket({ user, socket, filename }: IProps) {

  const [deltaArraySent, setDeltaArraySent] = React.useState<Delta[]>([new Delta()]);
  const [deltaArray, setDeltaArray] = React.useState<Delta[]>([]);
  const [otherDelta,setOtherDelta] = React.useState<Delta[]>([]);
  const [value, setValue] = React.useState<Delta>(new Delta());
  const [range, setRange] = React.useState<RangeStatic | null>(null);
  const [lastChange, setLastChange] = React.useState<Delta | null>(null);
  const [defaultValue, setDefaultValue] = React.useState<Delta>(new Delta());
  const quillRef = React.useRef<Quill | null>(null);

  const sentMessage = () => {
    const delta = new Delta();
    const sumWithInitial: Delta = deltaArray?.reduce((delta, curr) => delta.compose(curr), delta);
    socket.emit('message', { delta: sumWithInitial, user: user, filename: filename });

    setDeltaArraySent(prev => {
      return [...prev, sumWithInitial]
    });
    const sumWithInitial1: Delta = deltaArraySent?.reduce((delta, curr) => delta.compose(curr), delta);
    setDeltaArray([]);
    setDefaultValue(sumWithInitial1);
    console.log(sumWithInitial);
    console.log(sumWithInitial1);
    
  }

  React.useEffect(() => {
    socket.on('fwd', (data: { delta: React.SetStateAction<Delta> }) => {
      setValue(data.delta);
    });
    return () => {
      socket.off('fwd');
    }
  }, []);

  React.useEffect(() => {
    if (deltaArray.length > 0)

      sentMessage()
  }, [deltaArray.length]);


  return (
    <div>
      <QuillEditor
        ref={quillRef}
        readOnly={false}
        defaultValue={defaultValue}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
        delta={value}
        setDeltaArray={setDeltaArray}
      />
    </div>
  );
}
