export interface RegisterUser {
    email: string;
    password: string;
    userName: string;
    fullName: string;
};

export interface LoginUser {
    identifier: string; // Email | userName
    password: string;
};

export interface User {
    id: string;
    email: string;
    bio?: string;
    website?: string;
    githubUser?: string;
    userName: string;
    fullName: string;
    avatar: string;
    memberSince: Date;
};

export interface LoginUserResult {
    id: string;
    email: string;
    bio?: string;
    website?: string;
    githubUser?: string;
    userName: string;
    fullName: string;
    avatar: string;
    memberSince: Date;
};

export interface UpdateProfile {
    bio?: string | null;
    website?: string | null;
    githubUser?: string | null;
    userName?: string;
    fullName?: string;
    avatar: string;
}