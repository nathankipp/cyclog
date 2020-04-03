import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/:riders([nathan|sarah|jesse|,]+)/:rideId?" component={App} />
      <Route render={() => <Redirect to="/nathan,sarah,jesse" />} />
    </Switch>
  </Router>,
  document.getElementById('root'));
// serviceWorker.register();
