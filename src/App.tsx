import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from './page/Home';
import Card from './page/Card';
import NoMatch from './page/NoMatch';

import './App.css';

function App() {
  return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/card">Card</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/card">
              <Card />
            </Route>
            <Route path="*">
              <NoMatch />
          </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
