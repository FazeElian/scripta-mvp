import { z } from "zod";
import { formSnippetSchema } from "@/schemas/snippet.schema";

export interface SnippetByOwner {
    id: string;
    title: string;
    description: string;
    lang: string;
    visibility: string;
    tags: string[];
    updatedAt: Date;
    createdAt: Date;
};

export interface SnippetByIdByOwner {
    id: string;
    title: string;
    description?: string;
    lang: string;
    visibility: string;
    snippetContent: {
        code: string,
        documentation: string,
        diagramData: string,
    }
};

export interface EditorSnippetForm {
    title: string;
    description?: string;
    lang: string;
    visibility: string;
    snippetContent: {
        code: string,
        documentation: string,
        diagramData: string,
    }
};

export interface AllSnippets {
    id: string;
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
    ownerName: string;
    ownerAvatar: string;
    ownerUserName: string;
    tags: string[];
};

export interface SnippetCardType {
    id: string;
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
    visibility: string;
    tags: string[];
    onEdit: () => void;
};

export interface SnippetById {
    title: string;
    description: string;
    lang: string;
    ownerInfo: {
        avatar: string;
        fullName: string;
        userName: string;
    },
    snippetContent: {
        code: string;
        documentation: string;
        diagramData: string;
    },
    updatedAt: Date;
};

export interface EditSnippetModal {
    snippet: Omit<SnippetCardType, "onEdit">;
    formRef: React.RefObject<HTMLFormElement | null>;
    onClose: () => void;
}

export type FormSnippet = z.infer<typeof formSnippetSchema>;
export type FormSnippetInput = z.input<typeof formSnippetSchema>;
export type FormSnippetOutput = z.output<typeof formSnippetSchema>;