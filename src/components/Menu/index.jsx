import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Menu() {
  return (
    <>
      <div className="menu-container">
        <Link to="/home">
          <img src="logo-header.png" alt="Logo" />
        </Link>
        <button>Sair</button>
      </div>
    </>
  );
}
