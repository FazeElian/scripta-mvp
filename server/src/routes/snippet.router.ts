import { Router } from "express";

// Controller
import { SnippetController } from "../controllers/snippet.controller";

// Middlewares
import { validateInputErrors } from "../middlewares/validateInputErrors";
import { authenticate } from "../middlewares/user";

// Schemas
import { createSnippetSchema } from "../schemas/snippet.schema";

// Router
const router = Router();

// Routes
router.post("/snippets/create",
    authenticate,
    validateInputErrors(createSnippetSchema),
    SnippetController.create
);

router.get("/snippets",
    authenticate,
    SnippetController.getAll
);

export default router;