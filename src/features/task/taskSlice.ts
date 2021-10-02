import { createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { READ_TASK, POST_TASK, TASK_STATE, USER, CATEGORY } from "../types";

export const fetchAsyncGetTasks = createAsyncThunk("task/getTask", async () => {
    const res = await axios.get<READ_TASK[]>(
        `${process.env.REACT_APP_API_URL}/api/tasks/`,
        {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        },
    );
    return res.data;
});

export const fetchAsyncGetUsers = createAsyncThunk(
    "task/getUsers",
    async () => {
        const res = await axios.get<USER[]>(
             `${process.env.REACT_APP_API_URL}/api/users/`,
        {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,

        },
    );
    return res.data;
})

export const fetchAsyncGetCategory = createAsyncThunk(
    "task/getCategory",
    async () => {
        const res = await axios.get<CATEGORY[]>(
             `${process.env.REACT_APP_API_URL}/api/category/`,
        {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        },
    );
    return res.data;
});

export const fetchAsyncCreateCategory = createAsyncThunk(
    "task/createCategory",
    async (item: string) => {
        const res = await axios.post<CATEGORY>(
             `${process.env.REACT_APP_API_URL}/api/category/`,
             { item: item },
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,

        },
    );
    return res.data;
});

export const fetchAsyncCreateTask = createAsyncThunk(
    "task/createTask",
    async (task: POST_TASK) => {
        const res = await axios.post<READ_TASK>(
             `${process.env.REACT_APP_API_URL}/api/tasks/`,
             task,
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            withCredentials: true,
        },
    );
    return res.data;
});

export const fetchAsyncUpdateTask = createAsyncThunk(
    "task/updateTask",
    async (task: POST_TASK) => {
        const res = await axios.put<READ_TASK>(
             `${process.env.REACT_APP_API_URL}/api/tasks/${task.id}/`,
             task,
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            withCredentials: true,
        },
    );
    return res.data;
});

export const fetchAsyncDeleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id: number) => {
        await axios.delete(
             `${process.env.REACT_APP_API_URL}/api/tasks/${id}/`,
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            withCredentials: true,
        },
    );
    return id;
});

export const initialState: TASK_STATE = {
    tasks: [
        {
            id: 0,
            task: "",
            description: "",
            criteria: "",
            status: "",
            status_name: "",
            category: 0,
            category_item: "",
            estimate: 0,
            responsible: 0,
            responsible_username: "",
            owner: 0,
            owner_username: "",
            created_at: "",
            updated_at: "",
        },
    ],
    editedTask: {
            id: 0,
            task: "",
            description: "",
            criteria: "",
            status: "",
            category: 0,
            estimate: 0,
            responsible: 0,
        },
    selectedTask:{
            id: 0,
            task: "",
            description: "",
            criteria: "",
            status: "",
            status_name: "",
            category: 0,
            category_item: "",
            estimate: 0,
            responsible: 0,
            responsible_username: "",
            owner: 0,
            owner_username: "",
            created_at: "",
            updated_at: "",
        },
     users: [
        {
            id: 0,
            username: "",
        }
    ],
    category: [
        {
            id: 0,
            item: "",
        }
    ]
};

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        editTask(state, action: PayloadAction<POST_TASK>) {
            state.editedTask = action.payload;
        },
        selectTask(state, action: PayloadAction<READ_TASK>) {
            state.selectedTask = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetTasks.fulfilled,
            (state, action: PayloadAction<READ_TASK[]>) => {
                return {
                    ...state,
                    tasks: action.payload,
                };
            }
        );
        // // Token認証に失敗した場合
        // builder.addCase(
        //     fetchAsyncGetTasks.rejected,
        //     () => {
        //         window.location.href = "/";
        //     }
        // );
        builder.addCase(
            fetchAsyncGetUsers.fulfilled,
            (state, action: PayloadAction<USER[]>) => {
                return {
                    ...state,
                    users: action.payload,
                };
            }
        );
        // // Token認証に失敗した場合
        // builder.addCase(
        //     fetchAsyncGetUsers.rejected,
        //     () => {
        //         window.location.href = "/";
        //     }
        // );
        builder.addCase(
            fetchAsyncGetCategory.fulfilled,
            (state, action: PayloadAction<CATEGORY[]>) => {
                return {
                    ...state,
                    category: action.payload,
                };
            }
        );
        // // Token認証に失敗した場合
        // builder.addCase(
        //     fetchAsyncGetCategory.rejected,
        //     () => {
        //         window.location.href = "/";
        //     }
        // );
        builder.addCase(
            fetchAsyncCreateCategory.fulfilled,
            (state, action: PayloadAction<CATEGORY>) => {
                return {
                    ...state,
                    category: [...state.category, action.payload],
                };
            }
        );
        // Token認証に失敗した場合
        builder.addCase(
            fetchAsyncCreateCategory.rejected,
            () => {
                window.location.href = "/";
            }
        );
        builder.addCase(
            fetchAsyncCreateTask.fulfilled,
            (state, action: PayloadAction<READ_TASK>) => {
                return {
                    ...state,
                    // 先頭に新規タスクを追加
                    tasks: [ action.payload, ...state.tasks],
                    editedTask: initialState.editedTask,
                };
            }
        );
        // Token認証に失敗した場合
        builder.addCase(
            fetchAsyncCreateTask.rejected,
            () => {
                window.location.href = "/";
            }
        );
        builder.addCase(
            fetchAsyncUpdateTask.fulfilled,
            (state, action: PayloadAction<READ_TASK>) => {
                return {
                    ...state,
                    tasks: state.tasks.map((t) =>
                        t.id === action.payload.id ? action.payload : t
                        ),
                        editedTask: initialState.editedTask,
                        selectedTask: initialState.selectedTask,
                };
            }
        );
        // Token認証に失敗した場合
        builder.addCase(
            fetchAsyncUpdateTask.rejected,
            () => {
                window.location.href = "/";
            }
        );
        builder.addCase(
            fetchAsyncDeleteTask.fulfilled,
            (state, action: PayloadAction<number>) => {
                return {
                    ...state,
                    tasks: state.tasks.filter((t) =>
                        t.id !== action.payload),
                        editedTask: initialState.editedTask,
                        selectedTask: initialState.selectedTask,
                };
            }
        );
        // Token認証に失敗した場合
        builder.addCase(
            fetchAsyncDeleteTask.rejected,
            () => {
                window.location.href = "/";
            }
        );
    },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectSelectedTask = (state: RootState) => state.task.selectedTask;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectTasks = (state: RootState) => state.task.tasks;
export const selectUsers = (state: RootState) => state.task.users;
export const selectCategory = (state: RootState) => state.task.category;

export default taskSlice.reducer;