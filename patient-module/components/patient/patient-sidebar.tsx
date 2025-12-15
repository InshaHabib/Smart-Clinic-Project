"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, FileText, Receipt, User, LogOut, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/patient", icon: LayoutDashboard },
  { name: "Book Appointment", href: "/patient/book-appointment", icon: Calendar },
  { name: "My Appointments", href: "/patient/appointments", icon: Stethoscope },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: FileText },
  { name: "Invoices", href: "/patient/invoices", icon: Receipt },
  { name: "Profile", href: "/patient/profile", icon: User },
]

export function PatientSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gradient-to-b from-card to-card/50 backdrop-blur-sm shadow-xl animate-slide-in">
      <div className="flex h-16 items-center border-b px-6 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
            <Stethoscope className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Smart Clinic
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 animate-fade-in relative overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-md",
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isActive && <div className="absolute inset-0 bg-white/20 shimmer" />}
              <item.icon
                className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "drop-shadow-md")}
              />
              <span className="relative z-10">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4 bg-gradient-to-t from-primary/5 to-transparent">
        <Button
          variant="outline"
          className="group w-full justify-start gap-3 bg-transparent hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all duration-300 hover:scale-105"
          size="sm"
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )
}
