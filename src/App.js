import React from 'react';
import 'react-router-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './views/Home';
import Game from './views/Game';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/game/:code/:player_name'>
            <Game/>
          </Route>
          <Route exact path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
