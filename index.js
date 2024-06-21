import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobsRoutes.js";
import companyRoutes from "./src/routes/companiesRoutes.js";
import applicationRoutes from "./src/routes/applications.Routes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import logger from "./src/config/logger.js";
import dotenv from "dotenv";
import {connect} from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

// loger middleware
app.use((req,res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

// Api endpoints; 
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/companies', companyRoutes);
app.use('/applications', applicationRoutes);
app.use('/review', reviewRoutes);

// default error handler
app.use((err, req, res, next) =>{
    logger.error(`${err.status || 500} - ${err.message} - ${ req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500).json({error: err.message});
});

const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const start = async() => {
    await connect(DB_URL).then(()=>console.log('MongODB connect'))
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
start();