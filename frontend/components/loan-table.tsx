"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LoanEntry {
  _id: string;
  name: string;
  email: string;
  amount: number;
  createdAt: string;
  loanStatus: "Pending" | "Approved" | "Rejected";
  loanReason: string;
  repaymentStatus: string;
  depositAmount: number;
}

interface LoanTableProps {
  title: string;
  loans: LoanEntry[];
  columns?: {
    user: string;
    amount: boolean;
    date: string;
    action: string;
  };
  onStatusChange: (
    id: string,
    status: "Approved" | "Rejected"
  ) => Promise<void>;
  isVerifier: boolean;
}

export default function LoanTable({
  title,
  loans,
  columns,
  onStatusChange,
  isVerifier,
}: LoanTableProps) {
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">PENDING</Badge>
        );
      case "Approved":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">APPROVED</Badge>
        );
      case "Rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">REJECTED</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            Sort
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b text-xs text-gray-500">
              {columns?.user && <th className="px-4 py-2 text-left">User</th>}
              {columns?.amount && (
                <th className="px-4 py-2 text-left">Amount</th>
              )}
              {columns?.date && <th className="px-4 py-2 text-left">Date</th>}
              {columns?.action && (
                <th className="px-4 py-2 text-left">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="border-b hover:bg-gray-50">
                {columns?.user && (
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium">{loan.name}</div>
                        <div className="text-xs text-gray-500">
                          {loan.email}
                        </div>
                      </div>
                    </div>
                  </td>
                )}
                {columns?.amount && (
                  <td className="px-4 py-3">
                    <div className="font-medium">{loan.amount}</div>
                    <div className="text-xs text-gray-400">NGN</div>
                  </td>
                )}
                {columns?.date && (
                  <td className="px-4 py-3">
                    <div>{formatDate(loan.createdAt)}</div>
                  </td>
                )}
                {columns?.action && (
                  <td className="px-4 py-3">
                    {getStatusBadge(loan.loanStatus)}
                  </td>
                )}
                <td className="px-4 py-3 space-x-2">
                  {isVerifier && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onStatusChange(loan._id, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onStatusChange(loan._id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
