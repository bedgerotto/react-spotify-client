import React from 'react';
import { Button } from "react-bootstrap";

const LoginButton = (props) => {
  return (
    <Button onClick={props.handleLoginButton}>Login</Button>
  );
};

export default LoginButton;
