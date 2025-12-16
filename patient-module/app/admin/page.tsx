"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Stethoscope, Calendar } from "lucide-react"
import { getDoctors } from "@/lib/admin/services/doctorService"
import { getPatients } from "@/lib/admin/services/patientService"
import { getAppointments } from "@/lib/admin/services/appointmentService"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    todayAppointments: 0,
  })

  // TODO: Replace with actual API calls using useFetch or direct service calls
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Load data from services
        const [doctors, patients, appointments] = await Promise.all([
          getDoctors(),
          getPatients(),
          getAppointments(),
        ])

        // Filter today's appointments
        const today = new Date().toISOString().split("T")[0]
        const todayApps = appointments.filter((app) => app.date === today)

        setStats({
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          todayAppointments: todayApps.length,
        })
      } catch (error) {
        console.error("Error loading dashboard stats:", error)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground shadow-xl">
          <div className="absolute inset-0 bg-[url('/abstract-medical-pattern.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tight text-balance mb-2">
              Admin Dashboard
            </h2>
            <p className="text-primary-foreground/90 text-lg">
              Overview of your clinic operations
            </p>
          </div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-primary"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {stats.totalPatients}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered patients
            </p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-success"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Doctors
            </CardTitle>
            <div className="rounded-full bg-success/10 p-2">
              <Stethoscope className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-success to-success/60 bg-clip-text text-transparent">
              {stats.totalDoctors}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active doctors
            </p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-warning"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today&apos;s Appointments
            </CardTitle>
            <div className="rounded-full bg-warning/10 p-2">
              <Calendar className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-warning to-warning/60 bg-clip-text text-transparent">
              {stats.todayAppointments}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Scheduled for today
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

