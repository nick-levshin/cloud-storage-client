import React, { useState } from 'react';
import './Authorization.sass';
import Input from '../../utils/input/Input';
import { login } from '../../actions/user';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="authorization">
      <div className="authorization__header">Log In</div>
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
        onClick={() => dispatch(login(email, password))}
      >
        Log In{' '}
      </button>
    </div>
  );
};

export default Login;
