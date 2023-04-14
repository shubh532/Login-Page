import React, {useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false, //Default Value
  onLogOut: () => {},
  onLogIn:(email,password,clgName)=>{}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storeUserLoogedInfo = localStorage.getItem("isLogged");
    if (storeUserLoogedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const LogoutHandler = () => {
    localStorage.removeItem("isLogged");
    setIsLoggedIn(false);
  };
  const LoggedInHandler = (email,password,clgName) => {
    localStorage.setItem("isLogged", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogOut: LogoutHandler,
        onLogIn: LoggedInHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
