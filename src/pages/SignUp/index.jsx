import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './styles.css';

import api from '../../services/api';

import FullPageLoader from '../../components/FullPageLoader';

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  /* Recurso para navegar entre as telas */
  const { push } = useHistory();

  /* API do react-hook-form */
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    /* Request para cadastrar o usuário */
    setLoading(true);
    const request = await api
      .post('/users/signup', {
        email: email,
        password: password,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
    setLoading(false);

    /* Se deu sucesso, redireciono para o Login */
    if (request.status === 200) {
      toast.success('Cadastro realizado com sucesso!');
      push('/');
    } else {
      toast.error(request.data.message);
    }
  });

  return (
    <div className="signup-container">
      <div className="signup">
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
          <button type="submit">Cadastrar</button>
        </form>
        <div>
          <Link to="/" className="login">
            Voltar
          </Link>
        </div>
      </div>
      {loading && <FullPageLoader />}
    </div>
  );
}
