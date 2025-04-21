"use client";

import type React from "react";

import { useState } from "react";
import UserHeader from "@/components/user-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ApplyLoan() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    tenure: "",
    employmentStatus: "",
    loanReason: "",
    address: "",
    termsAccepted: false,
    disclosureAccepted: false,
  });
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data on Submit: ", formData); // Add this line to debug form data

    if (!formData.termsAccepted || !formData.disclosureAccepted) {
      alert("Please accept the terms and disclosures.");
      return;
    }

    if (
      !formData.name ||
      !formData.amount ||
      !formData.tenure ||
      !formData.loanReason ||
      !formData.address
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    setLoading(true);

    // Remove termsAccepted and disclosureAccepted before sending the data
    const { termsAccepted, disclosureAccepted, ...loanData } = formData;

    try {
      const response = await fetch("http://localhost:5000/loans/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loanData), // Send only the loan data
      });

      const data = await response.json();

      if (response.ok) {
        alert("Loan application submitted successfully!");
        setFormData({
          name: "",
          amount: "",
          tenure: "",
          employmentStatus: "",
          loanReason: "",
          address: "",
          termsAccepted: false,
          disclosureAccepted: false,
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting loan application:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <UserHeader />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="bg-green-800 p-4 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-green-800 font-medium">DEFICIT</div>
              <div className="text-4xl font-bold text-green-800">0.0</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold uppercase">Apply for a Loan</h1>
            <div className="mt-2 text-gray-400">...</div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <Label htmlFor="name">
                Full name as it appears on bank account
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Full name as it appears on bank account"
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="amount">How much do you need?</Label>
              <Input
                id="amount"
                name="amount"
                placeholder="How much do you need?"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tenure">Loan tenure (in months)</Label>
              <Input
                id="tenure"
                name="tenure"
                placeholder="Loan tenure (in months)"
                value={formData.tenure}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="employmentStatus">Employment status</Label>
              <Input
                id="employmentStatus"
                name="employmentStatus"
                placeholder="Employment status"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <div className="text-center text-gray-400 my-2">...</div>
            </div>

            <div>
              <Label htmlFor="loanReason">Reason for loan</Label>
              <Textarea
                id="loanReason"
                name="loanReason"
                placeholder="Reason for loan"
                value={formData.loanReason}
                onChange={handleChange}
                className="mt-1 h-32"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Employment address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Employment address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "termsAccepted",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      I have read the important information and accept that by
                      completing this application I will be bound by the terms
                    </Label>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="disclosureAccepted"
                      checked={formData.disclosureAccepted}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "disclosureAccepted",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="disclosureAccepted" className="text-sm">
                      Any personal and credit information obtained may be
                      disclosed from time to time to other lenders, credit
                      bureaus or other credit reporting agencies.
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <Button
                type="submit"
                className="bg-green-800 hover:bg-green-900 text-white px-8"
                disabled={loading} // Disable submit button during loading
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
