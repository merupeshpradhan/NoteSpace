import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`);
    });
  } catch (error) {
    console.log("Database connection faild!", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
