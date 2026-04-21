// Models
import Snippet from "../models/Snippet";
import SnippetContent from "../models/SnippetContent";
import User from "../models/User";

// DTO'S
import {
    AllSnippetsByOwnerResponse,
    AllSnippetsResponse,
    SnippetByIdByOwnerResponse,
    GetSnippetByIdResponse,
    NewSnippetRequest,
    NewSnippetResponse
} from "../dtos/snippet.dto";

// Database config
import { db } from "../config/db";

export default class SnippetService {
    async create(data: NewSnippetRequest, userId: string) : Promise<NewSnippetResponse> {
        const transaction = await db.transaction(); // initialize transaction

        try {
            const snippet = await Snippet.create({
                ...data,
                userId
            }, { transaction: transaction });

            await SnippetContent.create({
                documentation: "",
                code: "",
                diagramData: "",
                snippetId: snippet.id
            }, { transaction: transaction });

            // Save changes
            await transaction.commit();
            return {
                id: snippet.id,
                message: `Snippet created: ${data.title}`
            };
        } catch (error) {
            console.log(error)
            await transaction.rollback(); // if something fails, all is discarded
            throw new Error("An error has ocurred: Could not create snippet");
        }
    };

    async getAll() : Promise<AllSnippetsResponse[]> {
        const snippets = await Snippet.findAll({ 
            order: [["createdAt", "DESC"]],
            include: [{
                model: User,
                as: 'user',
                attributes: ['fullName', 'userName', 'avatar']
            }],
            where: { visibility: "public" }
        });

        if (!snippets || snippets.length === 0) return [];

        return snippets.map(snippet => ({
            id: snippet.id,
            title: snippet.title,
            description: snippet.description,
            lang: snippet.lang,
            updatedAt: snippet.updatedAt,
            ownerName: (snippet as any).user?.fullName || "Unknown",
            ownerAvatar: (snippet as any).user?.avatar || "Terminal",
            ownerUserName: (snippet as any).user?.userName || "Unknown",
        }));
    };

    async getAllByOwner(userId: string) : Promise<AllSnippetsByOwnerResponse[]> {
        const snippets = await Snippet.findAll({ 
            where: { userId: userId },
            order: [["updatedAt", "DESC"]]
        });

        if(!snippets || snippets.length === 0) return null;

        return snippets.map(snippet => ({
            id: snippet.id,
            title: snippet.title,
            description: snippet.description,
            lang: snippet.lang,
            visibility: snippet.visibility,
            updatedAt: snippet.updatedAt,
        }));
    };

    async getById(snippet: Snippet) : Promise<GetSnippetByIdResponse> {
        // Check is not private
        if (snippet.visibility === "private") throw new Error("This snippet is private and cannot be accessed.");

        // Find content
        const snippetContent = await SnippetContent.findOne({
            where: { snippetId: snippet.id }
        });
        if (!snippetContent) throw new Error("Snippet content not found");

        // Find the owner
        const owner = await User.findByPk(snippet.userId);
        if (!owner) throw new Error("Owner not found");

        // Object to be returned
        return {
            title: snippet.title,
            lang: snippet.lang,
            description: snippet.description,
            ownerInfo: {
                avatar: owner.avatar,
                fullName: owner.fullName
            },
            snippetContent: {
                code: snippetContent.code,
                documentation: snippetContent.documentation,
                diagramData: snippetContent.diagramData,
            }
        };
    };

    async getByIdByOwner(snippet: Snippet) : Promise<SnippetByIdByOwnerResponse> {
        // Find content
        const snippetContent = await SnippetContent.findOne({
            where: { snippetId: snippet.id }
        });

        return {
            title: snippet.title,
            lang: snippet.lang,
            description: snippet.description,
            visibility: snippet.visibility,
            snippetContent: {
                code: snippetContent.code,
                documentation: snippetContent.documentation,
                diagramData: snippetContent.diagramData,
            }
        };
    };

    async updateById(snippet: Snippet, newData: Pick<SnippetByIdByOwnerResponse, "title" | "description" | "lang" | "visibility">) : Promise<any> {
        const transaction = await db.transaction();

        try {
            await snippet.update({
                title: newData.title,
                description: newData.description,
                lang: newData.lang,
                visibility: newData.visibility,
            }, { transaction });

            await transaction.commit();
            return "Snippet updated successfully"
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw error;
        }
    };

    async updateByIdOnEditor(snippet: Snippet, newData: SnippetByIdByOwnerResponse) : Promise<string> {
        const transaction = await db.transaction();

        try {
            await snippet.update({
                title: newData.title,
                description: newData.description,
                lang: newData.lang,
                visibility: newData.visibility,
            }, { transaction: transaction });

            const content = await SnippetContent.findOne({ 
                where: { snippetId: snippet.id },
                transaction: transaction 
            });
            if (!content) throw new Error("Snippet content not found");

            await content.update(newData.snippetContent, { transaction: transaction });
            await transaction.commit();

            // Return udpated data
            // return {
            //     title: snippet.title,
            //     lang: snippet.lang,
            //     description: snippet.description,
            //     visibility: snippet.visibility,
            //     snippetContent: {
            //         code: content.code,
            //         documentation: content.documentation,
            //         diagramData: content.diagramData 
            //     }
            // };

            return "Changes were saved successfully";
        } catch (error) {
            await transaction.rollback(); // if something fails, all is discarded
            console.error(error); 
            throw error;
        }
    }

    async delete(snippet: Snippet) : Promise<void> {
        await snippet.destroy();
    };
};