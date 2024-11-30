// srcs/utils/jwt.utils.js
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const extractTokenFromHeader = (req) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Authorization header missing or invalid");
    }
    return authHeader.split(" ")[1];
};

const generateTokens = (userId, socialId, email) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is missing');
    }
    return {
        accessToken: jwt.sign({ id: userId, social_id: socialId, email: email }, JWT_SECRET, { expiresIn: "1h" }),
    };
};


export { extractTokenFromHeader, generateTokens };