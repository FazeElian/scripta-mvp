import { Router } from "express";

// Controller
import { SnippetController } from "../controllers/snippet.controller";

// Middlewares
import { validateInputErrors } from "../middlewares/validateInputErrors";
import { authenticate} from "../middlewares/user";

// Schemas
import { createSnippetSchema } from "../schemas/snippet.schema";
import { validateIfSnippetExits, validateSnippetId } from "../middlewares/snippet";

// Router
const router = Router();

// CRUD Param
router.param("id", validateSnippetId);
router.param("id", validateIfSnippetExits);

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

router.get("/snippets/:id",
    SnippetController.getById
);

export default router;