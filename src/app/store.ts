import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/task/taskSlice";
// import counterReducer from '../features/counter/counterSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    // counter: counterReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;