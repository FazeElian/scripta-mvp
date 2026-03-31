import { NextFunction, Request, Response } from "express";

// Service
import UserService from "../services/user.service";

// Utils
import { handleError } from "../utils/handleError";

// Import service
const userService = new UserService();

export default class UserController {
    static register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };

    static getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await userService.getProfile(id as string);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
        }
    };
};