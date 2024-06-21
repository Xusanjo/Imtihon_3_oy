import { rejects } from "assert";
import { resolve } from "path";

class CustomError extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

async function createError(message, statusCode) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            try {
                throw new CustomError(message, statusCode);
            } catch (error) {
                reject(error);
            }
        }, 200);
    }); 
}

export default {CustomError, createError};