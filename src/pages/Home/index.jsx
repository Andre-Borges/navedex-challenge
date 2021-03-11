import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

import './styles.css';

import foto from '../../assets/foto.jpg';

import FullPageLoader from '../../components/FullPageLoader';
import ModalConfirmation from '../../components/Modal/ModalConfirmation';
import ModalExclusion from '../../components/Modal/ModalExclusion';

export default function Home() {
  /** Recurso para navegar entre as telas */
  const { push } = useHistory();

  const [loading, setLoading] = useState(true);
  const [navers, setNavers] = useState([]);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [isModalExclusionOpen, setIsModalExclusionOpen] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  async function getNavers() {
    const response = await api.get('/navers');
    setNavers(response.data);
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

  function closeModalExclusion() {
    setIsModalExclusionOpen(false);
  }

  function closeModalConfirmation() {
    setIsModalConfirmationOpen(false);
  }

  function handleClickAdd() {
    push('/naver/register');
  }

  function handleClickDelete(id) {
    console.log(id);
    setIsModalExclusionOpen(true);
    setIdSelected(id);
  }

  async function deleteNaver(id) {
    console.log('delete naver');
    setLoading(true);
    const request = await api
      .delete(`/navers/${id}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
    setLoading(false);

    if (request.status === 200) {
      setIsModalConfirmationOpen(true);
      closeModalExclusion();
    } else {
      toast.error(request.data.message);
    }
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
            <button onClick={() => handleClickDelete(naver.id)}>
              <img src="/icons/delete.svg" alt="Deletar naver" />
            </button>
            <button>
              <img src="/icons/edit.svg" alt="Editar naver" />
            </button>
          </div>
        ))}
      </div>
      {isModalExclusionOpen && (
        <ModalExclusion
          title="Excluir Naver"
          message="Tem certeza que deseja excluir esse Naver?"
          deleteNaver={() => deleteNaver(idSelected)}
          closeModalExclusion={closeModalExclusion}
        ></ModalExclusion>
      )}
      {isModalConfirmationOpen && (
        <ModalConfirmation
          title="Naver excluído"
          message="Naver excluído com sucesso!"
          closeModalConfirmation={closeModalConfirmation}
        ></ModalConfirmation>
      )}
      {loading && <FullPageLoader />}
    </div>
  );
}
