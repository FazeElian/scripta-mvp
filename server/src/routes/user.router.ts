import { Router } from "express";

// Controller
import UserController from "../controllers/user.controller";

// Schemas
import {
    registerSchema,
    loginSchema
} from "../schemas/user.schema";

// Middlewares
import { validateInputErrors } from "../middlewares/validateInputErrors";
import { authenticate, validateIfUserExists, validateUserId } from "../middlewares/user";

// Router
const router = Router();

// ID Param
router.param("id", validateUserId);
router.param("id", validateIfUserExists);

// Routes
router.post("/users/register",
    validateInputErrors(registerSchema),
    UserController.register
);

router.post("/users/login",
    validateInputErrors(loginSchema),
    UserController.login
);

router.get("/users/profile/:id",
    UserController.getProfile
);

router.get("/users/user/",
    authenticate,
    UserController.getAuthenticatedUser
);

export default router;