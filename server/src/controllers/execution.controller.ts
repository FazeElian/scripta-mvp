import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import ExecutionService from "../services/execution.service";

const ExecutionSchema = z.object({
    language: z.enum(["javascript", "typescript", "python", "cpp", "java"]),
    code:     z.string().min(1).max(50000),
    stdin:    z.string().max(10000).optional(),
});

// Import service
const executionService = new ExecutionService();

export class ExecutionController {
    static runCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = ExecutionSchema.safeParse(req.body);
            if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
            }
            const result = await executionService.executeCode(parsed.data);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}