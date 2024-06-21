import joi from "joi";

export const UserInput = joi.object({
    username: joi
        .string()
        .required(),
    email: joi 
        .string()
        .email(),
    password: joi
        .string()
        .min(6)
        .max(10),
    role: joi
        .string()

})

export default UserInput;