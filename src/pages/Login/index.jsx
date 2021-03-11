import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import './styles.css';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import FullPageLoader from '../../components/FullPageLoader';

export default function Login() {
  const [loading, setLoading] = useState(false);

  /* Recuperando contexto (usuário logado) */
  const context = useAuth();

  /* API do react-hook-form */
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    /** Tentativa de logar na aplicação*/
    setLoading(true);
    const request = await api
      .post('/users/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success('Bem Vindo!');
        return response;
      })
      .catch((err) => {
        return err.response;
      });
    setLoading(false);

    /* Mostro o retorno caso dê erro (usuario inexistente, senha incorreta) */
    if (request.status !== 200) {
      toast.error(request.data.message);
      return;
    }

    /** Salvo este usuário válido no contexto */
    context.Login(email, password);
  });

  return (
    <div className="login-container">
      <div className="login">
        <img src="logo-login.png" alt="Logo" />
        <form onSubmit={onSubmit}>
          <div>
            <label>E-mail</label>
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              ref={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido',
                },
              })}
            />
            {errors.email && <span className="error-danger">{errors.email.message}</span>}
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              ref={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter no mínimo 6 caracteres',
                },
              })}
            />
            {errors.password && (
              <span className="error-danger">{errors.password.message}</span>
            )}
          </div>
          <button type="submit">Entrar</button>
        </form>
        <div>
          <Link to="/signUp" className="signup">
            Desejo me cadastrar
          </Link>
        </div>
      </div>
      {loading && <FullPageLoader />}
    </div>
  );
}
