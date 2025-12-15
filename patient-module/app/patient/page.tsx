import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Clock, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground shadow-xl">
          <div className="absolute inset-0 bg-[url('/abstract-medical-pattern.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tight text-balance mb-2">Welcome Back, Ilham! 👋</h2>
            <p className="text-primary-foreground/90 text-lg">Your health journey continues here</p>
          </div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-primary"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Appointments</CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              3
            </div>
            <p className="text-xs text-muted-foreground mt-1">Next: Tomorrow at 10:00 AM</p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-success"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prescriptions</CardTitle>
            <div className="rounded-full bg-success/10 p-2">
              <FileText className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-success to-success/60 bg-clip-text text-transparent">
              12
            </div>
            <p className="text-xs text-muted-foreground mt-1">2 active medications</p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-warning"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Actions</CardTitle>
            <div className="rounded-full bg-warning/10 p-2 animate-pulse-glow">
              <Clock className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-warning to-warning/60 bg-clip-text text-transparent">
              1
            </div>
            <p className="text-xs text-muted-foreground mt-1">Appointment awaiting approval</p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-info"
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unpaid Invoices</CardTitle>
            <div className="rounded-full bg-info/10 p-2">
              <Receipt className="h-4 w-4 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-info to-info/60 bg-clip-text text-transparent">
              $450
            </div>
            <p className="text-xs text-muted-foreground mt-1">2 invoices pending</p>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-scale-in shadow-lg" style={{ animationDelay: "0.5s" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Recent Appointments</CardTitle>
            <Button asChild variant="outline" size="sm" className="group bg-transparent">
              <Link href="/patient/appointments">
                View All
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                doctor: "Dr. Fatima Hassan",
                specialty: "Cardiologist",
                date: "Dec 20, 2024",
                time: "10:00 AM",
                status: "approved",
              },
              {
                doctor: "Dr. Ahmed Ali",
                specialty: "General Physician",
                date: "Dec 18, 2024",
                time: "2:30 PM",
                status: "completed",
              },
              {
                doctor: "Dr. Aisha Rahman",
                specialty: "Dermatologist",
                date: "Dec 15, 2024",
                time: "11:00 AM",
                status: "completed",
              },
            ].map((appointment, i) => (
              <div
                key={i}
                className="group flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:bg-accent/50 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-lg transition-transform group-hover:scale-110">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.date}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
                <div>
                  <Badge
                    variant={appointment.status === "approved" ? "default" : "secondary"}
                    className={`transition-all ${
                      appointment.status === "approved" ? "bg-success text-success-foreground shadow-md" : ""
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="animate-scale-in shadow-lg" style={{ animationDelay: "0.6s" }}>
        <CardHeader>
          <CardTitle className="text-2xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              asChild
              className="group h-auto flex-col gap-3 py-8 bg-gradient-to-br from-primary to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/patient/book-appointment">
                <div className="rounded-full bg-white/20 p-3 transition-transform group-hover:rotate-12">
                  <Calendar className="h-7 w-7" />
                </div>
                <span className="text-base font-semibold">Book Appointment</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group h-auto flex-col gap-3 py-8 bg-gradient-to-br from-background to-accent shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary"
            >
              <Link href="/patient/prescriptions">
                <div className="rounded-full bg-primary/10 p-3 transition-transform group-hover:rotate-12">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <span className="text-base font-semibold">View Prescriptions</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group h-auto flex-col gap-3 py-8 bg-gradient-to-br from-background to-accent shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary"
            >
              <Link href="/patient/invoices">
                <div className="rounded-full bg-primary/10 p-3 transition-transform group-hover:rotate-12">
                  <Receipt className="h-7 w-7 text-primary" />
                </div>
                <span className="text-base font-semibold">Pay Invoices</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
