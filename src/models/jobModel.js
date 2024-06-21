import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        requied: true
    },
    description: {
        type: String,
        requied: true
    },
    salary: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        requied: true
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;