import Review from "../models/reviewModel.js";

const getAllReview = async (req,res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneReview = async (req,res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if(!review) {
            return res.status(404).json({message: 'Review not found'});
        }
        res.status(200).json({message: review});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createReview = async (req,res) => {
    const { companyId, rating, comment } = req.body;
    try {
        const newReview = new Review({
            companyId,
            rating,
            comment
        });
        await newReview.save();
        res.status(201).json({ reviewId: newReview._id, message: 'Review created'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateReview = async (req,res) => {
    const { id } = req.params;
    const { rating, comment, status} = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(id, {rating, comment, status},
            { new: true });
            if(!updatedReview){
                return res.status(404).json({message: 'Review not found'});
            }
            res.json({reviewId: updatedReview._id, message: 'Review updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteReview = async (req,res) => {
    const { id } = req.params;
    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if(!deletedReview) {
            return res.status(404).json({message: 'Review not found'});
        }
        res.json({message: "Review deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export default {
    getAllReview,
    getOneReview,
    createReview,
    updateReview,
    deleteReview
}
