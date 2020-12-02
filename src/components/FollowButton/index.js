import React from 'react';
import { Button } from "react-bootstrap";

const LoginButton = (props) => {
  return (
    <Button className={`btn btn-success col-sm-12 ${props.className}`} onClick={props.handleFollowButtonClick}>Follow</Button>
  );
};

export default LoginButton;
