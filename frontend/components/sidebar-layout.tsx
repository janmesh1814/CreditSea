import Link from "next/link"
import type { ReactNode } from "react"
import {
  BarChart3,
  Users,
  FileText,
  RefreshCw,
  Settings,
  LogOut,
  Scale,
  Calculator,
  FileBarChart,
  FileCheck,
  KeyRound,
  PiggyBank,
  Building,
  Briefcase,
  Calendar,
  DollarSign,
} from "lucide-react"

interface SidebarLayoutProps {
  children: ReactNode
  role: "admin" | "verifier"
  username: string
}

export default function SidebarLayout({ children, role, username }: SidebarLayoutProps) {
  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-green-900 text-white">
        <div className="p-4 border-b border-green-800">
          <h1 className="text-xl font-bold">CREDIT APP</h1>
        </div>
        <div className="p-4 border-b border-green-800 flex items-center">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-green-900 mr-3">
            <span className="font-bold">{username.charAt(0)}</span>
          </div>
          <span className="text-yellow-400">{username}</span>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link
                href={`/${role}/dashboard`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/borrowers`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <Users className="w-5 h-5 mr-3" />
                Borrowers
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/loans`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <FileText className="w-5 h-5 mr-3" />
                Loans
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/repayments`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <RefreshCw className="w-5 h-5 mr-3" />
                Repayments
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/loan-parameters`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <Scale className="w-5 h-5 mr-3" />
                Loan Parameters
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/accounting`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <Calculator className="w-5 h-5 mr-3" />
                Accounting
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/reports`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <FileBarChart className="w-5 h-5 mr-3" />
                Reports
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/collateral`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <FileCheck className="w-5 h-5 mr-3" />
                Collateral
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/access-configuration`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <KeyRound className="w-5 h-5 mr-3" />
                Access Configuration
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/savings`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <PiggyBank className="w-5 h-5 mr-3" />
                Savings
              </Link>
            </li>
            {role === "admin" && (
              <li>
                <Link
                  href="/admin/other-incomes"
                  className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
                >
                  <Building className="w-5 h-5 mr-3" />
                  Other Incomes
                </Link>
              </li>
            )}
            <li>
              <Link
                href={`/${role}/payroll`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Payroll
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/expenses`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Expenses
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/e-signature`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                E-signature
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/investor-accounts`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <Users className="w-5 h-5 mr-3" />
                Investor Accounts
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/calendar`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Calendar
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/settings`}
                className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center px-4 py-2 text-white hover:bg-green-800 rounded">
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="bg-white shadow-sm border-b">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center">
              <button className="mr-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-2 font-medium">{roleTitle}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
