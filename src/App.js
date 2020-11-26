import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';

import React, { useEffect, useState } from 'react';

import Index from './views/Index';
import Login from './views/Login';
import Home from './views/Home';

function App() {
  
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Index} />
      </Switch>

    </Router>
  );
}

export default App;
