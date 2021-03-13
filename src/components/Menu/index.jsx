import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import './styles.css';

import imgLogo from './assets/logo-header.png';

export default function Menu() {
  const { push } = useHistory();

  const { Logout } = useAuth();

  const logOut = () => {
    const confirm = window.confirm('Deseja realmente sair do sistema?');
    if (confirm) {
      Logout();
      push('/');
    }
  };
  return (
    <>
      <div className="menu-container">
        <Link to="/home">
          <img src={imgLogo} alt="Logo" />
        </Link>
        <button onClick={logOut}>Sair</button>
      </div>
    </>
  );
}
