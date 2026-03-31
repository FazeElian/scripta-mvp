import { Response, NextFunction } from "express";

export class ConflictError extends Error {
    statusCode = 409;
    constructor(message: string) { super(message); this.name = 'ConflictError'; }
}

export class UnauthorizedError extends Error {
    statusCode = 401;
    constructor(message: string) { super(message); this.name = 'UnauthorizedError'; }
}

export class NotFoundError extends Error {
    statusCode = 404;
    constructor(message: string) { super(message); this.name = 'NotFoundError'; }
}

export const handleError = (error: unknown, res: Response, next: NextFunction): void => {
    if (
        error instanceof ConflictError ||
        error instanceof UnauthorizedError ||
        error instanceof NotFoundError
    ) {
        res.status(error.statusCode).json({ message: error.message });
        return;
    }
    next(error); // Errores inesperados → middleware global de Express
};