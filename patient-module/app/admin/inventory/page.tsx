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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import {
  getMedicines,
  deleteMedicine,
  getLowStockItems,
} from "@/lib/admin/services/inventoryService"
import type { Medicine } from "@/lib/admin/services/inventoryService"

export default function InventoryPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)
  const [lowStockItems, setLowStockItems] = useState<Medicine[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [medicineToDelete, setMedicineToDelete] = useState<number | null>(
    null
  )

  useEffect(() => {
    loadMedicines()
  }, [])

  const loadMedicines = async () => {
    try {
      setLoading(true)
      const data = await getMedicines()
      setMedicines(data)
      const lowStock = await getLowStockItems()
      setLowStockItems(lowStock)
    } catch (error) {
      console.error("Error loading medicines:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return

    try {
      await deleteMedicine(id)
      await loadMedicines()
    } catch (error) {
      console.error("Error deleting medicine:", error)
      alert("Failed to delete medicine")
    }
  }

  const isLowStock = (medicine: Medicine) => {
    const threshold = medicine.lowStockThreshold || 50
    return medicine.stock <= threshold
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            Manage medicines and track stock levels
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/inventory/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </Link>
        </Button>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {lowStockItems.length} medicine(s) are running low on stock
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Medicines List</CardTitle>
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
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No medicines found
                    </TableCell>
                  </TableRow>
                ) : (
                  medicines.map((medicine) => {
                    const lowStock = isLowStock(medicine)
                    return (
                      <TableRow
                        key={medicine.id}
                        className={
                          lowStock
                            ? "bg-warning/5 border-l-4 border-l-warning"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {medicine.name}
                            {lowStock && (
                              <Badge
                                variant="outline"
                                className="bg-warning text-warning-foreground border-warning"
                              >
                                Low Stock
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {medicine.description}
                          </p>
                        </TableCell>
                        <TableCell>{medicine.category}</TableCell>
                        <TableCell>
                          <span
                            className={
                              lowStock ? "font-semibold text-warning" : ""
                            }
                          >
                            {medicine.stock}
                          </span>
                        </TableCell>
                        <TableCell>${medicine.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {new Date(medicine.expiryDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{medicine.supplier || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link href={`/admin/inventory/edit/${medicine.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(medicine.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

