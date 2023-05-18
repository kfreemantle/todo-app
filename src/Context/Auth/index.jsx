// Import necessary packages
import React, { useState } from 'react';
import testUsers from './lib/users';  // replace this with the correct path to your users.js file
import jwt_decode from "jwt-decode";

// Create the AuthContext
export const AuthContext = React.createContext();

// AuthProvider is the Context Provider component for authentication
const AuthProvider = ({ children }) => {
  // useState Hooks are used to manage states for isLoggedIn, user
  // error
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  // function to check if user has a certain capability
  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  // function to validate the JWT token
  const _validateToken = (token) => {
    try{
      // Decode the token
      let validUser = jwt_decode(token);
      console.log('validUser', validUser);

      // If a validUser exists, set user to validUser and isLoggedIn to true
      if (validUser){
        setUser(validUser);
        setIsLoggedIn(true);
        console.log('I am logged in!');
      }
    }catch(e){
      // If an error occurs, set error to the error and log it
      setError(e);
      console.log(e);
    }
  };

  // function to log in the user
  const login = (username, password) => {
    // Find the user in the testUsers object
    let user = testUsers[username];
    
    // If user exists and the password is correct, validate the token
    if(user && user.password === password){
      try {
        _validateToken(user.token);
      } catch(e){
        setError(e);
        console.log(e);
      }
    }
  };

  // function to log out the user
  const logout = () => {
    // Clear the user object and set isLoggedIn to false
    setUser({});
    setIsLoggedIn(false);
  };

  // define the values that will be provided through AuthContext
  const values = {
    isLoggedIn,
    user,
    error,
    login,
    logout,
    can,
  }

  // Wrap children components with AuthContext.Provider
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
