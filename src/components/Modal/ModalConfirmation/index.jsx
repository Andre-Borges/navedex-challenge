import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

export default function Modal({ title, message, isOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  function close() {
    setIsModalOpen(false);
  }

  if (isModalOpen) {
    return ReactDOM.createPortal(
      <div className="modal-overlay" onClick={close}>
        <div className="modal-container">
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

  return null;
}
