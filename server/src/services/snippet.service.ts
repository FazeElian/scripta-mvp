import { Op, QueryTypes } from "sequelize";

// Models
import Snippet from "../models/Snippet";
import SnippetContent from "../models/SnippetContent";
import Tag from "../models/Tag";
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

            // Handle tags
            if (data.tags && data.tags.length > 0) {
                const tagInstances = await Promise.all(
                    data.tags.map(name =>
                        Tag.findOrCreate({ where: { name }, transaction })
                            .then(([tag]) => tag)
                    )
                );
                await (snippet as any).addTags(tagInstances, { transaction });
            }

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
            include: [
                { model: User, as: 'user', attributes: ['fullName', 'userName', 'avatar'] },
                { model: Tag, as: 'tags', attributes: ['name'], through: { attributes: [] } }
            ],
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
            tags: (snippet as any).tags?.map((t: Tag) => t.name) || [],
        }));
    };

    async getAllByOwner(userId: string) : Promise<AllSnippetsByOwnerResponse[]> {
        const snippets = await Snippet.findAll({ 
            where: { userId: userId },
            include: [
                { model: Tag, as: 'tags', attributes: ['name'], through: { attributes: [] } }
            ]
        });

        if(!snippets || snippets.length === 0) return null;

        return snippets.map(snippet => ({
            id: snippet.id,
            title: snippet.title,
            description: snippet.description,
            lang: snippet.lang,
            visibility: snippet.visibility,
            updatedAt: snippet.updatedAt,
            createdAt: snippet.createdAt,
            tags: (snippet as any).tags?.map((t: Tag) => t.name) || [],
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

        // Find tags
        const tags = await (snippet as any).getTags();

        // Object to be returned
        return {
            title: snippet.title,
            lang: snippet.lang,
            description: snippet.description,
            updatedAt: snippet.updatedAt,
            ownerInfo: {
                avatar: owner.avatar,
                fullName: owner.fullName,
                userName: owner.userName
            },
            snippetContent: {
                code: snippetContent.code,
                documentation: snippetContent.documentation,
                diagramData: snippetContent.diagramData,
            },
            tags: tags.map((t: Tag) => t.name),
        };
    };

    async getByIdByOwner(snippet: Snippet) : Promise<SnippetByIdByOwnerResponse> {
        // Find content
        const snippetContent = await SnippetContent.findOne({
            where: { snippetId: snippet.id }
        });

        // Find tags
        const tags = await (snippet as any).getTags();

        return {
            title: snippet.title,
            lang: snippet.lang,
            description: snippet.description,
            visibility: snippet.visibility,
            snippetContent: {
                code: snippetContent.code,
                documentation: snippetContent.documentation,
                diagramData: snippetContent.diagramData,
            },
            tags: tags.map((t: Tag) => t.name),
        };
    };

    async updateById(snippet: Snippet, newData: Pick<SnippetByIdByOwnerResponse, "title" | "description" | "lang" | "visibility" | "tags">) : Promise<any> {
        const transaction = await db.transaction();

        try {
            await snippet.update({
                title: newData.title,
                description: newData.description,
                lang: newData.lang,
                visibility: newData.visibility,
            }, { transaction });

            // Update tags if provided
            if (newData.tags !== undefined) {
                const tagInstances = await Promise.all(
                    newData.tags.map(name =>
                        Tag.findOrCreate({ where: { name }, transaction })
                            .then(([tag]) => tag)
                    )
                );
                await (snippet as any).setTags(tagInstances, { transaction });
            }

            await transaction.commit();
            return "Snippet updated successfully";
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

            // Update tags if provided
            if (newData.tags !== undefined) {
                const tagInstances = await Promise.all(
                    newData.tags.map(name =>
                        Tag.findOrCreate({ where: { name }, transaction })
                            .then(([tag]) => tag)
                    )
                );
                await (snippet as any).setTags(tagInstances, { transaction });
            }

            // Save changes
            await transaction.commit();
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

    async search(query: string, tag: string, lang: string, sortRecency: string, limit: number, offset: number) {
        const where: any = { visibility: "public" };

        if (lang && lang !== "All") where.lang = lang;

        if (query) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${query}%` } },
                { description: { [Op.iLike]: `%${query}%` } },
            ];
        }

        let order: any[] = [["createdAt", "DESC"]];
        if (sortRecency === "Least Recent") order = [["createdAt", "ASC"]];
        if (sortRecency === "Last Modified") order = [["updatedAt", "DESC"]];

        // Fix: un solo tag, JOIN simple sin generación dinámica
        if (tag) {
            const snippetIdsWithTag = await db.query(`
                SELECT s.id FROM snippets s
                JOIN snippet_tags st ON s.id = st."snippetId"
                JOIN tags t ON st."tagId" = t.id AND t.name ILIKE :tag
                WHERE s.visibility = 'public'
            `, {
                replacements: { tag: `%${tag}%` },
                type: QueryTypes.SELECT
            }) as { id: string }[];

            if (snippetIdsWithTag.length === 0) return { total: 0, snippets: [] };

            where.id = { [Op.in]: snippetIdsWithTag.map(r => r.id) };
        }

        const { count, rows } = await Snippet.findAndCountAll({
            where,
            order,
            limit,
            offset,
            include: [
                { model: User, as: "user", attributes: ["fullName", "userName", "avatar"] },
                { model: Tag, as: "tags", attributes: ["name"], through: { attributes: [] }, required: false },
            ],
            distinct: true,
        });

        return {
            total: count,
            snippets: rows.map(snippet => ({
                id: snippet.id,
                title: snippet.title,
                description: snippet.description,
                lang: snippet.lang,
                updatedAt: snippet.updatedAt,
                ownerName: (snippet as any).user?.fullName || "Unknown",
                ownerAvatar: (snippet as any).user?.avatar || "Terminal",
                ownerUserName: (snippet as any).user?.userName || "Unknown",
                tags: (snippet as any).tags?.map((t: Tag) => t.name) || [],
            })),
        };
    }
};