// Request Dto's
export interface NewSnippetRequest {
    title: string;
    description: string;
    lang: string;
    visibility: string;
    userId: string;
};

// Response Dto's
export interface AllSnippetsResponse {
    id: string;
    title: string;
    description: string;
    lang: string;
    visibility: string;
    updatedAt: Date;
};

export interface PublicSnippet {
    id: string;
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
};

export interface GetSnippetByIdResponse {
    title: string;
    description: string;
    lang: string;
    ownerInfo: {
        avatar: string;
        fullName: string;
    },
    snippetContent: {
        code: string;
        documentation: string;
        diagramData: string;
    }
};

export interface SnippetByIdByOwnerResponse {
    title: string;
    description: string;
    lang: string;
    visibility: string;
    snippetContent: {
        code: string;
        documentation: string;
        diagramData: string;
    }
};