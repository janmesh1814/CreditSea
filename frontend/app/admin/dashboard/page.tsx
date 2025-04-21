"use client";

import { useState, useEffect } from "react";
import SidebarLayout from "@/components/sidebar-layout";
import StatCard from "@/components/stat-card";
import LoanTable from "@/components/loan-table";
import {
  Users,
  DollarSign,
  PiggyBank,
  RefreshCw,
  Building,
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

// Stats type definition matching your /loans/stats endpoint
type LoanStats = {
  totalLoans: number;
  totalBorrowers: number;
  cashDisbursed: number;
  cashReceived: number;
  repaidLoans: number;
  savings: number;
  // Added these to match your admin dashboard needs
  activeUsers?: number;
  otherAccounts?: number;
};

export default function AdminDashboard() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<LoanStats | null>(null);

  // Fetch loans from the API
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/loans");
        setLoans(response.data);
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
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <SidebarLayout role="admin" username="John Doe">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* First row of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats ? (
          <>
            <StatCard
              icon={<Users className="h-6 w-6" />}
              value={stats.totalBorrowers.toString()}
              label="ACTIVE USERS"
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

      {/* Second row of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
              icon={<Building className="h-6 w-6" />}
              value={(stats.otherAccounts || 0).toString()} // Fallback to 0 if not available
              label="OTHER ACCOUNTS"
            />
            <StatCard
              icon={<DollarSign className="h-6 w-6" />}
              value={stats.totalLoans.toString()}
              label="LOANS"
            />
          </>
        ) : (
          <div>Loading stats...</div>
        )}
      </div>

      {/* Loan Table */}
      {loading ? (
        <div>Loading loans...</div>
      ) : (
        <LoanTable
          title="Recent Loans"
          loans={loans}
          columns={{
            user: "User details",
            amount: true,
            date: "Date Applied",
            action: "Status",
          }}
        />
      )}
    </SidebarLayout>
  );
}
