import { Router } from "express";

// Controller
import UserController from "../controllers/user.controller";

// Schemas
import {
    registerSchema,
    loginSchema
} from "../schemas/user.schema";

// Middleware
import { validateInputErrors } from "../middlewares/validateInputErrors";

// Router
const router = Router();

// Routes
router.post("/users/register",
    validateInputErrors(registerSchema),
    UserController.register
);

router.post("/users/login",
    validateInputErrors(loginSchema),
    UserController.login
);

export default router;