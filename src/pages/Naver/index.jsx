import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import { formatDateToLocaleString } from '../../utils/global';
import Modal from '../../components/Modal/ModalConfirmation';

export default function Naver() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Recurso para navegar entre as telas */
  const { push } = useHistory();

  /* API do react-hook-form */
  /* register pega o valor do input e passa para o handle submit */
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(
    async ({ job_role, admission_date, birthdate, project, name, url }) => {
      setIsModalOpen(false);

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
          return response;
        })
        .catch((err) => {
          return err.response;
        });

      /* Se deu sucesso, redireciono para o Login */
      if (request.status === 200) {
        setIsModalOpen(true);
        /*push('/');*/
      } else {
        toast.error(request.data.message);
      }
    }
  );

  return (
    <div className="naver-container">
      {isModalOpen && (
        <Modal
          title="Naver Criado"
          message="Naver criado com sucesso!"
          isOpen={true}
        ></Modal>
      )}
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
            <input
              type="text"
              name="name"
              placeholder="Nome"
              ref={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Nome deve ter no mínimo 3 caracteres',
                },
              })}
            />
            {errors.name && <span className="error-danger">{errors.name.message}</span>}
          </div>
          <div>
            <label>Cargo</label>
            <input
              type="text"
              name="job_role"
              placeholder="Cargo"
              ref={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Cargo deve ter no mínimo 3 caracteres',
                },
              })}
            />
            {errors.job_role && (
              <span className="error-danger">{errors.job_role.message}</span>
            )}
          </div>
          <div>
            <label>Idade</label>
            <input
              type="date"
              name="birthdate"
              placeholder="Idade"
              ref={register({
                required: 'Esse campo é obrigatório',
              })}
            />
            {errors.birthdate && (
              <span className="error-danger">{errors.birthdate.message}</span>
            )}
          </div>
          <div>
            <label>Tempo de empresa</label>
            <input
              type="date"
              name="admission_date"
              placeholder="Tempo de empresa"
              ref={register({
                required: 'Esse campo é obrigatório',
              })}
            />
            {errors.admission_date && (
              <span className="error-danger">{errors.admission_date.message}</span>
            )}
          </div>
          <div>
            <label>Projetos que participou</label>
            <input
              type="text"
              name="project"
              placeholder="Projetos que participou"
              ref={register({
                required: 'Esse campo é obrigatório',
              })}
            />
            {errors.project && (
              <span className="error-danger">{errors.project.message}</span>
            )}
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
