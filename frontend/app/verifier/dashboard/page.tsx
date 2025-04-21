"use client";

import { useState, useEffect } from "react";
import SidebarLayout from "@/components/sidebar-layout";
import StatCard from "@/components/stat-card";
import LoanTable from "@/components/loan-table";
import {
  DollarSign,
  Users,
  PiggyBank,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import axios from "axios";

// Loan type definition
type Loan = {
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
};

// Stats type definition
type LoanStats = {
  totalLoans: number;
  totalBorrowers: number;
  cashDisbursed: number;
  cashReceived: number;
  repaidLoans: number;
  savings: number;
};

export default function VerifierDashboard() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>(loans);
  const [stats, setStats] = useState<LoanStats | null>(null);

  // Assuming the user role is hardcoded or fetched dynamically
  const isVerifier = true; // Set this dynamically based on user role

  // Fetch loans from the API
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/loans");
        setLoans(response.data);
        setFilteredLoans(response.data); // Initially, all loans are displayed
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Fetch stats from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/loans/stats");
        setStats(response.data); // Set the stats data
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Update loan status handler
  const handleStatusChange = async (
    id: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      const endpoint = `http://localhost:5000/verifier/${id}/${status.toLowerCase()}`;
      await axios.post(endpoint);
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === id ? { ...loan, loanStatus: status } : loan
        )
      );
      setFilteredLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === id ? { ...loan, loanStatus: status } : loan
        )
      );
    } catch (error) {
      console.error(`Error updating loan status to ${status}:`, error);
    }
  };

  // Ensure onStatusChange always returns a Promise
  const handleStatusChangeWrapper = (
    id: string,
    status: "Approved" | "Rejected"
  ): Promise<void> => {
    if (isVerifier) {
      return handleStatusChange(id, status);
    }
    return Promise.resolve(); // Return a resolved promise for non-verifiers
  };

  return (
    <SidebarLayout role="verifier" username="John Okoh">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="mx-2">{">"}</span>
        <h2 className="text-2xl font-bold text-green-800">Loans</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats ? (
          <>
            <StatCard
              icon={<DollarSign className="h-6 w-6" />}
              value={stats.totalLoans.toString()}
              label="LOANS"
            />
            <StatCard
              icon={<Users className="h-6 w-6" />}
              value={stats.totalBorrowers.toString()}
              label="BORROWERS"
            />
            <StatCard
              icon={<DollarSign className="h-6 w-6" />}
              value={stats.cashDisbursed.toString()}
              label="CASH DISBURSED"
            />
          </>
        ) : (
          <div>Loading stats...</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats ? (
          <>
            <StatCard
              icon={<PiggyBank className="h-6 w-6" />}
              value={stats.savings.toString()}
              label="SAVINGS"
            />
            <StatCard
              icon={<RefreshCw className="h-6 w-6" />}
              value={stats.repaidLoans.toString()}
              label="REPAID LOANS"
            />
            <StatCard
              icon={<BarChart3 className="h-6 w-6" />}
              value={stats.cashReceived.toString()}
              label="CASH RECEIVED"
            />
          </>
        ) : (
          <div>Loading stats...</div>
        )}
      </div>

      {/* Loan Table */}
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
          onStatusChange={handleStatusChangeWrapper} // Use the wrapper function
          isVerifier={isVerifier} // Pass the isVerifier flag here
        />
      )}
    </SidebarLayout>
  );
}
