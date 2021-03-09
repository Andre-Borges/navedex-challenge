import React from 'react';
import AuthProvider from './contexts/auth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

import './styles/global.css';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
