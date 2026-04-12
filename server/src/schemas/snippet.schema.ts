import { z } from "zod";

export const snippetIdSchema = z.object({
    id: z
        .string("The snippet ID is required")
        .uuid("The snippet ID is not in a valid format"),
});

export const createSnippetSchema = z.object({
    title: z
        .string("Title is required")
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title is too long"),
    
    description: z
        .string()
        .max(255, "Description cannot exceed 255 characters")
        .optional()
        .or(z.literal("")),
    lang: z
        .string("Language is required")
        .min(1, "Please select a language"),

    visibility: z
        .enum(["public", "private", "unListed"], "Please select a valid visibility option")
        .default("private"),
});