import express from "express";
import {
  applyLoan,
  depositLoan,
  getAllLoans,
  getLoanStats,
} from "../controllers/loanControllers";

const router = express.Router();

router.post("/apply", applyLoan);
router.post("/:id/depositLoan", depositLoan);
router.get("/", getAllLoans);
router.get("/stats", getLoanStats);

export default router;
