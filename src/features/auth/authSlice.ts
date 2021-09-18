import { createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
} from "../types";



// :string?
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

export const tokenToUser = async (auth:any) => {
  try {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/jwtcookie/create`,
      auth,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
};

export const getRefreshToken = async () => {
  try {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/jwtcookie/refresh`
    );
    return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
};
// refresh:anyはあとで変える
export const newToken = async (refresh: any) => {
  const csrf = getCsrfToken();

  try {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/jwtcookie/newtoken`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf,
        },
        body: refresh,
      }
    );
    return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
};

// createAsyncThunkで非同期処理をラッパーすることでPromiseの状態(Pending, fulfilled、rejected)でハンドリングを行うことができるようになる
// 利点としてはReducerの処理でこのハンドリング結果を渡せること(fulfilledの場合はreturn res.data、rejectedの場合はerrorMessageをaction.payloadの引数として渡せる)
// 今回はひとまずそれは使わない
export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  async (auth: CRED) => {
     try {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/jwtcookie/create`,
      auth,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        withCredentials: true,
      }
    );
    return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
  }
);

  // Reducerにハンドリング結果を渡す形式ならこれ
// export const fetchAsyncLogin = createAsyncThunk(
//   "auth/login",
//  第一引数を指定しない場合はargを入れておく。またTypeScriptの場合はthunkAPIに型指定を促されることがある
//   async (auth: CRED, thunkAPI) => {
//      try {
//     const res = await axios.post<JWT>(
//       `${process.env.REACT_APP_API_URL}/api/jwtcookie/create`,
//       auth,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     return res.data;
//     } catch (e: any) {
//       const res = thunkAPI.rejectWithValue({ errorMessage: "Fetch Error" })
//       return res
        //  または
    //   } catch (e: any) {
    //   const errorMessage = e.message;
    //   return thunkAPI.rejectWithValue(errorMessage);
    // }
//     }
//   }
// );

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: CRED) => {
    const csrf = getCsrfToken()
    try {
        const res = await axios.post<USER>(
        `${process.env.REACT_APP_API_URL}/api/create/`,
        auth,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf,
        },
      }
        )
      return res.data

    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
    }
);

export const fetchAsyncGetMyProf = createAsyncThunk(
  "auth/loginuser",
  async () => {
    const csrf = getCsrfToken()
    try {
        const res = await axios.get<LOGIN_USER>(
        `${process.env.REACT_APP_API_URL}/api/loginuser/`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf,
        },
      }
        )
      return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
    }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  "auth/createProfile",
  async () => {
    const csrf = getCsrfToken()
    try {
        const res = await axios.post<PROFILE>(
        `${process.env.REACT_APP_API_URL}/api/profile/`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf,
        },
      }
        )
      return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
    }
);

export const fetchAsyncGetProf = createAsyncThunk(
  "auth/getProfiles",
  async () => {
    const csrf = getCsrfToken()
    try {
        const res = await axios.get<PROFILE>(
        `${process.env.REACT_APP_API_URL}/api/profile/`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf,
        },
      }
        )
      return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
    }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
  "auth/updateProfile",
  async (profile: POST_PROFILE) => {
    const csrf = getCsrfToken()
    const uploadData = new FormData();
    profile.img && uploadData.append("img", profile.img, profile.img.name);
    try {
        const res = await axios.put<PROFILE>(
        `${process.env.REACT_APP_API_URL}/api/profile/${profile.id}/`,
        uploadData,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf,
        },
      }
        )
      return res.data;
    } catch (e: any) {
      const errorMessage = e.message;
      console.log(errorMessage);
      return errorMessage;
    }
    }
);

const initialState: AUTH_STATE = {
  isLoginView: true,
  loginUser: {
    id: 0,
    username: "",
  },
  profiles: [{ id: 0, user_profile: 0, img: null }],
};

// https://redux-toolkit.js.org/usage/usage-with-typescript参照
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  // extraReducersはcreateAsyncThunkでラッパーした非同期処理を行ったあとに行う、state管理やaction実行を定義
  // 従来だとuseDispatchの部分
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        // localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/tasks");
      }
    );
     builder.addCase(
      fetchAsyncGetMyProf.fulfilled,
      (state, action: PayloadAction<LOGIN_USER>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
    builder.addCase(
      fetchAsyncGetProf.fulfilled,
      (state, action: PayloadAction<PROFILE[]>) => {
        return {
          ...state,
          profiles:action.payload
        }
      }
    );
    builder.addCase(
      fetchAsyncUpdateProf.fulfilled,
      (state, action: PayloadAction<PROFILE>) => {
        return {
          ...state,
          profiles: state.profiles.map((prof) => prof.id === action.payload.id ? action.payload : prof),
        };
      }
    )
  },

});

export const { toggleMode } = authSlice.actions;

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectProfiles = (state: RootState) => state.auth.profiles;

export default authSlice.reducer;
