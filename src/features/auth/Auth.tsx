import React, { useState } from "react";
import styles from "./Auth.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import axios from "axios";
import {
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncCreateProf,
  selectIsLoginView,
} from "./authSlice";
import { tokenToUser } from "./authSlice";

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const isLoginView = useSelector(selectIsLoginView);
  const [credential, setCredential] = useState({ username: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    // [name]の部分はinputタグのname属性が入る。今回の場合だと、credentialにはusernameとpasswordからなるプロパティが入るのでそのどちらか。
    setCredential({ ...credential, [name]: value });
  };
  const login = async () => {
    if (isLoginView) {
      // BrowserRouterを使ったSPA遷移の場合、遷移後にもう一度やらないとCookieにTokenが入らない？
      await dispatch(fetchAsyncLogin(credential));
    } else {
      const result = await dispatch(fetchAsyncRegister(credential));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(credential));
        await dispatch(fetchAsyncCreateProf());
      }
    }
    tokenToUser(credential);
  };
  return (
    <div className={styles.auth__root}>
      <h1>{isLoginView ? "Login" : "Register"}</h1>
      <br />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="username"
        type="text"
        name="username"
        value={credential.username}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="password"
        type="text"
        name="password"
        value={credential.password}
        onChange={handleInputChange}
      />

      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={login}
      >
        {isLoginView ? "Login" : "Register"}
      </Button>
      <span onClick={() => dispatch(toggleMode())}>
        {isLoginView ? "Create new account?" : "Back to Login?"}
      </span>
    </div>
  );
};

export default Auth;
