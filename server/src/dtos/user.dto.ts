// Request Dto's
export interface RegisterUserRequest {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
    fullName: string;
};

export interface LoginUserRequest {
    identifier: string; // Email | userName
    password: string;
};

// Response Dto's
export interface UserProfileResponse {
    id: string;
    email: string;
    bio?: string;
    userName: string;
    fullName: string;
    avatar: string;
    createdAt: Date;
};

export interface AuthResponse {
    token: string;
    user: UserProfileResponse;
};

export interface ProfileReponse {
    userName: string;
    fullName: string;
    bio?: string;
    website?: string;
    githubUser?: string;
    memberSince: Date;
};