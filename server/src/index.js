import express from "express";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const response = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    return res.status(201).json({ message: "User Created", user: response });
  } catch (error) {
    return res.status("400").json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  return res.status(200).json({ users });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server start on port 3000");
});
