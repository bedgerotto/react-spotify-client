import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Index = () => {
  return (
    <div className="container">
      <Jumbotron className="index-panel">
        <h1>Simple Spotify client</h1>
        <br />
        <p>Click on login to use</p>
      </Jumbotron>
    </div>
  )
}

export default Index;
