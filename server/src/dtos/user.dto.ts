// Request Dto's
export interface RegisterUserRequest {
    email: string;
    password: string;
    userName: string;
    fullName: string;
};

export interface LoginUserRequest {
    identifier: string; // Email | userName
    password: string;
};

export interface UpdateProfileRequest {
    bio?: string;
    website?: string;
    githubUser?: string;
    userName: string;
    fullName: string;
    avatar: string;
};

// Response Dto's
// User info after been authenticated
export interface LoginUserResponse {
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

// Object that includes user info (LoginUserResponse)
export interface LoginResponse {
    token: string;
    user: LoginUserResponse;
};

// Info about a user -> can view anyone even not authenticated
export interface UserProfileResponse {
    userName: string;
    fullName: string;
    bio?: string;
    website?: string;
    githubUser?: string;
    memberSince: Date;
};

// Info returned after the profile is updated by the user
export interface UpdateProfileResponse {
    message: string;
    email: string;
    bio?: string;
    website?: string;
    githubUser?: string;
    userName: string;
    fullName: string;
    avatar: string;
};