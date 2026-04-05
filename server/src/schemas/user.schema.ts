import { z } from "zod";

export const userIdSchema = z.object({
    id: z
        .string("The user ID is required")
        .uuid("The user ID is not in a valid format"),
});

export const registerSchema = z.object({
    email: z
        .string("Email is required")
        .email("Invalid email format")
        .max(100, "Email is too long"),
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(30, "Password must not exceed 30 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
    userName: z
        .string("Username is required")
        .min(3, "Minimum 3 characters")
        .max(15, "Maximum 15 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores are allowed"),
    fullName: z
        .string("Full name is required")
        .min(2, "Name is too short")
        .max(60, "Maximum 60 characters"),
});

export const loginSchema = z.object({
    identifier: z
        .string("Email or username is required")
        .min(3, "Identifier is too short"),
    
    password: z
        .string("Password is required")
        .min(1, "Password cannot be empty")
});

export const updateProfileSchema = z.object({
    userName: z.string({ message: "Username must be a string" })
        .min(3, { message: "Username must be at least 3 characters" })
        .optional(),
    fullName: z.string({ message: "Full name must be a string" })
        .min(3, { message: "Full name must be at least 3 characters" })
        .optional(),
    bio: z
        .string()
        .optional().or(z.literal(""))
        .nullable(),
    website:z
        .string().url({ message: "Website must be a valid URL" })
        .optional()
        .or(z.literal(""))
        .nullable(),
    githubUser: z
        .string()
        .optional()
        .or(z.literal(""))
        .nullable(),
    avatar: z.enum(["Terminal", "Braces", "Cpu", "Code", "Hash", "Bug", "Binary", "GitGraph"], {
        message: "Invalid avatar"
    }),
});