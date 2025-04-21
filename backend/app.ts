import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db";
import loanRoutes from "./routes/loanRoutes";
import cors from "cors";
const PORT = process.env.PORT || 5000;

dotenv.config();
connectMongoDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/loans", loanRoutes);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
