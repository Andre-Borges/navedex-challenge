import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import foto from '../../assets/foto.jpg';

import FullPageLoader from '../../components/FullPageLoader';

export default function Home() {
  /** Recurso para navegar entre as telas */
  const { push } = useHistory();

  const [loading, setLoading] = useState(true);
  const [navers, setNavers] = useState([]);

  async function getNavers() {
    const response = await api.get('/navers');
    setNavers(response.data);
    return false;
  }

  /** Busco todas as informações dos navers quando o componente é criado */
  useEffect(() => {
    try {
      getNavers();
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  function handleClickAdd() {
    push('/naver/register');
  }

  return (
    <div className="home-container">
      <header>
        <h2>Navers</h2>
        <button className="add-naver" onClick={handleClickAdd}>
          Adicionar Naver
        </button>
      </header>
      <div className="navers">
        {navers.map((naver, key) => (
          <div key={naver.id}>
            <img src={foto} alt="avatar" />
            <span className="name">{naver.name}</span>
            <span className="job-role">{naver.job_role}</span>
            <button>
              <img src="/icons/delete.svg" alt="Deletar naver" />
            </button>
            <button>
              <img src="/icons/edit.svg" alt="Editar naver" />
            </button>
          </div>
        ))}
      </div>
      {loading && <FullPageLoader />}
    </div>
  );
}
