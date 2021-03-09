import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

import foto from '../../assets/foto.jpg';

export default function Home() {
  const [navers, setNavers] = useState([]);

  async function getNavers() {
    const response = await api.get('/navers');
    setNavers(response.data);
    console.log(response.data);
  }

  /** Busco todas as informações dos navers quando o componente é criado */
  useEffect(() => {
    try {
      getNavers();
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  return (
    <div className="home-container">
      <header>
        <h2>Navers</h2>
        <button className="add-naver">Adicionar Naver</button>
      </header>
      <div className="navers">
        {navers.map((naver, key) => (
          <div key={naver.name}>
            <img src={foto} alt="avatar" />
            <span className="name">{naver.name}</span>
            <span className="job-role">{naver.job_role}</span>
            <button type="button">
              <img src="/icons/delete.svg" alt="Deletar naver" />
            </button>
            <button>
              <img src="/icons/edit.svg" alt="Editar naver" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
