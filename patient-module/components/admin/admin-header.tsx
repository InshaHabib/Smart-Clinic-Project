"use client"

import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-lg px-6 shadow-sm animate-slide-in">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-primary/10 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground animate-fade-in">
            Manage your clinic
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-primary/10 transition-all hover:scale-110"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive animate-pulse" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/50 transition-all"
            >
              <Avatar className="transition-transform hover:scale-110">
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 animate-scale-in">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-destructive/10 text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

