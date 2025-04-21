"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import components to disable SSR
const UserHeader = dynamic(() => import("@/components/user-header"), {
  ssr: false,
});
const LoanTable = dynamic(() => import("@/components/loan-table"), {
  ssr: false,
});

interface LoanEntry {
  _id: string;
  name: string;
  email: string;
  amount: number;
  tenure: number;
  employmentStatus: string;
  loanReason: string;
  loanStatus: "Pending" | "Approved" | "Rejected";
  address: string;
  createdAt: string;
  depositAmount: number;
  repaymentStatus: "Pending" | "Partially Paid" | "Paid";
  termsAccepted: boolean;
  disclosureAccepted: boolean;
}

export default function UserDashboard() {
  const router = useRouter();
  const [loans, setLoans] = useState<LoanEntry[]>([]); // Correctly typed `loans`
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state

  const isVerifier = false; // Set this based on the user role (can be retrieved from user context or props)

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("http://localhost:5000/loans"); // Fetch loan data from backend API
        if (response.ok) {
          const data = await response.json();
          setLoans(data); // Set loans data in state
        } else {
          console.error("Failed to fetch loans");
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchLoans(); // Call the fetch function when component mounts
  }, []); // Empty dependency array ensures the fetch only runs once

  const handleGetLoanClick = () => {
    router.push("/user/apply"); // Navigate to loan application page when button is clicked
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
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
          <Button
            onClick={handleGetLoanClick}
            className="bg-blue-400 hover:bg-gray-500"
          >
            Get A Loan
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100 py-6 rounded-md"
          >
            Borrow Cash
          </Button>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 py-6 rounded-md"
          >
            Transact
          </Button>
          <Button
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100 py-6 rounded-md"
          >
            Deposit Cash
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for loans"
            className="pl-10 py-6"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <LoanTable
            title="Applied Loans"
            loans={filteredLoans}
            columns={{
              user: "Loan Officer",
              amount: true,
              date: "Date Applied",
              action: "Status",
            }}
            onStatusChange={
              isVerifier
                ? async (id: string, status: "Approved" | "Rejected") => {
                    // Implement the logic for status change if required by the verifier
                  }
                : async () => {}
            } // No-op function for non-verifiers
            isVerifier={isVerifier} // Pass the isVerifier flag here
          />
        )}
      </div>
    </div>
  );
}
