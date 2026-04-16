import { Router, Request, Response } from "express";
import passport from "passport";
import { generateOAuthToken } from "../config/passport";
import User from "../models/User";

const router = Router();

// Google
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: `${process.env.VITE_URL}/login`, session: false }),
    (req: Request, res: Response) => {
        const token = generateOAuthToken(req.user as User);
        res.redirect(`${process.env.VITE_URL}/auth/callback?token=${token}`);
    }
);

// GitHub
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: `${process.env.VITE_URL}/login`, session: false }),
    (req: Request, res: Response) => {
        const token = generateOAuthToken(req.user as User);
        res.redirect(`${process.env.VITE_URL}/auth/callback?token=${token}`);
    }
);

export default router;