import { Op } from 'sequelize';
import bcrypt from "bcrypt";

// Model
import User from "../models/User";

// DTO'S
import {
    AuthResponse,
    LoginUserRequest,
    RegisterUserRequest
} from '../dtos/user.dto';

// Utils
import { generateToken } from '../utils/jwt';

export default class UserService {
    async register(data: RegisterUserRequest) : Promise<string> {
        // Find a user
        const existing = await User.findOne({
            where: { [Op.or]: [{ email: data.email }, { userName: data.userName }] },
        });

        // Check if already exists
        if (existing) {
            const field = existing.email === data.email ? "email" : "userName";
            throw new Error(`${field} is already in use`);
        }

        // Hash user password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user
        await User.create({
            email: data.email,
            userName: data.userName,
            password: hashedPassword,
            fullName: data.fullName,
        });

        // Return sucess message
        return "You have successfully created your account, you can now login.";
    }

    async login(data: LoginUserRequest): Promise<AuthResponse> {
        const { identifier, password } = data;

        // Search user by email or userName
        const isEmail = identifier.includes("@");
        const user = await User.findOne({
            where: isEmail ? { email: identifier } : { userName: identifier },
        });

        // Check passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch || !user) {
            throw new Error("Incorrect credentials");
        }

        // Generate auth token
        const token = generateToken(user);

        // Return object with the <AuthResponse> type
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                userName: user.userName,
                fullName: user.fullName,
                avatar: user.avatar,
                createdAt: user.createdAt,
            }
        };
    };
};