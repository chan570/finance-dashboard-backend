import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import recordRouter from "./routes/recordRoutes.js";
import summaryRouter from "./routes/summaryRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Finance Dashboard Backend API is running");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/records", recordRouter);
app.use("/api/summary", summaryRouter);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});