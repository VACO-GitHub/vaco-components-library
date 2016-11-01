import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import Home from './components/layout/home';
import Install from './components/layout/install';
import Main from './components/layout/main';

const appHistory = createHistory(
  {
    hashType: 'slash'
  }
);

appHistory.push('/');

ReactDOM.render((
  <Router history={appHistory}>
    <Route path="/" component={Home} />
    <Route path="/install" component={Install} />
    <Route path="/components" component={Main}>
      <Route path=":component" />
    </Route>
  </Router>
), document.getElementById('app'));
