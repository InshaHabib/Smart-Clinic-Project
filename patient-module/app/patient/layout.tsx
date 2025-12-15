import type React from "react"
import { PatientSidebar } from "@/components/patient/patient-sidebar"
import { PatientHeader } from "@/components/patient/patient-header"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <PatientSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PatientHeader />
        <main className="flex-1 overflow-y-auto bg-background p-6">{children}</main>
      </div>
    </div>
  )
}
