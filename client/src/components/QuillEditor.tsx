import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Delta } from 'quill/core';

interface EditorProps {
  readOnly: boolean;
  defaultValue?: Delta;  // Adjust the type of defaultValue based on the content Quill expects
  otherDelta: Delta | null;
  setDeltaArray: React.Dispatch<React.SetStateAction<Delta[]>>
  setOtherDelta: (delta: Delta) => void
}

const QuillEditor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly, defaultValue, otherDelta, setDeltaArray, setOtherDelta }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const setDeltaArrayRef = useRef(setDeltaArray);
    const setOtherDeltaRef = useRef(setOtherDelta);
    useLayoutEffect(() => {
      setDeltaArrayRef.current = setDeltaArray;
      defaultValueRef.current = defaultValue;
      setOtherDeltaRef.current = setOtherDelta;
    });

    useEffect(() => {
      if (ref && 'current' in ref) {
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      if (ref && 'current' in ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on('text-change', (delta, _oldDelta, source) => {

        if (source === 'user') {
          
          setDeltaArrayRef.current?.(prev => {
            return [...prev, delta];
          });
        }
        else {
          setOtherDeltaRef.current?.(delta);
        }
      });

      if (otherDelta) {
        quill.updateContents(otherDelta);
      }

      return () => {
        if (ref && 'current' in ref) {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref, otherDelta]);

    return <div ref={containerRef}></div>;
  },
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
