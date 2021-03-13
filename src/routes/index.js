import React from 'react';
import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
  /* Vendo se o usuário está autenticado pelo contexto */
  const { signed } = useAuth();

  /* Manipulando as rotas que podem ser acessadas estando autenticado ou não */
  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
