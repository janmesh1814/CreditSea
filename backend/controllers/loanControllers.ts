import { Request, Response } from "express";
import Loan from "../models/loanModel";

export async function applyLoan(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      amount,
      tenure,
      employmentStatus,
      loanReason,
      address,
      termsAccepted,
      disclosureAccepted,
    } = req.body;

    const newLoan = await Loan.create({
      name,
      amount,
      tenure,
      employmentStatus,
      loanReason,
      address,
      termsAccepted,
      disclosureAccepted,
    });

    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ error: "Failed to create Loan" });
  }
}

export async function getAllLoans(req: Request, res: Response) {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
}

export async function getLoanStats(req: Request, res: Response) {
  try {
    const [
      totalLoans,
      uniqueBorrowers,
      cashDisbursed,
      cashReceived,
      repaidLoans,
    ] = await Promise.all([
      Loan.countDocuments(),
      Loan.distinct("name").then((names) => names.length),
      Loan.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
      Loan.aggregate([
        { $group: { _id: null, total: { $sum: "$depositAmount" } } },
      ]),
      Loan.countDocuments({ repaymentStatus: "Paid" }),
    ]);

    const stats = {
      totalLoans,
      totalBorrowers: uniqueBorrowers,
      cashDisbursed: cashDisbursed[0]?.total || 0,
      cashReceived: cashReceived[0]?.total || 0,
      repaidLoans,
      savings: (cashReceived[0]?.total || 0) - (cashDisbursed[0]?.total || 0),
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}

export async function depositLoan(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const loan = await Loan.findById(id);

    if (loan) {
      const { depositAmount } = req.body;
      loan.depositAmount += depositAmount;

      if (loan.depositAmount >= loan.amount) {
        loan.repaymentStatus = "Paid";
      } else if (loan.depositAmount > 0) {
        loan.repaymentStatus = "Partially Paid";
      } else {
        loan.repaymentStatus = "Pending";
      }

      await loan.save();
      res.status(200).json({ message: "Deposit successful", loan });
    } else {
      res.status(404).json({ error: "Loan not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to deposit amount" });
  }
}
