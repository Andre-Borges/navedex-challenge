import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

export default function ModalExclusion({
  title,
  message,
  deleteNaver,
  closeModalExclusion,
}) {
  function close() {
    closeModalExclusion();
  }

  return ReactDOM.createPortal(
    <div className="modal-exclusion-overlay">
      <div className="modal-exclusion-container">
        <header>
          <h1>{title}</h1>
        </header>
        <span>{message}</span>
        <div>
          <button type="button" className="btn-cancel" onClick={close}>
            Cancelar
          </button>
          <button type="button" className="btn-delete" onClick={deleteNaver}>
            Excluir
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
