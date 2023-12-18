import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const setCurrentUserToken = (token) => {
    const { _id } = jwtDecode(token);
    setCurrentUser({token,  userId: _id});
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      const { _id } = jwtDecode(token);
      setCurrentUser({userId: _id, token});
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, setCurrentUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
