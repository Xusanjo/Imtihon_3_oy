// model yaratish uchun mongose moduini chaqiramiz(mongose mongodb uchun odm)
import mongoose from "mongoose";

// Ariza schema yozamiz
const application =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pendeng'
    }
});

// arizani mongo db ulaymiz
const Application = mongoose.model("Application", application);

// eksport qilamiz
export default Application;
