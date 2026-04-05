export type RegisterUser = {
    email: string;
    password: string;
    userName: string;
    fullName: string;
};

export interface LoginUser {
    identifier: string; // Email | userName
    password: string;
};