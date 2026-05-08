import { Router } from "express";
import TagController from "../controllers/tag.controller";
import { authenticate } from "../middlewares/user";

const tagRouter = Router();

tagRouter.get("/tags/search",
    authenticate,
    TagController.search
);

export default tagRouter;