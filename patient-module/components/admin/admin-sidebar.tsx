"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Package,
  Receipt,
  LogOut,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: UserCheck },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Inventory", href: "/admin/inventory", icon: Package },
  { name: "Billing", href: "/admin/billing", icon: Receipt },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo & Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Activity className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold text-sidebar-foreground">
            Smart Clinic
          </span>
          <span className="text-xs text-muted-foreground">Admin Panel</span>
        </div>
      </div>

      {/* Admin Profile */}
      <div className="flex items-center gap-3 p-6">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            AD
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sidebar-foreground">Admin</span>
          <span className="text-sm text-muted-foreground">Administrator</span>
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
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-primary text-primary-foreground shadow-sm"
                )}
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

