import { Router } from "express";

// Controller
import { CollectionController } from "../controllers/collection.controller";

// Middlewares
import { authenticate } from "../middlewares/user";
import { validateInputErrors } from "../middlewares/validateInputErrors";
import {
    validateCollectionId,
    validateIfCollectionExists,
    isCollectionOwner,
} from "../middlewares/collection";
import {
    createCollectionSchema,
    updateCollectionSchema,
    addSnippetToCollectionSchema,
    reorderSnippetsSchema,
} from "../schemas/collection.schema";

const router = Router();

// CRUD Param
router.param("id", validateCollectionId);
router.param("id", validateIfCollectionExists);

// Public routes
router.get("/collections/official", CollectionController.getOfficials);
router.get("/collections/:id", CollectionController.getById);
router.get("/collections", CollectionController.getAll);

// Private router
router.post("/collections/create",
    authenticate,
    validateInputErrors(createCollectionSchema),
    CollectionController.create
);

router.get("/my-collections",
    authenticate,
    CollectionController.getAllByOwner
);

router.put("/collections/:id",
    authenticate,
    isCollectionOwner,
    validateInputErrors(updateCollectionSchema),
    CollectionController.updateById
);

router.post("/collections/:id/snippets",
    authenticate,
    isCollectionOwner,
    validateInputErrors(addSnippetToCollectionSchema),
    CollectionController.addSnippet
);

router.delete("/collections/:id/snippets/:snippetId",
    authenticate,
    isCollectionOwner,
    CollectionController.removeSnippet
);

router.put("/collections/:id/reorder",
    authenticate,
    isCollectionOwner,
    validateInputErrors(reorderSnippetsSchema),
    CollectionController.reorderSnippets
);

router.delete("/collections/:id",
    authenticate,
    isCollectionOwner,
    CollectionController.deleteById
);

export default router;