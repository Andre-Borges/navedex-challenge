import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export default function AuthProvider({ children }) {
  const [signed, setSigned] = useState(null);

  /* Toda vez que o hook é usado, verifica se está preenchido o localStorage e seta o header nas requisições */
  useEffect(() => {
    const storagedToken = localStorage.getItem('@Navers:token');

    if (storagedToken) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      setSigned(true);
    }
  }, []);

  /* Função responsável por autenticar na aplicação e salvar no local storage */
  async function Login(email, password) {
    const request = await api.post('/users/login', {
      email: email,
      password: password,
    });

    if (request.status !== 200) return request.data;

    /* Recupera retorno da api, seta o header das requisições e salva no local storage */
    setSigned(request.data);
    api.defaults.headers.Authorization = `Bearer ${request.data.token}`;
    localStorage.setItem('@Navers:token', request.data.token);
  }

  /* Função responsável por deslogar da aplicação */
  function Logout() {
    localStorage.removeItem('@Navers:token');
    setSigned(false);
  }

  return (
    <AuthContext.Provider value={{ signed, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* Criando um hook personalizado para usar de maneira simples */
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
