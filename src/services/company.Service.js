import company from "../models/companyModel.js";

const getAll=()=>{
    return company.find();
};

const create = async (compani) => {
    const newCompany = new company(compani);
    await newCompany.save();
    return newCompany;
};

const update = async(id,compani) => {
    const oldCompani = await company.findById(id);
    if(!oldCompani) return false;
    oldCompani.set({
        email: compani.title || oldCompani.title,
        author_id: compani.author_id || oldCompani.author_id,
        text: compani.text || oldCompani.text,
        description: compani.description || oldCompani.description,
        isActive: compani.isActive || oldCompani.isActive,
    });
    await oldCompani.save();
    return oldCompani;
};

const deleted = async(id) => {
    const delCompani = await company.findByIdAndDelete(id);
    if(delCompani) return false;
    return delCompani;
};

export default {
    getAll,
    create,
    update,
    deleted
}
