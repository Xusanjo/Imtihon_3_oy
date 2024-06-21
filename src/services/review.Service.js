import review from "../models/reviewModel.js";

const getAll=()=>{
    return review.find();
}

const create = async(id, revew) => {
    const newReview = new revew(revew);
    await newReview.save();
    return newReview;
};

const update = async(id, revew) => {
    const oldReview = await review.findById(id);
    if(!oldReview) return false;
    oldReview.set({
        email: revew.title || oldReview.title,
        author_id: revew.author_id || oldReview.author_id,
        text: revew.text || oldReview.text,
        description: revew.description || oldReview.description,
        isActive: revew.isActive || oldReview.isActive,
    });
    await oldReview.save();
    return oldReview;
};

const deleted = async(id) => {
    const delRevew = await review.findByIdAndDelete(id);
    if(!delRevew) return false;
    return delRevew;
};

export default {
    getAll,
    create, 
    update,
    deleted
};