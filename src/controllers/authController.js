import User from "../models/userModel.js";
import bcyrpt from "bcrypt";
import {v4 as uuidv4} from "uuid";

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getOneUser = async (req,res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req,res) => {
    const {userData, password} = req.body;
    try {
        const hashPassword = await bcyrpt.hash(password,10);
        const newUser = await User.create({
            userData: userData,
            password: hashPassword,
        })
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateUser = async (req,res) => {
    const { id } = req.params;
    const userData= req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new:true});
        if(!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req,res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Foydalanuvchi uchun ma'lumotni bazadan izlash
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Parolni tekshirish
        const isPasswordValid = await bcyrpt.compare(password, user.password);
        console.log(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Token yaratish (masalan, JWT ishlatish)
        const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

        // 4. Foydalanuvchi to'g'risida ma'lumotni qaytarish
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};