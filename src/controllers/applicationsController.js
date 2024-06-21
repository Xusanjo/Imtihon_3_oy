import Application from "../models/applicationModel.js";
import applicationService from "../services/application.Service.js";
const getAllApplication = async (req,res) => {
    try {
        const applications = await applicationService.getAll();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getOneApplication = async (req,res) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if(!application){
            return res.status(404).json({message: 'Application not found'});
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createApplication = async(req,res) => {
    try {
        const {resumeUrl, coverLetter, status} = req.body;

        const newApllication = new Application({
            resumeUrl,
            coverLetter,
            status,
            createdAt: new Data(),
            updatedAt: new Data()
        });

        const savedApplication = await newApllication.save();

        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateApplication = async (req,res) => {
    const { id } = req.params;
    const {resumeUrl, coverLetter, status}= req.body;

    try {
        const updatedApplication = await Application.findByIdAndUpdate(id, {
            resumeUrl,
            coverLetter,
            status,
            updatedAt: new Data()
        }, {
            new: true
        });
        if(!updatedApplication){
            return res.status(404).json({ message: 'Application not found'});
        }
        res.status(200).json({applicationId: updateApplication.id, message: "Application updated"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteApplication = async (req,res) => {
    const { id } = req.params;

    try {
        const deletedApplication = await Application.findByIdAndDelete(id);
        if(!deletedApplication){
            return res.status(404).json({message: "Application not found"});
        }

        res.status(200).json({message: "Application deleted"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export default { getAllApplication,
                getOneApplication,
                createApplication,
                updateApplication,
                deleteApplication
}