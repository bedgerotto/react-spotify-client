import React from 'react';

import { Alert } from 'react-bootstrap';

const Error = () => {
  return (
    <div>
      <Alert variant="danger">
        Something went wrong. Please, try re-login.
      </Alert>
    </div>
  )
}

export default Error;