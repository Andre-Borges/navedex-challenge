import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import { formatDateToLocaleString } from '../../utils/global';

export default function Naver() {
  /* Recurso para navegar entre as telas */
  const { push } = useHistory();

  /* API do react-hook-form */
  /* register pega o valor do input e passa para o handle submit */
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(
    async ({ job_role, admission_date, birthdate, project, name, url }) => {
      console.log(
        job_role,
        formatDateToLocaleString(admission_date),
        formatDateToLocaleString(birthdate),
        project,
        name,
        url
      );
      /* Request para cadastrar um Naver */
      const request = await api
        .post('/navers', {
          job_role: job_role,
          admission_date: formatDateToLocaleString(admission_date),
          birthdate: formatDateToLocaleString(birthdate),
          project: project,
          name: name,
          url: url,
        })
        .then((response) => {
          alert('funfou');
          return response;
        })
        .catch((err) => {
          return err.response;
        });

      /* Se deu sucesso, redireciono para o Login */
      if (request.status === 200) {
        toast.success('Cadastro realizado com sucesso!');
        /*push('/');*/
      } else {
        console.log(request.data.message);
        toast.error(request.data.message);
      }
    }
  );

  return (
    <div className="naver-container">
      <div className="naver">
        <header>
          <Link to="/home" className="home">
            <img src="/icons/back.svg" alt="" />
          </Link>
          Adicionar Naver
        </header>
        <form onSubmit={onSubmit}>
          <div>
            <label>Nome</label>
            <input type="text" name="name" placeholder="Nome" ref={register()} />
          </div>
          <div>
            <label>Cargo</label>
            <input type="text" name="job_role" placeholder="Cargo" ref={register()} />
          </div>
          <div>
            <label>Idade</label>
            <input type="date" name="birthdate" placeholder="Idade" ref={register()} />
          </div>
          <div>
            <label>Tempo de empresa</label>
            <input
              type="date"
              name="admission_date"
              placeholder="Tempo de empresa"
              ref={register()}
            />
          </div>
          <div>
            <label>Projetos que participou</label>
            <input
              type="text"
              name="project"
              placeholder="Projetos que participou"
              ref={register()}
            />
          </div>
          <div>
            <label>URL da foto do Naver</label>
            <input
              type="text"
              name="url"
              placeholder="URL da foto do Naver"
              ref={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 5,
                  message: 'URL deve ter no mínimo 5 caracteres',
                },
              })}
            />
            {errors.url && <span className="error-danger">{errors.url.message}</span>}
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
