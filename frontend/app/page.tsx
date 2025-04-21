import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8">CREDIT APP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        <Link
          href="/user/dashboard"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-700"
        >
          <h2 className="text-xl font-semibold text-green-800">User Dashboard</h2>
          <p className="text-gray-600 mt-2">Access your loans, apply for new loans, and manage your account</p>
        </Link>

        <Link
          href="/admin/dashboard"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-700"
        >
          <h2 className="text-xl font-semibold text-green-800">Admin Dashboard</h2>
          <p className="text-gray-600 mt-2">Manage users, review loans, and access system statistics</p>
        </Link>

        <Link
          href="/verifier/dashboard"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-700"
        >
          <h2 className="text-xl font-semibold text-green-800">Verifier Dashboard</h2>
          <p className="text-gray-600 mt-2">Verify loan applications and review borrower information</p>
        </Link>

        <Link
          href="/user/apply"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-700"
        >
          <h2 className="text-xl font-semibold text-green-800">Apply for Loan</h2>
          <p className="text-gray-600 mt-2">Submit a new loan application</p>
        </Link>
      </div>
    </div>
  )
}
