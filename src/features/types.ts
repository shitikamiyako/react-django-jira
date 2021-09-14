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
    password: number
}
export interface JWT {
    refresh?: string;
    access?: string;
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
