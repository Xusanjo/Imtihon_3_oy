import { Router } from "express";
import controller from '../controllers/authController.js';
import  authenticateUser  from "../middleware/authMiddleware.js";
import chechPermission from "../middleware/permissionMiddleware.js";

const router = Router();

router.post('/register', controller.createUser);

router.post('/login', controller.loginUser);
router.get('/', controller.getAllUsers);

router.get('/profile', authenticateUser, (req,res) => {
    res.json({message: 'You accessed a protected route!', user: req.user});
});

export default router;

