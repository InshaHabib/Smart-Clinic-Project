"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Clock, Stethoscope } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const doctors = [
  {
    id: 1,
    name: "Dr. Fatima Hassan",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.9,
    image: "/doctor-1.jpg",
  },
  {
    id: 2,
    name: "Dr. Ahmed Ali",
    specialty: "General Physician",
    experience: "10 years",
    rating: 4.8,
    image: "/doctor-2.jpg",
  },
  {
    id: 3,
    name: "Dr. Aisha Rahman",
    specialty: "Dermatologist",
    experience: "12 years",
    rating: 4.7,
    image: "/doctor-3.jpg",
  },
  {
    id: 4,
    name: "Dr. Omar Khalid",
    specialty: "Orthopedic",
    experience: "18 years",
    rating: 4.9,
    image: "/doctor-4.jpg",
  },
  {
    id: 5,
    name: "Dr. Zainab Khan",
    specialty: "Pediatrician",
    experience: "14 years",
    rating: 4.8,
    image: "/doctor-5.jpg",
  },
  {
    id: 6,
    name: "Dr. Ibrahim Malik",
    specialty: "Neurologist",
    experience: "16 years",
    rating: 4.9,
    image: "/doctor-6.jpg",
  },
]

export default function BookAppointmentPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = specialtyFilter === "all" || doctor.specialty === specialtyFilter
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Book Appointment</h2>
        <p className="text-muted-foreground">Schedule your consultation with our doctors</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Doctors List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Doctors</CardTitle>
              <CardDescription>Select a doctor to book an appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search doctors..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                    <SelectItem value="General Physician">General Physician</SelectItem>
                    <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                    <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                    <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                    <SelectItem value="Neurologist">Neurologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Doctors Grid */}
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer ${
                      selectedDoctor === doctor.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedDoctor(doctor.id)}
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">⭐ {doctor.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Stethoscope className="h-3 w-3" />
                          {doctor.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                {selectedDoctor ? "Fill in the details below" : "Select a doctor first"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="date" type="date" className="pl-9" disabled={!selectedDoctor} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select disabled={!selectedDoctor}>
                    <SelectTrigger id="time" className="pl-9">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Describe your symptoms or reason for consultation..."
                  rows={4}
                  disabled={!selectedDoctor}
                />
              </div>

              <Button className="w-full" disabled={!selectedDoctor}>
                Book Appointment
              </Button>

              <p className="text-xs text-center text-muted-foreground">Appointment requires doctor approval</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
