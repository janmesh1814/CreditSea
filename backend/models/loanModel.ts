import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
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
  termsAccepted: { type: Boolean, default: false },
  disclosureAccepted: { type: Boolean, default: false },
});

export default mongoose.model("Loan", loanSchema);
