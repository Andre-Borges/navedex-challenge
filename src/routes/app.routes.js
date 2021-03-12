import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Naver from '../pages/Naver';

import Menu from '../components/Menu';

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Menu />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/naver/register" exact component={Naver} />
          <Route path="/naver/register/:id" exact component={Naver} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
