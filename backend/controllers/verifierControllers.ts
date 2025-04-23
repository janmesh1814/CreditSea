import { Request, Response } from "express";
import Loan from "../models/loanModel";

// Approve Loan
export async function approveLoan(req: Request, res: Response) {
  const loan = await Loan.findById(req.params.id);
  if (!loan) {
    res.status(404).json({ error: "Loan not found" });
    return;
  }

  loan.loanStatus = "Approved";
  await loan.save();
  res.status(200).json({ message: "Loan approved" });
}

// Reject Loan
export async function rejectLoan(req: Request, res: Response) {
  const loan = await Loan.findById(req.params.id);
  if (!loan) {
    res.status(404).json({ error: "Loan not found" });
    return;
  }

  loan.loanStatus = "Rejected";
  await loan.save();

  res.status(200).json({ message: "Loan rejected", loan });
}
