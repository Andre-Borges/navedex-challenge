import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import { formatDateToLocaleString, formatDateUS } from '../../utils/global';
import ModalConfirmation from '../../components/Modal/ModalConfirmation';
import FullPageLoader from '../../components/FullPageLoader';

const initialNavers = {
  name: '',
  job_role: '',
  birthdate: '',
  admission_date: '',
  project: '',
  url: '',
};

export default function Naver() {
  /* Verifica se tem id, se tiver é modo de edição */
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  const [naver, setNaver] = useState(initialNavers);
  const [loading, setLoading] = useState(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);

  /* Recurso para navegar entre as telas */
  const { push } = useHistory();

  /* API do react-hook-form */
  const { register, handleSubmit, errors } = useForm();

  async function getNaverById(id) {
    setLoading(true);
    try {
      const request = await api.get(`/navers/${id}`);
      setNaver(request.data);
    } catch (error) {
      console.log('error: ', error);
    }
    setLoading(false);
  }

  /* Busco as informações dos navers quando for edição */
  useEffect(() => {
    if (id) {
      getNaverById(id);
      setEdit(true);
    }
  }, [id]);

  const onSubmit = handleSubmit(
    async ({ job_role, admission_date, birthdate, project, name, url }) => {
      setIsModalConfirmationOpen(false);
      let request = null;
      /* Request para cadastrar um Naver */
      setLoading(true);
      if (edit) {
        request = await api
          .put(`/navers/${id}`, {
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
      } else {
        request = await api
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
      }
      setLoading(false);

      /* Se deu sucesso, redireciono para Home */
      if (request.status === 200) {
        setIsModalConfirmationOpen(true);
      } else {
        toast.error(request.data.message);
      }
    }
  );

  function closeModalConfirmation() {
    setIsModalConfirmationOpen(false);
    push('/home');
  }

  return (
    <div className="naver-container">
      {isModalConfirmationOpen && (
        <ModalConfirmation
          title="Naver Criado"
          message="Naver criado com sucesso!"
          closeModalConfirmation={closeModalConfirmation}
        ></ModalConfirmation>
      )}
      <div className="naver">
        <header>
          <Link to="/home">
            <img src="/icons/back.svg" alt="" />
          </Link>
          {edit ? 'Editar Naver' : 'Adicionar Naver'}
        </header>
        <form onSubmit={onSubmit}>
          <div>
            <label>Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={naver.name && naver.name}
              onChange={(e) => setNaver({ ...naver, name: e.target.value })}
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
              value={naver.job_role}
              onChange={(e) => setNaver({ ...naver, job_role: e.target.value })}
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
              value={formatDateUS(naver.birthdate)}
              onChange={(e) => setNaver({ ...naver, birthdate: e.target.value })}
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
              value={formatDateUS(naver.admission_date)}
              onChange={(e) =>
                setNaver({ ...naver, admission_date: formatDateUS(e.target.value) })
              }
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
              value={naver.project}
              onChange={(e) => setNaver({ ...naver, project: e.target.value })}
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
              value={naver.url}
              onChange={(e) => setNaver({ ...naver, url: e.target.value })}
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
      {loading && <FullPageLoader />}
    </div>
  );
}
