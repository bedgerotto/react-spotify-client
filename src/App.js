import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';

import React, { useEffect, useState } from 'react';

import Index from './views/Index';
import Home from './views/Home';

import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

import { loginApi } from './api_resources/request';

import Callback from './views/Callback';
import ProtectedRoute from './api_resources/ProtectedRoute';
import Cookies from 'universal-cookie';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginButton = () => loginApi();

  const handleLogoutButton = () => {
    const cookies = new Cookies();
    cookies.remove('access_token');

    setIsAuthenticated(false)
  }

  useEffect(() => {
    const cookies = new Cookies();

    setIsAuthenticated(!!cookies.get('access_token'));
  }, []);

  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          { isAuthenticated ? <LogoutButton handleLogoutButton={handleLogoutButton} /> : <LoginButton handleLoginButton={handleLoginButton} />}
        </li>
      </ul>

      <Switch>
        <ProtectedRoute path="/home" component={Home} />
        <Route path="/callback" component={Callback} />
        <Route path="/" component={Index} />
      </Switch>

    </Router>
  );
}

export default App;
