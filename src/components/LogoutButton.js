import React from 'react';

const LogoutButton = (props) => {
  return (
    <button onClick={props.handleLogoutButton}>Logout</button>
  );
};

export default LogoutButton;
