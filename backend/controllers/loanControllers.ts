import { Request, Response } from "express";
import Loan from "../models/loanModel";

export const applyLoan = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newLoan = await Loan.create(body);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ error: "Failed to create Loan" });
  }
};

export const getAllLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
};

export const getLoanStats = async (req: Request, res: Response) => {
  try {
    const [
      totalLoans,
      uniqueBorrowers,
      cashDisbursed,
      cashReceived,
      repaidLoans,
    ] = await Promise.all([
      Loan.countDocuments(),
      Loan.distinct("email").then((emails) => emails.length),
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
      savings: cashReceived[0]?.total - cashDisbursed[0]?.total,
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

export const depositLoan = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const loan = await Loan.findById(id);
    if (loan) {
      const depositAmount = req.body.depositAmount;
      loan.depositAmount = (loan.depositAmount || 0) + depositAmount;
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
      console.log("Loan not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to deposit amount" });
  }
};
