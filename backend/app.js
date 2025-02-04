import express from "express";
import cookieParser from "cookie-parser";
import user from "./routes/userRoutes.js";
import errorMiddleware from "./middleware/error.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", user);
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true // Replace with your frontend's URL
  })); 

app.use(errorMiddleware);

export default app;