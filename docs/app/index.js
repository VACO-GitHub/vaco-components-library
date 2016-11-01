import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, useRouterHistory } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
// import createHashHistory from 'history/createHashHistory';

import Home from './components/layout/home';
import Install from './components/layout/install';
import Main from './components/layout/main';

// const history = useRouterHistory(createHashHistory)(
const appHistory = createHistory(
  {
    // basename: __dirname,
    hashType: 'slash'
    // queryKey: false
  }
);
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

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
