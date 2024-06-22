import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Delta } from 'quill/core';

interface EditorProps {
  readOnly: boolean;
  defaultValue?: any;  // Adjust the type of defaultValue based on the content Quill expects
  onTextChange?: (delta: any, oldDelta: any, source: any) => void;
  onSelectionChange?: (range: any, oldRange: any, source: any) => void;
  delta: Delta | null;
  setDeltaArray: React.Dispatch<React.SetStateAction<Delta[]>>
}

const QuillEditor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange, delta, setDeltaArray }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
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

      quill.on('text-change', (delta, oldDelta, source) => {
        onTextChangeRef.current?.(delta, oldDelta, source);
        if (source === 'user') {
          setDeltaArray(prev => {
            return [...prev, delta];
          });
        }
        
      });

      quill.on('selection-change', (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      if (delta) {
        quill.updateContents(delta);
      }

      return () => {
        if (ref && 'current' in ref) {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref, delta]);

    return <div ref={containerRef}></div>;
  },
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
