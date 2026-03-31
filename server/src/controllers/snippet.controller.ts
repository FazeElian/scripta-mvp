import { NextFunction, Request, Response } from "express";

// Service
import SnippetService from "../services/snippet.service";

// Utils
import { handleError } from "../utils/handleError";

// Import service
const snippetService = new SnippetService();

export class SnippetController {
    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id; // from auth
            const result = await snippetService.create(req.body, userId);
            res.status(201).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id; // from auth
            const result = await snippetService.getAll(userId as string);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };
};