import React, { useRef } from 'react';
import ReactInputMask from 'react-input-mask';

import { useField } from '@unform/core';
import useIsomorphicLayoutEffect from './isomorphicLayoutEffect';

export default function InputMask({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useIsomorphicLayoutEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
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
