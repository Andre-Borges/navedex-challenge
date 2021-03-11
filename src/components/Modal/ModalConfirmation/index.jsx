import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

export default function ModalConfirmation({ title, message, closeModalConfirmation }) {
  function close() {
    closeModalConfirmation();
  }

  return ReactDOM.createPortal(
    <div className="modal-confirmation-overlay">
      <div className="modal-confirmation-container">
        <header>
          <h1>{title}</h1>
        </header>
        <span>{message}</span>
        <button type="button" onClick={close}>
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
