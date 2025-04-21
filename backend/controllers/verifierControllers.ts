import { Request, Response } from "express";
import Loan from "../models/loanModel";

// Approve Loan
export const approveLoan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) {
    res.status(404).json({ error: "Loan not found" });
    return; // Exit early to avoid continuing with the function
  }

  loan.loanStatus = "Approved";
  await loan.save();
  res.status(200).json({ message: "Loan approved" });
};

// Reject Loan
export const rejectLoan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) {
    res.status(404).json({ error: "Loan not found" });
    return; // Exit early to avoid continuing with the function
  }

  loan.loanStatus = "Rejected";
  await loan.save();

  res.status(200).json({ message: "Loan rejected", loan });
};
