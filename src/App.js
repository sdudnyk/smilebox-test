import React from 'react';
import Home from './components/Home';
import MoviePage from "./components/MoviePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/tt:id' component={MoviePage} />
        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </Router>
  );
}

export default App;
