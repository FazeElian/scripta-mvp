import { Request, Response, NextFunction } from "express";
import Collection from "../models/Collection";
import { collectionIdSchema } from "../schemas/collection.schema";

declare global {
    namespace Express {
        interface Request {
            collection?: Collection
        }
    }
}

export const validateCollectionId = async (req: Request,res: Response,next: NextFunction, id: string) => {
    const result = collectionIdSchema.safeParse(req.params);

    if (!result.success) {
        res.status(400).json({ errors: result.error });
        return;
    }

    next();
};

export const validateIfCollectionExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const collection = await Collection.findByPk(id as string);

        if (!collection) {
            const error = new Error("Collection not found");
            res.status(404).json({ error: error.message });
            return;
        }

        req.collection = collection;
        next();
    } catch (error) {
        res.status(500).json({ error: "An error has occurred" });
    }
};

export const isCollectionOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.collection) {
            return res.status(500).json({ error: "Collection context missing" });
        }

        if (req.collection.ownerId !== req.user.id) {
            return res.status(403).json({
                error: "You don't have permission to modify this collection",
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};