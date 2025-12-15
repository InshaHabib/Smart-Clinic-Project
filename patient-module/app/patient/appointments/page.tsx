import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

const appointments = [
  {
    id: 1,
    doctor: "Dr. Fatima Hassan",
    specialty: "Cardiologist",
    date: "2024-12-20",
    time: "10:00 AM",
    location: "Building A, Room 201",
    status: "approved",
    reason: "Regular checkup and blood pressure monitoring",
  },
  {
    id: 2,
    doctor: "Dr. Ahmed Ali",
    specialty: "General Physician",
    date: "2024-12-22",
    time: "2:30 PM",
    location: "Building B, Room 105",
    status: "pending",
    reason: "Flu symptoms and fever",
  },
  {
    id: 3,
    doctor: "Dr. Aisha Rahman",
    specialty: "Dermatologist",
    date: "2024-12-18",
    time: "11:00 AM",
    location: "Building A, Room 305",
    status: "completed",
    reason: "Skin rash consultation",
  },
  {
    id: 4,
    doctor: "Dr. Omar Khalid",
    specialty: "Orthopedic",
    date: "2024-12-15",
    time: "3:00 PM",
    location: "Building C, Room 102",
    status: "completed",
    reason: "Knee pain assessment",
  },
  {
    id: 5,
    doctor: "Dr. Zainab Khan",
    specialty: "Pediatrician",
    date: "2024-12-12",
    time: "11:30 AM",
    location: "Building B, Room 203",
    status: "completed",
    reason: "Child vaccination",
  },
]

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Appointments</h2>
          <p className="text-muted-foreground">View and manage your appointment history</p>
        </div>
        <Button asChild>
          <Link href="/patient/book-appointment">Book New Appointment</Link>
        </Button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          All
        </Button>
        <Button variant="outline" size="sm">
          Pending
        </Button>
        <Button variant="outline" size="sm">
          Approved
        </Button>
        <Button variant="outline" size="sm">
          Completed
        </Button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "approved"
                          ? "default"
                          : appointment.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        appointment.status === "approved"
                          ? "bg-success text-success-foreground"
                          : appointment.status === "pending"
                            ? "bg-warning text-warning-foreground"
                            : ""
                      }
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {appointment.location}
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </p>
                  </div>
                </div>
              </div>

              {appointment.status !== "completed" && (
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
