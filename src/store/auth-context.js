import React, { useCallback, useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userData: null,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserData = {
    IdUsuario: localStorage.getItem("IdUsuario"),
    EsTrainner: localStorage.getItem("EsTrainner"),
  };
  return {
    token: storedToken,
    userData: storedUserData,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  const [token, setToken] = useState(tokenData);
  const [userData, setUserData] = useState(null);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("IdUsuario");
    localStorage.removeItem("EsTrainner");
  }, []);

  const loginHandler = (token, userData) => {
    setToken(token);
    setUserData(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("IdUsuario", userData.IdUsuario);
    localStorage.setItem("EsTrainner", userData.EsTrainner);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData);
    }
  }, [tokenData]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userData: userData,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
