// Import necessary packages
import React, { useContext } from 'react';
import { When } from 'react-if';

// Import the AuthContext to consume its values
import { AuthContext } from '../../Context/Auth';

// The Auth component is responsible for authorizing users based on their capabilities
const Auth = ({ capability, children }) => {
  // useContext Hook is used to access the values of AuthContext
  const { loggedIn, can } = useContext(AuthContext);

  // Check if user is logged in
  const isLoggedIn = loggedIn;

  // Check if user has the capability to perform certain actions
  // If the capability is not specified, default to true
  const canDo = capability ? can(capability) : true;

  // If user is logged in and has the required capability,
  // authorizedRender is set to true, else it's false
  const authorizedRender = isLoggedIn && canDo;

  // The When component from react-if package is used to conditionally render components
  // If authorizedRender is true, the child components will be rendered
  return (
    <When condition={authorizedRender}>
      {children}
    </When>
  );
}

// Export the Auth component
export default Auth;
