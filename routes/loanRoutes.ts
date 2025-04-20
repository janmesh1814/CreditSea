import express from "express";
import {
  applyLoan,
  getAllLoans,
  getLoanStats,
} from "../controllers/loanControllers";

const router = express.Router();

router.post("/apply", applyLoan);
router.get("/", getAllLoans);
router.get("/stats", getLoanStats);

export default router;
