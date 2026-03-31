// Models
import Snippet from "../models/Snippet";
import SnippetContent from "../models/SnippetContent";

// DTO'S
import { AllSnippetsResponse, NewSnippetRequest } from "../dtos/snippet.dto";

// Database config
import { db } from "../config/db";

export default class SnippetService {
    async create(data: NewSnippetRequest, userId: string) : Promise<string> {
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
            return `Snippet created: ${data.title}`;
        } catch (error) {
            await transaction.rollback(); // if something fails, all is discarded
            throw new Error("An error has ocurred: Could not create snippet");
        }
    };

    async getAll(userId: string) : Promise<AllSnippetsResponse[]> {
        const snippets = await Snippet.findAll({ 
            where: { userId: userId },
            order: [["createdAt", "DESC"]]
        });

        if(!snippets || snippets.length === 0) return null;

        return snippets.map(snippet => ({
            id: snippet.id,
            title: snippet.title,
            description: snippet.description,
            language: snippet.language,
            visibility: snippet.visibility,
            createdAt: snippet.createdAt,
        }));
    };
};