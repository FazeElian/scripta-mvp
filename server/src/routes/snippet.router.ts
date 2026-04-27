import { Router } from "express";

// Controllers
import { SnippetController } from "../controllers/snippet.controller";
import { ExecutionController } from "../controllers/execution.controller";
import { DiagramController } from "../controllers/diagram.controller";

// Middlewares
import { validateInputErrors } from "../middlewares/validateInputErrors";
import { authenticate } from "../middlewares/user";
import {
    isSnippetOwner,
    validateIfSnippetExits,
    validateSnippetId
} from "../middlewares/snippet";

// Schemas
import { createSnippetSchema } from "../schemas/snippet.schema";

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

router.post("/snippets/execute",
    authenticate,
    ExecutionController.runCode
);

router.post("/snippets/diagram",
    authenticate,
    DiagramController.generate
);

router.get("/snippets",
    authenticate,
    SnippetController.getAllByOwner
);

router.get("/snippets/explore",
    SnippetController.getAll
);

router.get("/snippets/:id",
    SnippetController.getById
);

router.get("/snippets/editor/:id",
    authenticate,
    isSnippetOwner,
    SnippetController.getByIdByOwner
);

router.put("/snippets/editor/:id",
    authenticate,
    isSnippetOwner,
    SnippetController.updateByIdOnEditor
);

router.put("/snippets/:id",
    authenticate,
    isSnippetOwner,
    SnippetController.updateById
);

router.delete("/snippets/:id",
    authenticate,
    isSnippetOwner,
    SnippetController.deleteById
);

export default router;