import React from 'react';
import { Button } from "react-bootstrap";

const LoginButton = (props) => {
  return (
    <Button className={`btn btn-danger col-sm-12 ${props.className}`} onClick={props.handleUnfollowButtonClick}>Unfollow</Button>
  );
};

export default LoginButton;
