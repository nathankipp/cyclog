import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" render={() => {
          window.sessionStorage.setItem('cyclog', true);
          return <Redirect to="/nathan,sarah,jesse" />}
        }
      />
      <Route path="/:riders([nathan|sarah|jesse|,]+)/:rideId?" component={App} />
      <Route path="/:riders(jessecoconut)/:rideId?" component={App} />
      <Route render={() => <Redirect to="/nathan,sarah,jesse" />} />
    </Switch>
  </Router>,
  document.getElementById('root'));
// serviceWorker.register();
