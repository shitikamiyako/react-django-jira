import React, { useEffect } from "react";
import styles from "./App.module.css";
import { Grid, Avatar } from "@material-ui/core";
import axios from "axios";
import {
  makeStyles,
  createTheme,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";

import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  selectProfiles,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncUpdateProf,
} from "./features/auth/authSlice";

import {
  selectEditedTask,
  fetchAsyncGetCategory,
  fetchAsyncGetUsers,
  fetchAsyncGetTasks,
} from "./features/task/taskSlice";

import { AppDispatch } from "./app/store";
import TaskList from "./features/task/TaskList";
import TaskForm from "./features/task/TaskForm";
import TaskDisplay from "./features/task/TaskDisplay";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#3cb371",
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginTop: theme.spacing(3),
    cursor: "none",
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));
const App: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedTask = useSelector(selectEditedTask);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);

  const loginProfile = profiles.filter(
    (prof) => prof.user_profile === loginUser.id
  )[0];

  // ログアウト処理は非同期でやる必要はない
  const Logout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/logout/`);
    window.location.href = "/";
  };

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  // 初回レンダリング時に一覧をすべて取得
  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetMyProf());
      await dispatch(fetchAsyncGetTasks());
      await dispatch(fetchAsyncGetUsers());
      await dispatch(fetchAsyncGetCategory());
      await dispatch(fetchAsyncGetProfs());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={styles.app__root}>
        <Grid container>
          <Grid item xs={4}>
            <PolymerIcon className={classes.icon} />
          </Grid>

          <Grid item xs={4}>
            <h1>Scrum Task Boarder</h1>
          </Grid>

          <Grid item xs={4}>
            <div className={styles.app__logout}>
              <button
                className={styles.app__iconLogout}
                onClick={() => Logout()}
              >
                <ExitToAppIcon fontSize="large" />
              </button>
              {/* AvatarコンポーネントをクリックするとimageInputを取得して表示される */}
              <input
                type="file"
                id="imageInput"
                hidden={true}
                onChange={(e) =>
                  dispatch(
                    fetchAsyncUpdateProf({
                      id: loginProfile.id ? loginProfile.id : loginUser.id,
                      img: e.target.files !== null ? e.target.files[0] : null,
                    })
                  )
                }
              />
              <button
                className={styles.app__btn}
                onClick={() => handlerEditPicture()}
              >
                <Avatar
                  className={classes.avatar}
                  alt="avatar"
                  src={
                    // アバターの画像データがあればそれを表示、nullなら未表示
                    loginProfile?.img !== null ? loginProfile?.img : undefined
                  }
                />
              </button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TaskList />
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "80vh" }}
            >
              <Grid item>
                {editedTask.status ? <TaskForm /> : <TaskDisplay />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
