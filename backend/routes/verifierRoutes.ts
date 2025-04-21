import express from "express";
import { approveLoan, rejectLoan } from "../controllers/verifierControllers";

const router = express.Router();

// Middleware should be passed as separate arguments, not inside `.use()` like this:
router.post("/:id/Approved", approveLoan);
router.post("/:id/Rejected", rejectLoan);

export default router;
