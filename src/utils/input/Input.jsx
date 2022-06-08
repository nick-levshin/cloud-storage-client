import React from 'react';
import './Input.sass';

const Input = ({ type, placeholder, value, setValue }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
