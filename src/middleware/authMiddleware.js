import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({error: 'Auth token is not supplied'});
    };
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token'});
    }
};

export default authenticateUser;