import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React,
  {
    useEffect,
    useState
  } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';

import {
  Navbar, Nav
} from "react-bootstrap";

import Cookies from 'universal-cookie';

import Index from './views/Index';
import Home from './views/Home';
import Callback from './views/Callback';
import Search from './views/Search';
import Artist from './views/Artist';
import Track from './views/Track';

import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

import { loginApi } from './api_resources/request';
import ProtectedRoute from './api_resources/ProtectedRoute';

import AuthContext from './contexts/AuthContext';


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
    <AuthContext.Provider value={isAuthenticated}>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Index</Nav.Link>
              { isAuthenticated ? <Nav.Link as={Link} to="/home">Home</Nav.Link> : null }
              { isAuthenticated ? <Nav.Link as={Link} to="/search">Search</Nav.Link> : null }
            </Nav>
            { isAuthenticated ? <LogoutButton handleLogoutButton={handleLogoutButton} /> : <LoginButton handleLoginButton={handleLoginButton} />}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/search" component={Search} />
          <ProtectedRoute path="/artist/:artistId" component={Artist} />
          <ProtectedRoute path="/track/:trackId" component={Track} />
          <Route path="/callback" component={Callback} />
          <Route path="/" component={Index} />
        </Switch>

      </Router>
    </AuthContext.Provider>
  );
}

export default App;
