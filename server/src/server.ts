import express from 'express'
import colors from "colors";
import morgan from 'morgan'
import cors from "cors";

// CORS Config
import { CORSConfig } from './config/cors';

// Database config
import { db } from "./config/db";

// Routes
import userRouter from "./routes/user.router";
import snippetRouter from "./routes/snippet.router";

async function connectDB () {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue.bold("Connected to the database sucessfully"));
    } catch (error) {
        console.log(colors.red.bold(`Error while connecting to the database: ${error}`));
    }
}
connectDB();

const app = express()

app.use(cors(CORSConfig))
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use("/api/v1",
    userRouter,
    snippetRouter
);

export default app