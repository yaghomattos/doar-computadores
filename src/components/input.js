import React, { useEffect, useRef } from 'react';
import ReactInputMask from 'react-input-mask';

React.useLayoutEffect = React.useEffect;

import { useField } from '@unform/core';

export default function InputMask({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.value = value;
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {error && <p>{error}</p>}
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
    </div>
  );
}
