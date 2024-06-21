import User from "../models/userModel";

const getAll = async() => {
    try {
        const user = await User.find();
        return user;
    } catch (error) {
        console.log(error);
    }
};

const getOne = async(params) => {
    try {
        const user = await User.find({_id:params});
        return user;
    } catch (error) {
        console.log(error);
    }
};

const create = async (data) => {
    const newData = new User(data);
    await newData.save();
    return newData;
};

const update = async (id, data) => {
    const oldData = await User.findById(id);
    if (!oldData) {
        return false;
    }
    oldData.set({
        email: data.email || oldData.email,
        password: data.password || oldData.password,
        description: data.description || oldData.description,
        isActive: data.isActive || oldData.isActive,
    });
    await oldData.save();
    return oldData;
};

const active = async (id) => {
    const oldData = await User.updateOne(
        {_id:id},
        {isActive: true,}
    );
    if(!oldData) return false;
    return oldData;
};

const deleted = async (id) => {
    const delData = await User.findByIdAndDelete(id);
    if(!delData) return false;
    return delData;
};

export default {
    getAll,
    getOne,
    create,
    update,
    deleted,
    active
};
 
