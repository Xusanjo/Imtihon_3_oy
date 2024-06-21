import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employees: {
        type: Number,
        required: true
    }
});

const Company = mongoose.model('Company', companySchema);

export default Company;