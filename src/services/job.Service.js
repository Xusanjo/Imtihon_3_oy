import Job from "../models/jobModel.js";

const getAll=()=>{
    return Job.find();
}

const create = async(job) => {
    const newJob = new Job(job);
    await newJob.save();
    return newJob;
};

const update = async (id, job) => {
    const oldJob = await Job.findById(id);
    if(!oldJob) return false;
    oldJob.set({
        email: job.title || oldJob.title,
        author_id: job.author_id || oldJob.author_id,
        text: job.text || oldJob.text,
        description: job.description || oldJob.description,
        isActive: job.isActive || oldJob.isActive, 
    });
    await oldJob.save();
    return oldJob;
};

const deleted = async (id) => {
    const delJob = await Job.findByIdAndDelete(id);
    if(delJob) return false;
    return delJob;
};

export default {
    getAll,
    create,
    update,
    deleted,
}