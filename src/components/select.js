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
        if (ref.getValue().length == 0) {
          return undefined;
        }
        return ref.getValue().at(0).value;
      },
    });
  }, [fieldName, registerField]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #71717a',
      color: state.isSelected ? 'black' : '#71717a',
      padding: 10,
    }),
    control: () => ({
      backgroundColor: '#fff',
      border: '1px solid #d4d4d8',
      borderRadius: 8,
      color: 'black',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <ReactSelect
      className="w-80 sm:w-96 md:w-72 lg:w-96 xl:auto"
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#9ca3af',
          primary: '#4ade80',
        },
      })}
      cacheOptions
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}
