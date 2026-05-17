import { Op } from "sequelize";

// Models
import Collection from "../models/Collection";
import CollectionSnippet from "../models/CollectionSnippet";
import Snippet from "../models/Snippet";
import Tag from "../models/Tag";
import User from "../models/User";

// DTOs
import {
    AllCollectionsResponse,
    CollectionByIdResponse,
    NewCollectionRequest,
    NewCollectionResponse,
    UpdateCollectionRequest,
    AddSnippetToCollectionRequest,
} from "../dtos/collection.dto";

// Database config
import { db } from "../config/db";

export default class CollectionService {
    async create(data: NewCollectionRequest, ownerId: string): Promise<NewCollectionResponse> {
        const collection = await Collection.create({
            ...data,
            ownerId,
        });

        return {
            id: collection.id,
            message: `Collection created: ${data.title}`,
        };
    }

    async getAll(): Promise<AllCollectionsResponse[]> {
        const collections = await Collection.findAll({
            where: { visibility: "public" },
            order: [["createdAt", "DESC"]],
            include: [
                { model: User, as: "owner", attributes: ["fullName", "userName", "avatar"] },
            ],
        });

        if (!collections || collections.length === 0) return [];

        return collections.map(col => ({
            id: col.id,
            title: col.title,
            slug: col.slug,
            description: col.description,
            color: col.color,
            icon: col.icon,
            visibility: col.visibility,
            isOfficial: col.isOfficial,
            ownerName: (col as any).owner?.fullName || "Unknown",
            ownerUserName: (col as any).owner?.userName || "Unknown",
            ownerAvatar: (col as any).owner?.avatar || "Terminal",
        }));
    }

    async getOfficials(): Promise<AllCollectionsResponse[]> {
        const collections = await Collection.findAll({
            where: { isOfficial: true, visibility: "public" },
            order: [["createdAt", "ASC"]],
            include: [
                { model: User, as: "owner", attributes: ["fullName", "userName", "avatar"] },
            ],
        });

        if (!collections || collections.length === 0) return [];

        return collections.map(col => ({
            id: col.id,
            title: col.title,
            slug: col.slug,
            description: col.description,
            color: col.color,
            icon: col.icon,
            visibility: col.visibility,
            isOfficial: col.isOfficial,
            ownerName: (col as any).owner?.fullName || "Unknown",
            ownerUserName: (col as any).owner?.userName || "Unknown",
            ownerAvatar: (col as any).owner?.avatar || "Terminal",
        }));
    }

    async getAllByOwner(ownerId: string): Promise<AllCollectionsResponse[]> {
        const collections = await Collection.findAll({
            where: { ownerId },
            order: [["createdAt", "DESC"]],
        });

        if (!collections || collections.length === 0) return [];

        return collections.map(col => ({
            id: col.id,
            title: col.title,
            slug: col.slug,
            description: col.description,
            color: col.color,
            icon: col.icon,
            visibility: col.visibility,
            isOfficial: col.isOfficial,
        }));
    }

    async getById(collection: Collection): Promise<CollectionByIdResponse> {
        if (collection.visibility === "private") {
            throw new Error("This collection is private and cannot be accessed.");
        }

        // Snippets ordered by orderIndex
        const collectionSnippets = await CollectionSnippet.findAll({
            where: { collectionId: collection.id },
            order: [["orderIndex", "ASC"]],
            include: [
                {
                    model: Snippet,
                    as: "snippet",
                    where: { visibility: "public" },
                    include: [
                        { model: Tag, as: "tags", attributes: ["name"], through: { attributes: [] } },
                        { model: User, as: "user", attributes: ["fullName", "userName", "avatar"] },
                    ],
                },
            ],
        });

        const owner = await User.findByPk(collection.ownerId);

        return {
            id: collection.id,
            title: collection.title,
            slug: collection.slug,
            description: collection.description,
            color: collection.color,
            icon: collection.icon,
            visibility: collection.visibility,
            isOfficial: collection.isOfficial,
            ownerInfo: {
                fullName: owner?.fullName || "Unknown",
                userName: owner?.userName || "Unknown",
                avatar: owner?.avatar || "Terminal",
            },
            snippets: collectionSnippets.map(cs => {
                const s = (cs as any).snippet;
                return {
                    id: s.id,
                    title: s.title,
                    description: s.description,
                    lang: s.lang,
                    orderIndex: cs.orderIndex,
                    ownerName: s.user?.fullName || "Unknown",
                    ownerUserName: s.user?.userName || "Unknown",
                    ownerAvatar: s.user?.avatar || "Terminal",
                    tags: s.tags?.map((t: Tag) => t.name) || [],
                };
            }),
        };
    }

    async updateById(collection: Collection, data: UpdateCollectionRequest): Promise<string> {
        await collection.update({
            title: data.title,
            description: data.description,
            color: data.color,
            icon: data.icon,
            visibility: data.visibility,
        });

        return "Collection updated successfully";
    }

    async addSnippet(collection: Collection, data: AddSnippetToCollectionRequest): Promise<string> {
        const snippet = await Snippet.findByPk(data.snippetId);
        if (!snippet) throw new Error("Snippet not found");

        const existing = await CollectionSnippet.findOne({
            where: { collectionId: collection.id, snippetId: data.snippetId },
        });
        if (existing) throw new Error("Snippet already in this collection");

        // Calculate the next orderIndex if it is not provided
        const lastEntry = await CollectionSnippet.findOne({
            where: { collectionId: collection.id },
            order: [["orderIndex", "DESC"]],
        });

        const orderIndex = data.orderIndex ?? ((lastEntry?.orderIndex ?? -1) + 1);
        await CollectionSnippet.create({
            collectionId: collection.id,
            snippetId: data.snippetId,
            orderIndex,
        });

        return `Snippet added to collection: ${collection.title}`;
    }

    async removeSnippet(collection: Collection, snippetId: string): Promise<string> {
        const entry = await CollectionSnippet.findOne({
            where: { collectionId: collection.id, snippetId },
        });
        if (!entry) throw new Error("Snippet not found in this collection");

        await entry.destroy();
        return `Snippet removed from collection: ${collection.title}`;
    }

    async reorderSnippets(collection: Collection, order: { snippetId: string; orderIndex: number }[]): Promise<string> {
        const transaction = await db.transaction();

        try {
            await Promise.all(
                order.map(({ snippetId, orderIndex }) =>
                    CollectionSnippet.update(
                        { orderIndex },
                        { where: { collectionId: collection.id, snippetId }, transaction }
                    )
                )
            );

            await transaction.commit();
            return "Collection reordered successfully";
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async delete(collection: Collection): Promise<void> {
        await collection.destroy();
    }
}