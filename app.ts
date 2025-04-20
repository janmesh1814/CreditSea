import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import loanRoutes from "./routes/loanRoutes";
import cors from "cors";
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/loans", loanRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
