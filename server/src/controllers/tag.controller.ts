import { Request, Response, NextFunction } from "express";
import TagService from "../services/tag.service";
import { handleError } from "../utils/handleError";

const tagService = new TagService();

export default class TagController {
    static search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { q } = req.query;
            if (!q || typeof q !== "string") return res.json([]);
            const tags = await tagService.search(q);
            res.status(200).json(tags);
        } catch (error) {
            handleError(error, res, next);
        }
    };
}