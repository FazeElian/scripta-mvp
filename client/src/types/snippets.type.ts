import type z from "zod";
import { createSnippetSchema } from "@/schemas/snippet.schema";

export interface SnippetByOwner {
    id: string;
    title: string;
    description: string;
    lang: string;
    visibility: string;
    updatedAt: Date;
};

export type NewSnippet = z.infer<typeof createSnippetSchema>;