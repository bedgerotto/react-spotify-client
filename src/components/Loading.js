import React from 'react';
import { Spinner, Row } from 'react-bootstrap';

const Loading = () => {
  return (
    <Row className="justify-content-md-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Row>
  )
};

export default Loading;
