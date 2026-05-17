import { NextFunction, Request, Response } from "express";

// Service
import CollectionService from "../services/collection.service";

// Utils
import { handleError } from "../utils/handleError";

const collectionService = new CollectionService();

export class CollectionController {

    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ownerId = req.user.id;
            const result = await collectionService.create(req.body, ownerId);
            res.status(201).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await collectionService.getAll();
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getOfficials = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await collectionService.getOfficials();
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getAllByOwner = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ownerId = req.user.id;
            const result = await collectionService.getAllByOwner(ownerId);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await collectionService.getById(req.collection!);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static updateById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await collectionService.updateById(req.collection!, req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static addSnippet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await collectionService.addSnippet(req.collection!, req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static removeSnippet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { snippetId } = req.params;
            const result = await collectionService.removeSnippet(req.collection!, snippetId as string);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static reorderSnippets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await collectionService.reorderSnippets(req.collection!, req.body.order);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await collectionService.delete(req.collection!);
            res.status(200).json("Collection deleted successfully");
        } catch (error) {
            handleError(error, res, next);
        }
    };
}