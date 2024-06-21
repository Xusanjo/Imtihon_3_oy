import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "../config/jwt.js";

const User = db('users');

async function signUp(email, username, password, role, firstName, lastName) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.insert({
            email,
            username,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            status: 'active',
            createAt: new Date(),
            updatedAt: new Date()
        }).returning('*');

        const userId = newUser[0].id;

        const accessToken = jwt.generateAccessToken(userId, role);
        const refreshToken = jwt.generateRefreshToken(userId);

        return { accessToken, refreshToken, userId };
    } catch (error) {
        throw new Error(`Error signing up ${error.message}`);
    }
};

//  foydalanuvchi tiziga kirganini tekshirish
async function signIn( email, password ) {
    try {
        // email orqali qidirish
        const user = await User.where({ email }).first();

        if(!user){
            throw new Error('User not found');
        };

        // parolni solishtiramiz
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            throw new Error('Incorrect password');
        };

        //  fodalanucvchi ruyxatdan utgan
        const userId = user.id;
        const role = user.role; 

        // jwt access token va refresh token yaratish
        const accessToken = jwt.generateAccessToken(userId, role);
        const refreshToken = jwt.generateRefreshToken(userId);

        return {accessToken,refreshToken,userId};
    } catch (error) {
        throw new Error(`Error signing in: ${ error.message}`);
    }
};

// jwt token yangilash

async function refreshToken(refreshToken) {
    try {
        const  decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const userId = decoded.userId;

        const accessToken = jwt.generateAccessToken(userId);
        const newRefreshToken = jwt.generateRefreshToken(userId);

        return { accessToken, refreshToken: newRefreshToken};
    } catch (error) {
        throw new Error(`Error refreshing token: ${error.message}`);
    }
};

export default {signIn, signUp, refreshToken};