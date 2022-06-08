import React, { useState } from 'react';
import './Authorization.sass';
import Input from '../../utils/input/Input';
import { registration } from '../../actions/user';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="authorization">
      <div className="authorization__header">Sing Up</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Password"
      />
      <button
        className="authorization__btn"
        onClick={() => registration(email, password)}
      >
        Sign Up{' '}
      </button>
    </div>
  );
};

export default Registration;
