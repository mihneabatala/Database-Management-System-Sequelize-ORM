import express from "express";
import dotenv from "dotenv";
import subscriberRouter from "./routes/subscriber-routes.js";
import newspaperRouter  from "./routes/newspaper-routes.js";
import subscriptionRouter from "./routes/subscription-routes.js";
import homepageRouter from "./routes/homepage-routes.js"
import { errorHandler } from "./helpers/errorHandler.js";
import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/subscriber',subscriberRouter);
app.use('/newspaper',newspaperRouter);
app.use('/subscription',subscriptionRouter);
app.use('/homepage',homepageRouter);

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port " + process.env.PORT);  
})  