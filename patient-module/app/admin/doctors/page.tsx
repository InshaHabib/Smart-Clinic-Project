"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Edit, Trash2 } from "lucide-react"
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from "@/lib/admin/services/doctorService"
import type { Doctor, CreateDoctorDto } from "@/lib/admin/services/doctorService"

export default function ManageDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [formData, setFormData] = useState<CreateDoctorDto>({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    experience: "",
    qualification: "",
    consultationFee: 0,
    available: true,
  })

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      setLoading(true)
      const data = await getDoctors()
      setDoctors(data)
    } catch (error) {
      console.error("Error loading doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingDoctor(null)
    setFormData({
      name: "",
      specialty: "",
      email: "",
      phone: "",
      experience: "",
      qualification: "",
      consultationFee: 0,
      available: true,
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      email: doctor.email,
      phone: doctor.phone,
      experience: doctor.experience,
      qualification: doctor.qualification,
      consultationFee: doctor.consultationFee,
      available: doctor.available,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return

    try {
      await deleteDoctor(id)
      await loadDoctors()
    } catch (error) {
      console.error("Error deleting doctor:", error)
      alert("Failed to delete doctor")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingDoctor) {
        await updateDoctor({ id: editingDoctor.id, ...formData })
      } else {
        await createDoctor(formData)
      }
      setIsDialogOpen(false)
      await loadDoctors()
    } catch (error) {
      console.error("Error saving doctor:", error)
      alert("Failed to save doctor")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Doctors</h2>
          <p className="text-muted-foreground">
            Add, edit, or remove doctors from the system
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </DialogTitle>
              <DialogDescription>
                {editingDoctor
                  ? "Update doctor information"
                  : "Enter the details for the new doctor"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultationFee">Consultation Fee</Label>
                <Input
                  id="consultationFee"
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      consultationFee: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDoctor ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctors List</CardTitle>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No doctors found
                    </TableCell>
                  </TableRow>
                ) : (
                  doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">
                        {doctor.name}
                      </TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell>{doctor.phone}</TableCell>
                      <TableCell>{doctor.experience}</TableCell>
                      <TableCell>${doctor.consultationFee}</TableCell>
                      <TableCell>
                        {doctor.available ? (
                          <span className="text-success">Available</span>
                        ) : (
                          <span className="text-muted-foreground">
                            Unavailable
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(doctor)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(doctor.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
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

