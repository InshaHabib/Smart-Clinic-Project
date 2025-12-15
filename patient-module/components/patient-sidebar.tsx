"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Users, FileText, Receipt, LogOut, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "Book Appointment", href: "/patient/book-appointment", icon: Calendar },
  { name: "My Appointments", href: "/patient/appointments", icon: Activity },
  { name: "Doctors", href: "/patient/doctors", icon: Users },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: FileText },
  { name: "Invoices", href: "/patient/invoices", icon: Receipt },
]

export function PatientSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo & Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Activity className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold text-sidebar-foreground">Smart Clinic</span>
          <span className="text-xs text-muted-foreground">Patient Portal</span>
        </div>
      </div>

      {/* Patient Profile */}
      <div className="flex items-center gap-3 p-6">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/patient-consultation.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">IK</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sidebar-foreground">Ilham Khan</span>
          <span className="text-sm text-muted-foreground">Patient ID: #PAT-001</span>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start gap-3", isActive && "bg-primary text-primary-foreground shadow-sm")}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      <Separator className="my-4" />

      {/* Logout */}
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
