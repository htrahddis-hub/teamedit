import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Delta } from 'quill/core';
import '../styles/QuillEditor.css';
import { Socket } from 'socket.io-client';

interface EditorProps {
  readOnly: boolean;
  defaultValue?: string;  // Adjust the type of defaultValue based on the content Quill expects
  otherDelta?: Delta | null;
  setDeltaArray?: React.Dispatch<React.SetStateAction<Delta[]>>;
  setOtherDelta?: (delta: Delta) => void;
  socket : Socket;
}

const toolbarOptions = [
  [{ 'font': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  // [{ 'size': ['small', false, 'large', 'huge',''] }], 
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  // ['blockquote', 'code-block'],
  // ['link', 'image', 'video', 'formula'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  // [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction

 // custom dropdown
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  
  [{ 'align': [] }],

  // ['clean']                                         // remove formatting button
];

const QuillEditor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly, defaultValue,socket }, ref) => {

    const roomId = React.useRef('');
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);

    useLayoutEffect(() => {
      defaultValueRef.current = defaultValue;
    });

    useEffect(() => {
      if (ref && 'current' in ref) {
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      socket.on('fwd', (data) => {
        console.log(data);
        if (data) {
          quill.updateContents(data);
        }
      });

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: { toolbar: toolbarOptions }
      });

      if (ref && 'current' in ref) {
        ref.current = quill;
      }

      socket.on('joined', (data) => {
        console.log(data.roomId);
        roomId.current=data.roomId;
      });

      if (defaultValueRef.current) {
        quill.setContents(new Delta(JSON.parse(defaultValueRef.current)));
      }

      quill.on('text-change', (delta, _oldDelta, source) => {

        if (source === 'user') {
          console.log({ delta: delta, roomId:roomId.current});
          
          socket.emit('message', { delta: delta, roomId:roomId.current});
        }
        else {
          // setOtherDeltaRef.current?.(delta);
        }
      });

      return () => {
        if (ref && 'current' in ref) {
          ref.current = null;
        }
        socket.off('fwd');
        socket.off('joined');
        container.innerHTML = '';
      };
    }, [ref,defaultValue]);

    // useEffect(() => {
    //     socket.on('fwd', (data) => {
    //       console.log(data);
    //     });
    //     return () => {
    //       socket.off('fwd');
    //     }
    //   },[]);

    return <div ref={containerRef} ></div>;
  },
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
