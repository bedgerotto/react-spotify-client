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
  Navbar,
  Nav,
  Container
} from "react-bootstrap";

import Cookies from 'universal-cookie';

import Index from './views/Index';
import Home from './views/Home';
import Callback from './views/Callback';
import Search from './views/Search';
import Artist from './views/Artist';
import Track from './views/Track';
import Album from './views/Album';

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
    window.location = '/'
  }

  useEffect(() => {
    const cookies = new Cookies();

    setIsAuthenticated(!!cookies.get('access_token'));
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Spotify Client</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              { isAuthenticated ? <Nav.Link as={Link} to="/home">Home</Nav.Link> : null }
              { isAuthenticated ? <Nav.Link as={Link} to="/search">Search</Nav.Link> : null }
            </Nav>
            { isAuthenticated ? <LogoutButton handleLogoutButton={handleLogoutButton} /> : <LoginButton handleLoginButton={handleLoginButton} />}
          </Navbar.Collapse>
        </Navbar>

        <Container className="mt-5" fluid="sm">
          <Switch>
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/search" component={Search} />
            <ProtectedRoute path="/artist/:artistId" component={Artist} />
            <ProtectedRoute path="/track/:trackId" component={Track} />
            <ProtectedRoute path="/album/:albumId" component={Album} />
            <Route path="/callback" component={Callback} />
            <Route path="/" component={Index} />
          </Switch>
        </Container>

      </Router>
    </AuthContext.Provider>
  );
}

export default App;
