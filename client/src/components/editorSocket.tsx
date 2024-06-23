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

  const [deltaArray, setDeltaArray] = React.useState<Delta[]>([]);
  const [combineOthersDelta, setCombineOthersDelta] = React.useState<Delta[]>([]);
  const [otherDelta, setOtherDelta] = React.useState<Delta>(new Delta());
  const [range, setRange] = React.useState<RangeStatic | null>(null);
  const [lastChange, setLastChange] = React.useState<Delta | null>(null);
  const [defaultValue, setDefaultValue] = React.useState<Delta>(new Delta());
  const quillRef = React.useRef<Quill | null>(null);
  // const defaultValue = React.useRef<Delta>(new Delta());

  const sentMessage = () => {
    const delta = new Delta();
    const sumWithInitial: Delta = deltaArray?.reduce((delta, curr) => delta.compose(curr), delta);
    socket.emit('message', { delta: sumWithInitial, user: user, filename: filename });
    console.log(JSON.stringify(sumWithInitial.ops));
    setDeltaArray([]);
    setDefaultValue(prev => {
      return prev.compose(sumWithInitial);
    });
  }

  const handleOtherChanges = (delta: Delta) => {
    setDefaultValue(prev => {
      return prev.compose(delta);
    });
    console.log(JSON.stringify(delta.ops));
  }

  React.useEffect(() => {
    socket.on('fwd', (data) => {
      setOtherDelta(() => {
        console.log(JSON.stringify(data.delta.ops));
        return data.delta;
      });
    });
    return () => {
      socket.off('fwd');
    }
  }, []);

  React.useEffect(() => {
    if (deltaArray.length > 0)
      sentMessage();
  }, [deltaArray.length]);


  return (
    <div>
      <QuillEditor
        ref={quillRef}
        readOnly={false}
        defaultValue={defaultValue}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
        otherDelta={otherDelta}
        setDeltaArray={setDeltaArray}
        setOtherDelta={handleOtherChanges}
      />
    </div>
  );
}
