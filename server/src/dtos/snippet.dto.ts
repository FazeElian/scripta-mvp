// Request Dto's
export interface NewSnippetRequest {
    title: string;
    description: string;
    language: string;
    visibility: string;
    userId: string;
};

// Response Dto's
export interface AllSnippetsResponse {
    id: string;
    title: string;
    description: string;
    language: string;
    visibility: string;
    createdAt: Date;
};