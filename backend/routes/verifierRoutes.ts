import express from "express";
import { approveLoan, rejectLoan } from "../controllers/verifierControllers";

const router = express.Router();

router.post("/:id/Approved", approveLoan);
router.post("/:id/Rejected", rejectLoan);

export default router;
