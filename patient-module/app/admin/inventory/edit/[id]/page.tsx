"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  getMedicine,
  updateMedicine,
} from "@/lib/admin/services/inventoryService"
import type { UpdateMedicineDto } from "@/lib/admin/services/inventoryService"

export default function EditMedicinePage() {
  const params = useParams()
  const router = useRouter()
  const id = parseInt(params.id as string)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [formData, setFormData] = useState<UpdateMedicineDto>({
    id,
    name: "",
    description: "",
    stock: 0,
    price: 0,
    category: "",
    expiryDate: "",
    supplier: "",
    lowStockThreshold: 50,
  })

  useEffect(() => {
    loadMedicine()
  }, [id])

  const loadMedicine = async () => {
    try {
      setLoadingData(true)
      const medicine = await getMedicine(id)
      setFormData({
        id: medicine.id,
        name: medicine.name,
        description: medicine.description,
        stock: medicine.stock,
        price: medicine.price,
        category: medicine.category,
        expiryDate: medicine.expiryDate,
        supplier: medicine.supplier || "",
        lowStockThreshold: medicine.lowStockThreshold || 50,
      })
    } catch (error) {
      console.error("Error loading medicine:", error)
      alert("Failed to load medicine")
      router.push("/admin/inventory")
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateMedicine(formData)
      router.push("/admin/inventory")
    } catch (error) {
      console.error("Error updating medicine:", error)
      alert("Failed to update medicine")
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8 text-muted-foreground">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/inventory">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Medicine</h2>
          <p className="text-muted-foreground">
            Update medicine information
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medicine Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="e.g., Paracetamol 500mg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                placeholder="Medicine description and usage"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                    <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                    <SelectItem value="Vitamins">Vitamins</SelectItem>
                    <SelectItem value="Cardiac">Cardiac</SelectItem>
                    <SelectItem value="Diabetes">Diabetes</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) =>
                    setFormData({ ...formData, supplier: e.target.value })
                  }
                  placeholder="Supplier name"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  min="0"
                  value={formData.lowStockThreshold}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lowStockThreshold: parseInt(e.target.value) || 50,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                asChild
                disabled={loading}
              >
                <Link href="/admin/inventory">Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Medicine"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

