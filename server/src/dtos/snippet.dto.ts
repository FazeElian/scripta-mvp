// Request Dto's
export interface NewSnippetRequest {
    title: string;
    description: string;
    lang: string;
    visibility: string;
    userId: string;
};

// Response Dto's
export interface AllSnippetsByOwnerResponse {
    id: string;
    title: string;
    description: string;
    lang: string;
    visibility: string;
    updatedAt: Date;
};

export interface NewSnippetResponse {
    id: string;
    message: string;
};

export interface AllSnippetsResponse {
    id: string;
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
    ownerName: string;
    ownerAvatar: string;
    ownerUserName: string;
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
        userName: string;
    },
    snippetContent: {
        code: string;
        documentation: string;
        diagramData: string;
    },
    updatedAt: Date;
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