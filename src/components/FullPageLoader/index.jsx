import React from 'react';

import './styles.css';

export default function FullPageLoader() {
  return (
    <div className="loading-container">
      <img src="/icons/loading.gif" alt="loading" />
    </div>
  );
}
