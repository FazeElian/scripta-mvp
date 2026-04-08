import type z from "zod";
import { createSnippetSchema } from "@/schemas/snippet.schema";

export type NewSnippet = z.infer<typeof createSnippetSchema>;