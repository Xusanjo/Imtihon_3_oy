import application from "../models/applicationModel.js";

const getALL=()=>{
    return application.find();
};

const create = async (data) => {
    const newData = new application(data);
    await newData.save();
    return newData;
};

const update = async (id,data) => {
    const oldData = await application.findById(id);
    if(!oldData) return false;
    oldData.set({
        email: data.title || oldData.title,
        author_id: data.author_id || oldData.author_id,
        text: data.text || oldData.text,
        description: data.description || oldData.description,
        isActive: data.isActive || oldData.isActive,
    });
    await oldData.save();
    return oldData;
};

const deleted = async(id) => {
    const delData = await application.findByIdAndDelete(id);
    if(delData) return false;
    return delData;
};

export default {getALL,
    create,
    update,
    deleted}






// import db from '../config/db.js';

// const Application = db('applications');

// async function getApplicatinId(applicationId){
//     try {
//         const application = (await Application.where({ id: applicationId})).first();
//         if(application){
//             throw new Error('Application not found');
//         }
//         return application;
//     } catch (error) {
//         throw new Error(`Error getting application: ${error.message}`);
//     }
// };

// export default getApplicatinId;