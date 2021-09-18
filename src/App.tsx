import React from "react";
import { Button } from "@material-ui/core/";
import { tokenToUser } from "./features/auth/authSlice";
import axios from "axios";
import {
  AUTH_STATE,
  CRED,
  LOGIN_USER,
  POST_PROFILE,
  PROFILE,
  JWT,
  USER,
  CSRF,
} from "./features/types";

import "./App.css";

let _csrfToken: any = null;

const getCsrfToken = async () => {
  if (_csrfToken === null) {
    try {
      const res = await axios.get<CSRF>(
        `${process.env.REACT_APP_API_URL}/api/csrf/create`
      );
      _csrfToken = res.data;
      return _csrfToken;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
  }
};

const test = async () => {
  const csrf = getCsrfToken();
  try {
    const res = await axios.get<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/loginuser/`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf,
        },
      }
    );
    return res.data;
  } catch (e: any) {
    const errorMessage = e.message;
    console.log(errorMessage);
    return errorMessage;
  }
};

function App() {
  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() =>
          tokenToUser({ username: "sample1", password: "testuser" })
        }
      >
        Token
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => test()}
      >
        Data
      </Button>
    </div>
  );
}

export default App;
