import {v4 as uuidv4} from "uuid";
import JobListing from "../models/jobModel.js";


// barcha ishlarni olish
const getAllJobListing = async (req,res) => {
    try {
        const jobListings = await JobListing.find();
        res.status(200).json(jobListings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// id buyicha ish topish
const getOneJobListing = async (req,res) => {
    const { id } = req.params;
    
    try {
        const jobListing = await JobListing.findById(id);
        if(!jobListing) {
            return res.status(404).json({ message: "Job listing not found"});
        }
        res.status(200).json(jobListing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// yangi ish urin qushish
const createJobListing = async (req,res) => {
    const {title, description, companyId, location, salaryRange, employmentType, requirements, status, postedBy} = req.body;

    try {
        const newJobListing = new JobListing({
            id: v4(),
            title,
            description,
            companyId,
            location,
            salaryRange,
            employmentType,
            requirements,
            status,
            postedBy,
            createAt: new Date(),
            updatedAt: new Date()
        });
        await newJobListing.save();

        res.status(201).json({ jodId: newJobListing.id, message: "Job listing created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJobListing = async (req,res) => {
    const { id } = req.params;
    const {title, description, companyId, location, salaryRange, employmentType, requirements, status,postedBy} = req.body;

    try {
        const updatedJobListing = await JobListing.findByIdAndUpdate(id, {
            title,
            description,
            companyId,
            location,
            salaryRange,
            employmentType,
            requirements,
            status,
            postedBy,
            updatedAt: new Date()
        }, {
            new: true
        });

        if(!updatedJobListing) {
            return res.status(404).json({message: 'Job listing not found'});
        }
        res.status(200).json({jobId: updatedJobListing.id, message: "Job listing updated"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteJobListing = async (req,res) => {
    const { id } = req.params;

    try {
        const deleteJobListing = await JobListing.findByIdAndDelete(id);
        if(!deleteJobListing){
            return res.status(404).json({ message: "Job listing not found"}); 
        }
        res.status(200).json({message: "Job listing deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export default {getAllJobListing,
                getOneJobListing,
                createJobListing,
                updateJobListing,
                deleteJobListing};
