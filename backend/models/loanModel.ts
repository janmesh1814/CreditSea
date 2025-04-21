import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  loanReason: { type: String, required: true },
  loanStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  depositAmount: { type: Number, default: 0 },
  repaymentStatus: {
    type: String,
    enum: ["Pending", "Partially Paid", "Paid"],
    default: "Pending",
  },
});

export default mongoose.model("Loan", loanSchema);
