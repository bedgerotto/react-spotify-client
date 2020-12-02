import React from 'react';
import { Button } from "react-bootstrap";

const LogoutButton = (props) => {
  return (
    <Button onClick={props.handleLogoutButton}>Logout</Button>
  );
};

export default LogoutButton;
