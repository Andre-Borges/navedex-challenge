import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from '../components/Menu/';

import Home from '../pages/Home';

export default function Routes() {
  return (
    <>
      <Menu />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
