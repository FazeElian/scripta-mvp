import { Request, Response, NextFunction } from 'express';

// Model
import Snippet from '../models/Snippet';

// Schemas
import { snippetIdSchema } from '../schemas/snippet.schema';

declare global {
    namespace Express {
        interface Request {
            snippet?: Snippet
        }
    }
}
export const validateSnippetId = async (req: Request, res: Response, next: NextFunction) => {
    const result = snippetIdSchema.safeParse(req.params);

    if (!result.success) {
        res.status(400).json({ errors: result.error });
        return;
    }

    next();
}

export const validateIfSnippetExits = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const snippet = await Snippet.findByPk(id as string)

        if (!snippet) {
            const error = new Error("Snippet not found");
            res.status(404).json({ error: error.message });
            return;
        }
        req.snippet = snippet;

        next()
    } catch (error) {
        res.status(500).json({ error: "An error has ocurred" })
    }
}

export const isSnippetOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.snippet) {
            return res.status(500).json({ error: "Snippet context missing" });
        }

        if (req.snippet.userId !== req.user.id) {
            return res.status(403).json({ 
                error: "You don't have permission to modify this snippet" 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};