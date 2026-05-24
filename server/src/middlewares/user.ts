import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

// Schemas
import { userIdSchema } from '../schemas/user.schema';

// Errors
import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/handleError';

declare global {
    namespace Express {
        interface User extends InstanceType<typeof User> {}
        interface Request {
            user?: User
        }
    }
}

export {};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
        const error = new UnauthorizedError("Not Authorized");
        res.status(401).json({ error: error.message });
        return;
    }

    const [ , token] = bearer.split(" ");
    if(!token) {
        const error = new ConflictError("Token not valid");
        res.status(401).json({ error: error.message });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({ error: "Server configuration error" });
            return;
        }
        const decoded = jwt.verify(token, secret);

        if(typeof decoded === "object" && decoded.id){
            req.user = await User.findByPk(decoded.id, {
                attributes: [
                    "id",
                    "userName",
                    "email",
                    "fullName",
                    "avatar",
                    "bio",
                    "githubUser",
                    "website",
                    "createdAt",
                    "updatedAt"
                ]
            });

            if (!req.user) {
                res.status(401).json({ error: "Not Authorized" });
                return;
            }

            next();
        } else {
            res.status(401).json({ error: "Token not valid" });
        }
    } catch (error) {
        res.status(500).json({ error: "Token not valid" })
    }
}

export const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
    const result = userIdSchema.safeParse(req.params);

    if (!result.success) {
        res.status(400).json({ errors: result.error });
        return;
    }

    next();
}

export const validateIfUserExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id as string)

        if (!user) {
            const error = new NotFoundError("User not found");
            res.status(404).json({ error: error.message });
            return;
        }
        req.user = user;

        next()
    } catch (error) {
        res.status(500).json({ error: "An error has ocurred" })
    }
}