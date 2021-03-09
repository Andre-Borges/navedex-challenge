import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from '../components/Menu/';

import Login from '../pages/Login';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <>
      <Menu />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
