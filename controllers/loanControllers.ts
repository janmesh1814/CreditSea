import { Request, Response } from "express";
import Loan from "../models/loanModel";

export const applyLoan = async (req: Request, res: Response) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: "Failed to apply for loan" });
  }
};

export const getAllLoans = async (_req: Request, res: Response) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
};

export const getLoanStats = async (_req: Request, res: Response) => {
  try {
    const total = await Loan.countDocuments();
    const approved = await Loan.countDocuments({ status: "Approved" });
    const rejected = await Loan.countDocuments({ status: "Rejected" });
    const pending = await Loan.countDocuments({ status: "Pending" });

    res.status(200).json({ total, approved, rejected, pending });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
