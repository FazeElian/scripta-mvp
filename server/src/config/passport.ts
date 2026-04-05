import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import jwt from "jsonwebtoken";

// Models
import User from "../models/User";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        if (!email) return done(new Error("No email found in Google profile"));

        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                email,
                fullName: profile.displayName,
                userName: email.split("@")[0],
                password: "oauth",
                avatar: "shell",
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "/auth/github/callback"
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        const email = profile.emails?.[0]?.value ?? `${profile.username}@github.com`;

        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                email,
                fullName: profile.displayName || profile.username,
                userName: profile.username,
                password: "oauth",
                avatar: "shell",
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

export const generateOAuthToken = (user: User): string => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );
};

export default passport;