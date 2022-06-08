import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './navbar/Navbar';
import './App.sass';
import Registration from './authorization/Reginstration';
import Login from './authorization/Login';
import Disk from './disk/Disk';
import { auth } from '../actions/user';
import Profile from './navbar/profile/Profile';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="wrap">
          {!isAuth ? (
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/authorization" element={<Login />} />
              <Route path="/*" element={<Navigate to="authorization" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Disk />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
