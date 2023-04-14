import React, { useState, useEffect, useReducer, useContext } from "react";
import AuthContext from "../../ContextAPI/contextAPI";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, IsValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_USER") {
    return { value: state.value, IsValid: state.value.includes("@") };
  }
  return { value: "", IsValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, IsValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_USER") {
    return { value: state.value, IsValid: state.value.trim().length > 6 };
  }
  return { value: "", IsValid: false };
};

const clgReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, IsValid: action.value.trim().length > 0 };
  }
  if (action.type === "INPUT_USER") {
    return { value: state.value, IsValid: state.value.trim().length > 0 };
  }
  return { value: "", IsValid: false };
};
const Login = () => {
  const AuthCtx=useContext(AuthContext)

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    IsValid: null,
  });
  const [clgState, dispatchClg] = useReducer(clgReducer, {
    value: "",
    IsValid: null,
  });
  const [PassWordState, dispatchPass] = useReducer(passwordReducer, {
    value: "",
    IsValid: null,
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log(
        "Somthing happend when use effect execute it repeatedly ececute as event ocuurs in input ...!"
      );
      setFormIsValid(
        emailState.IsValid && PassWordState.IsValid && clgState.IsValid
      );
    }, 500);

    return () => {
      clearTimeout(timeOut);
      console.log("clean unwanted task in useEffect");
    };
  }, [emailState, PassWordState, clgState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const clgName = (event) => {
    dispatchClg({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_USER" });
  };
  const CheckClgName = () => {
    dispatchClg({ type: "INPUT_USER" });
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "INPUT_USER" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogIn(emailState.value, PassWordState.value, clgState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.IsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            clgState.IsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="ClgName"
            value={clgState.value}
            onChange={clgName}
            onBlur={CheckClgName}
          />
        </div>
        <div
          className={`${classes.control} ${
            PassWordState.IsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={PassWordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
