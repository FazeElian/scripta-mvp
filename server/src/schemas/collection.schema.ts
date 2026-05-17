import { z } from "zod";

export const collectionIdSchema = z.object({
    id: z
        .string("The collection ID is required")
        .uuid("The collection ID is not in a valid format"),
});

export const createCollectionSchema = z.object({
    title: z
        .string("Title is required")
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title is too long"),

    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .or(z.literal("")),

    color: z
        .enum([
            "orange", "red", "seagreen", "green",
            "sky-blue", "blue", "purple", "pink", "yellow"
        ], "Please select a valid color")
        .optional(),

    icon: z
        .enum([
            "Code", "CodeXml", "Terminal", "Braces", "Hash",
            "Binary", "Bug", "GitGraph", "Cpu", "Layers",
            "BookOpen", "BookText", "GraduationCap", "Library",
            "Lightbulb", "Puzzle", "Brain", "Telescope",
            "FlaskConical", "Atom", "FolderOpen", "Network",
            "Waypoints", "TreePine", "Workflow", "LayoutDashboard",
            "Blocks", "Shapes", "Calculator", "ChartLine",
            "Sigma", "Infinity", "SortAsc", "Filter", "Zap", "Rocket"
        ], "Please select a valid icon")
        .optional(),

    visibility: z
        .enum(["public", "private"], "Please select a valid visibility option")
        .default("public"),
});

export const updateCollectionSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title is too long")
        .optional(),

    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .or(z.literal("")),

    color: z
        .enum([
            "orange", "red", "seagreen", "green",
            "sky-blue", "blue", "purple", "pink", "yellow"
        ], "Please select a valid color")
        .optional(),

    icon: z
        .enum([
            "Code", "CodeXml", "Terminal", "Braces", "Hash",
            "Binary", "Bug", "GitGraph", "Cpu", "Layers",
            "BookOpen", "BookText", "GraduationCap", "Library",
            "Lightbulb", "Puzzle", "Brain", "Telescope",
            "FlaskConical", "Atom", "FolderOpen", "Network",
            "Waypoints", "TreePine", "Workflow", "LayoutDashboard",
            "Blocks", "Shapes", "Calculator", "ChartLine",
            "Sigma", "Infinity", "SortAsc", "Filter", "Zap", "Rocket"
        ], "Please select a valid icon")
        .optional(),

    visibility: z
        .enum(["public", "private"], "Please select a valid visibility option")
        .optional(),
});

export const addSnippetToCollectionSchema = z.object({
    snippetId: z
        .string("Snippet ID is required")
        .uuid("The snippet ID is not in a valid format"),

    orderIndex: z
        .number()
        .int("Order index must be an integer")
        .min(0, "Order index must be 0 or greater")
        .optional(),
});

export const reorderSnippetsSchema = z.object({
    order: z
        .array(
            z.object({
                snippetId: z
                    .string("Snippet ID is required")
                    .uuid("The snippet ID is not in a valid format"),
                orderIndex: z
                    .number()
                    .int("Order index must be an integer")
                    .min(0, "Order index must be 0 or greater"),
            })
        )
        .min(1, "Order array cannot be empty"),
});