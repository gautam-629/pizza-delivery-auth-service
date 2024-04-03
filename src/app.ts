import "reflect-metadata"
import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import authRouter from './routes/auth'
const app = express();



//build in middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route level middleware
app.use('/auth',authRouter)

app.use(globalErrorHandler);

export default app;
