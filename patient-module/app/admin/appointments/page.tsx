"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, XCircle, Calendar, Clock } from "lucide-react"
import {
  getAppointments,
  approveAppointment,
  rejectAppointment,
} from "@/lib/admin/services/appointmentService"
import type { Appointment } from "@/lib/admin/services/appointmentService"

export default function AppointmentApprovalPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all")

  useEffect(() => {
    loadAppointments()
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredAppointments(appointments)
    } else {
      setFilteredAppointments(
        appointments.filter((app) => app.status === statusFilter)
      )
    }
  }, [statusFilter, appointments])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await getAppointments()
      setAppointments(data)
      setFilteredAppointments(data)
    } catch (error) {
      console.error("Error loading appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    if (!confirm("Are you sure you want to approve this appointment?"))
      return

    try {
      await approveAppointment(id)
      await loadAppointments()
    } catch (error) {
      console.error("Error approving appointment:", error)
      alert("Failed to approve appointment")
    }
  }

  const handleReject = async (id: number) => {
    if (!confirm("Are you sure you want to reject this appointment?")) return

    try {
      await rejectAppointment(id)
      await loadAppointments()
    } catch (error) {
      console.error("Error rejecting appointment:", error)
      alert("Failed to reject appointment")
    }
  }

  const getStatusBadge = (status: Appointment["status"]) => {
    const variants: Record<string, string> = {
      pending: "bg-warning text-warning-foreground",
      approved: "bg-success text-success-foreground",
      rejected: "bg-destructive text-destructive-foreground",
      completed: "bg-secondary text-secondary-foreground",
      cancelled: "bg-muted text-muted-foreground",
    }

    return (
      <Badge className={variants[status] || ""}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Appointment Approval
          </h2>
          <p className="text-muted-foreground">
            Review and manage appointment requests
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={statusFilter}
            onValueChange={(value: typeof statusFilter) =>
              setStatusFilter(value)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.patientName}
                      </TableCell>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {appointment.time}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {appointment.reason}
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        {appointment.status === "pending" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(appointment.id)}
                              className="text-success hover:text-success"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(appointment.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

