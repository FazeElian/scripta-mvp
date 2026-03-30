import jwt from "jsonwebtoken";
import User from "../models/User";

export const generateToken = (user: User) => {
    let secret = process.env.JWT_SECRET;
    if (!secret) { secret = "dev"};
        
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.userName,
        },
        secret,
        { expiresIn: "1d" }
    );

    return token;
}