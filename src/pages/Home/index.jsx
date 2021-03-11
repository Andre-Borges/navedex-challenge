import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

import './styles.css';

import foto from '../../assets/foto.jpg';

import FullPageLoader from '../../components/FullPageLoader';
import ModalConfirmation from '../../components/Modal/ModalConfirmation';
import ModalExclusion from '../../components/Modal/ModalExclusion';
import ModalNaver from '../../components/Modal/ModalNaver';

export default function Home() {
  /** Recurso para navegar entre as telas */
  const { push } = useHistory();

  const [loading, setLoading] = useState(true);
  const [navers, setNavers] = useState([]);
  const [naver, setNaver] = useState([]);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [isModalExclusionOpen, setIsModalExclusionOpen] = useState(false);
  const [isModalNaverOpen, setIsModalNaverOpen] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  async function getNavers() {
    const response = await api.get('/navers');
    setNavers(response.data);
  }

  async function getNaverById(id) {
    console.log(id);
    setIdSelected(id);
    setLoading(true);
    const request = await api.get(`/navers/${id}`);
    setNaver(request.data);
    setLoading(false);
    toggleModalNaver();
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

  function toggleModalNaver() {
    setIsModalNaverOpen(!isModalNaverOpen);
  }

  function handleClickAdd() {
    push('/naver/register');
  }

  function handleClickDelete(id) {
    setIsModalExclusionOpen(true);
    setIdSelected(id);
  }

  async function deleteNaver(id) {
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
            <button onClick={() => getNaverById(naver.id)}>
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
      {isModalNaverOpen && (
        <ModalNaver
          naver={naver}
          toggleModalNaver={toggleModalNaver}
          handleClickDelete={() => handleClickDelete(idSelected)}
        ></ModalNaver>
      )}
      {loading && <FullPageLoader />}
    </div>
  );
}
