import React, { useCallback, useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  loggedIn: false,
  userData: null,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedLoggedIn = localStorage.getItem("loggedIn");
  const storedUserData = {
    IdUsuario: localStorage.getItem("IdUsuario"),
    EsTrainner: localStorage.getItem("EsTrainner"),
  };
  return {
    token: storedToken,
    userData: storedUserData,
    loggedIn: storedLoggedIn === "true" ? true : false,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken, initialLogged, initialUserData;
  if (tokenData) {
    initialToken = tokenData.token;
    initialLogged = tokenData.loggedIn;
    initialUserData = tokenData.userData;
  }

  const [token, setToken] = useState(initialToken);
  const [userData, setUserData] = useState(initialUserData);
  const [loggedIn, SetLoggedIn] = useState(initialLogged);

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("IdUsuario");
    localStorage.removeItem("EsTrainner");
  }, []);

  const loginHandler = (token, userData, loggedIn) => {
    console.log(loggedIn);
    setToken(token);
    setUserData(userData);
    SetLoggedIn(loggedIn);
    localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", loggedIn ? true : false);
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
    loggedIn: loggedIn,
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
