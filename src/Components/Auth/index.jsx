import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';

const Auth = ({ capability, children }) => {
  const { isLoggedIn, can } = useContext(AuthContext);

  // Check if the user is logged in and has the required capability
  const authorizedRender = isLoggedIn && (capability ? can(capability) : true);

  // Use ternary operator to conditionally render children
  return (
    <>
      {authorizedRender ? children : null}
    </>
  );
}

export default Auth;
