import type { ReactNode } from "react"

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  iconBgColor?: string
}

export default function StatCard({ icon, value, label, iconBgColor = "bg-green-800" }: StatCardProps) {
  return (
    <div className="flex bg-white rounded-md overflow-hidden shadow-sm">
      <div className={`${iconBgColor} p-4 flex items-center justify-center`}>
        <div className="text-white">{icon}</div>
      </div>
      <div className="p-4 flex-1">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      </div>
    </div>
  )
}
