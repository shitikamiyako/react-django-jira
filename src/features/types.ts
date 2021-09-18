// authSlice.ts
export interface LOGIN_USER {
    id: number;
    username: string;
}
// 画像データ等への型付け。組み込みのBlobを継承する
export interface FILE extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
export interface PROFILE {
    id: number;
    user_profile: number;
    img: string | null;
}
export interface POST_PROFILE {
    id:number;
    img: File | null;
}
export interface CRED {
    username: string;
    password: string;
}
export interface JWT {
    access: string;
    refresh: string;
}

export interface CSRF {
    csrfToken: string;
}
export interface USER {
    id: number;
    username: string;
}
export interface AUTH_STATE {
    isLoginView: boolean;
    loginUser: LOGIN_USER;
    profiles: PROFILE[];
}

export interface READ_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    status_name: string;
    category: number;
    category_item: string;
    estimate: number;
    responsible: number;
    responsible_username: string;
    owner: number
    owner_username: string;
    create_at: string;
    updated_at: string;
}

export interface POST_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    category: number;
    estimate: number;
    responsible: number;
}

export interface CATEGORY {
    id: number;
    item: string;
}

export interface TASK_STATE {
    tasks: READ_TASK[];
    editedTask: POST_TASK;
    selectedTask: READ_TASK;
    users: USER[];
    category: CATEGORY[];
}