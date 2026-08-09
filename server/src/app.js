import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// import rutes
import userRoutes from "./routes/user.route.js";
import notesRoutes from "./routes/notes.route.js";

// Use routes with correct leading slashes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/note", notesRoutes);

export { app };
