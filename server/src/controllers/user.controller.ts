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

    static getAuthenticatedUser = async (req: Request, res: Response) => {
        res.json(req.user);
    };

    static updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.updateProfile(req.user!, req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(error, res, next);
            console.log(error)
        }
    };

    static deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userService.deleteAccount(req.user!);
            res.status(200).json("Account deleted successfully");
        } catch (error) {
            handleError(error, res, next);
        }
    };
};