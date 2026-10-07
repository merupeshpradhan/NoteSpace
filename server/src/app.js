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
import otpRoute from "./routes/otp.route.js";
import userRoutes from "./routes/user.route.js";
import notesRoutes from "./routes/notes.route.js";
import aiRouter from "./routes/ai.routes.js";

// Use routes with correct leading slashes
app.use("/api/v1/otp", otpRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/note", notesRoutes);
app.use("/api/v1/ai", aiRouter);

export { app };
