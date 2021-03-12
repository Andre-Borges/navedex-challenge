import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './styles.css';

import foto from '../../../assets/foto.jpg';

export default function ModalNaver({ naver, toggleModalNaver, handleClickDelete }) {
  function close() {
    toggleModalNaver();
  }

  return ReactDOM.createPortal(
    <div className="modal-naver-overlay">
      <div className="modal-naver-container">
        <div className="naver-avatar">
          <img src={foto} alt="" />
        </div>
        <div>
          <h1>{naver.name}</h1>
          <span>{naver.job_role}</span>
          <span className="title">Idade</span>
          <span>{moment(naver.birthdate).fromNow().replace(/\D/g, '')} anos</span>
          <span className="title">Tempo de empresa</span>
          <span>{naver.admission_date}</span>
          <span className="title">Projetos que participou</span>
          <span>{naver.project}</span>
          <div className="action-buttons">
            <button className="action" onClick={() => handleClickDelete(naver.id)}>
              <img src="/icons/delete.svg" alt="Deletar naver" />
            </button>
            <button className="action">
              <Link to={`/naver/register/${encodeURIComponent(naver.id)}`}>
                <img src="/icons/edit.svg" alt="Editar naver" />
              </Link>
            </button>
          </div>
          <button className="btn-close" type="button" onClick={close}>
            <img src="/icons/close.svg" alt="Fechar modal" />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
