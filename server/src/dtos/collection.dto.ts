export interface NewCollectionRequest {
    title: string;
    description?: string;
    color?: string;
    icon?: string;
    visibility?: "public" | "private";
}

export interface NewCollectionResponse {
    id: string;
    message: string;
}

export interface AllCollectionsResponse {
    id: string;
    title: string;
    slug: string | null;
    description: string | null;
    color: string;
    icon: string;
    visibility: string;
    isOfficial: boolean;
    ownerName?: string;
    ownerUserName?: string;
    ownerAvatar?: string;
}

export interface CollectionByIdResponse {
    id: string;
    title: string;
    slug: string | null;
    description: string | null;
    color: string;
    icon: string;
    visibility: string;
    isOfficial: boolean;
    ownerInfo: {
        fullName: string;
        userName: string;
        avatar: string;
    };
    snippets: {
        id: string;
        title: string;
        description: string;
        lang: string;
        orderIndex: number;
        ownerName: string;
        ownerUserName: string;
        ownerAvatar: string;
        tags: string[];
    }[];
}

export interface UpdateCollectionRequest {
    title?: string;
    description?: string;
    color?: string;
    icon?: string;
    visibility?: "public" | "private";
}

export interface AddSnippetToCollectionRequest {
    snippetId: string;
    orderIndex?: number;
}