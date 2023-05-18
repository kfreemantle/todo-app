// Import axios for making API requests
import axios from 'axios';
import { createContext, useState } from 'react';

// API base URL
const API_URL = 'https://api-js401.herokuapp.com';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    try {
      // We will use a basic authentication schema, so we need to base64 encode the username and password
      const encodedCredentials = btoa(`${username}:${password}`);
      const response = await axios({
        method: 'post',
        url: `${API_URL}/signin`,
        headers: { Authorization: `Basic ${encodedCredentials}` },
      });
      // Store the token in state
      setToken(response.data.token);
      // Mark the user as logged in
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Remove the token from state
    setToken(null);
    // Mark the user as logged out
    setLoggedIn(false);
  }

  const contextValue = {
    loggedIn,
    setLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
