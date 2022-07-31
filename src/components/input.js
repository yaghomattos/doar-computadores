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
      <ReactInputMask
        className="w-64 h-12 px-2 py-2 my-0.5 text-xl text-zinc-600 bg-white placeholder:text-zinc-400 border border-zinc-300 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <p className="text-red-600 pl-1  mb-2">{error}</p>}
    </div>
  );
}
