import Company from "../models/companyModel.js";

const getAllCompanies = async (req,res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneCompany = async (req,res) => {
    const { id } = req.params;

    try {
        const company = await Company.findById(id);
        if( !company ){
            return res.status(404).json({message: 'Company not found'});
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCompany = async (req,res) => {
    try {
        const {name, description, website, location, industry, size} = req.body;
        const newCompany = new Company({
            name,
            description,
            website,
            location,
            industry,
            size,
            createdAt: new Data(),
            updatedAt: new Data()
        });
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateCompany = async (req,res) => {
    const { id } = req.params;
    const { name, description, website, location, industry, size} = req.body;

    try {
        const updatedCompany = await Company.findByIdAndUpdate(id, {
            name,
            description,
            website,
            location,
            industry,
            size,
            updatedAt: new Data()
        },{
            new: true
        });

        if(!updatedCompany){
            return res.status(404).json({message: "Company not found"});
        }
        res.status(200).json({companyId: updateCompany.id, message: 'Company updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteCompany = async (req,res) => {
    const { id } = req.params;
    try {
        const deletedCompany = await Company.findByIdAndDelete(id);
        if(!deletedCompany){
            return res.status(404).json({message: 'Company not found'});
        }
        res.status(200).json({message: "Company deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllCompanies,
                getOneCompany,
                createCompany,
                updateCompany,
                deleteCompany
            };