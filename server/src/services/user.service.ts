import { Op } from 'sequelize';
import bcrypt from "bcrypt";
import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/handleError';

// Models
import User from "../models/User";
import Snippet from '../models/Snippet';

// DTO'S
import {
    LoginResponse,
    LoginUserRequest,
    RegisterUserRequest,
    UpdateProfileRequest,
    UpdateProfileResponse,
    UserProfileResponse
} from '../dtos/user.dto';

// Utils
import { generateToken } from '../utils/jwt';

// Types
import { PublicSnippet } from '../dtos/snippet.dto';

export default class UserService {
    // Function to create account
    async register(data: RegisterUserRequest) : Promise<string> {
        // Find a user
        const existing = await User.findOne({
            where: { [Op.or]: [{ email: data.email }, { userName: data.userName }] },
        });

        // Check if already exists
        if (existing) {
            const field = existing.email === data.email ? "Email" : "User Name";
            throw new ConflictError(`${field} is already in use`);
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

    // Function to access to the platform
    async login(data: LoginUserRequest): Promise<LoginResponse> {
        const { identifier, password } = data;

        // Search user by email or userName
        const isEmail = identifier.includes("@");
        const user = await User.findOne({
            where: isEmail ? { email: identifier } : { userName: identifier },
        });
    
        if (!user) throw new NotFoundError("User not found");

        // Check passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedError("Incorrect credentials");

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
                memberSince: user.createdAt,
            }
        };
    };

    // Function to view the profile of an user
    async getProfile(userName: string) : Promise<UserProfileResponse> {
        // Search user
        const user = await User.findOne({ 
            where: { userName: userName }
        });

        // Not found
        if (!user) throw new NotFoundError("User not found");
    
        // Search public snippets
        const snippets = await Snippet.findAll({
            where: {
                userId: user.id,
                visibility: "public"
            }
        });
        const publicSnippets: PublicSnippet[] = snippets.map((snippet) => ({
            id: snippet.id,
            title: snippet.title,
            description: snippet.description,
            lang: snippet.lang,
            updatedAt: snippet.updatedAt
        }));
    

        // Found
        return {
            userName: user.userName,
            fullName: user.fullName,
            bio: user.bio,
            website: user.website,
            githubUser: user.githubUser,
            memberSince: user.createdAt,
            avatar: user.avatar,
            snippets: publicSnippets
        };
    };

    // Function to update the profile (by the user itself)
    async updateProfile(user: User, data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
        // Check that the new userName is not already taken by another user
        if (data.userName && data.userName !== user.userName) {
            const taken = await User.findOne({ where: { userName: data.userName } });
            if (taken) throw new ConflictError("Username already taken");
        }

        // Update user
        await user.update(data);

        // Return updated data
        return {
            message: "Profile updated successfully",
            email: user.email,
            userName: user.userName,
            fullName: user.fullName,
            bio: user.bio,
            avatar: user.avatar,
            website: user.website,
            githubUser: user.githubUser
        };
    };

    // Function to delete account by the user
    async deleteAccount(user: User) : Promise<void> {
        await user.destroy();
    };
};