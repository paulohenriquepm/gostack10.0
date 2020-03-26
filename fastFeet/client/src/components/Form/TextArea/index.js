import React, { useRef, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useField } from '@unform/core';

export default function TextArea({ name, ...rest }) {
  const textAreaRef = useRef(null);
  const { defaultValue, fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: '_input.value',
    });
  }, [fieldName, registerField]);

  return (
    <TextareaAutosize
      id={fieldName}
      defaultValue={defaultValue}
      ref={textAreaRef}
      {...rest}
    />
  );
}
