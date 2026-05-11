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
            console.log(error)
            handleError(error, res, next);
        }
    };

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await snippetService.getAll();
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getAllByOwner = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id; // from auth
            const result = await snippetService.getAllByOwner(userId as string);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const snippet = await snippetService.getById(req.snippet!);
            res.status(200).json(snippet);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getByIdByOwner = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const snippet = await snippetService.getByIdByOwner(req.snippet!);
            res.status(200).json(snippet);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static updateByIdOnEditor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await snippetService.updateByIdOnEditor(req.snippet!, req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static updateById= async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await snippetService.updateById(req.snippet!, req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await snippetService.delete(req.snippet!);
            res.status(200).json("Snippet deleted successfully");
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { query = "", lang = "All", sort = "Most Recent" } = req.query;
            const tag = (req.query.tag as string) || "";
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = parseInt(req.query.offset as string) || 0;

            const result = await snippetService.search(
                query as string,
                tag,
                lang as string,
                sort as string,
                limit,
                offset
            );
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };
};