import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET, JWT_EXPIRATION_TIME, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME} = process.env;

function generateAccessToken( userId, role) {
    return jwt.sign({ userId, role}, JWT_SECRET, {expiresIn: JWT_EXPIRATION_TIME});
}

function generateRefreshToken(userId){
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_TIME});
}

export default {generateAccessToken,
                generateRefreshToken};