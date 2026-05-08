import { z } from "zod";

export const formSnippetSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title is too long"),
    
    description: z
        .string()
        .max(255, "Description cannot exceed 255 characters")
        .optional()
        .or(z.literal("")),

    lang: z
        .string()
        .min(1, "Please select a language"),

    visibility: z
        .enum(["public", "private", "unListed"]),
        
    tags: z
        .array(z.string().min(1).max(50))
        .max(10, "You can add up to 5 tags")
        .default([]),
});