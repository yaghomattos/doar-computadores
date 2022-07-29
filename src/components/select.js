import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import ReactSelect from 'react-select';

export default function Select({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,

      getValue: (ref) => {
        if (!ref.state.selectValue) {
          return undefined;
        }
        return ref.state.selectValue[0].value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      cacheOptions
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}
