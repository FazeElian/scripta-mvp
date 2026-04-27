import { Request, Response, NextFunction } from "express";
import DiagramService from "../services/diagram.service";
import { handleError } from "../utils/handleError";

const diagramService = new DiagramService();

export class DiagramController {
    static generate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code, lang } = req.body;
            if (!code || !lang) {
                res.status(400).json({ error: "code and lang are required" });
                return;
            }
            const diagram = await diagramService.generateDiagram(code, lang);
            res.status(200).json({ diagram });
        } catch (error) {
            handleError(error, res, next);
        }
    };
}