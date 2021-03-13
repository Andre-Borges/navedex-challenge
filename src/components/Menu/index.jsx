import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import './styles.css';

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
          <img src="logo-header.png" alt="Logo" />
        </Link>
        <button onClick={logOut}>Sair</button>
      </div>
    </>
  );
}
