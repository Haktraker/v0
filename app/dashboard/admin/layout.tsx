import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - HakTrak",
  description: "Manage and review security data",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
    </div>
  )
} 