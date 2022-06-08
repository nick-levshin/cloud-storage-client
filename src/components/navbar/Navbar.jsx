import React from 'react';
import { API_URL } from '../../config';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import Logo from '../../assets/images/logo.svg';
import avatarLogo from '../../assets/images/avatar.svg';
import './Navbar.sass';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const avatar = currentUser?.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__home">
          <NavLink to="/">
            <img src={Logo} alt="logo" className="navbar__logo" />
            <div className="navbar__header">MERN CLOUD</div>
          </NavLink>
        </div>
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/authorization">Log In</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Sign Up</NavLink>
          </div>
        )}
        {isAuth && (
          <>
            <div className="navbar__logout" onClick={() => dispatch(logout())}>
              Log Out
            </div>
            <NavLink to="/profile">
              <img className="navbar__avatar" src={avatar} alt="avatar" />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
