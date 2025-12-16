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
import { Eye, Calendar } from "lucide-react"
import Link from "next/link"
import { getInvoices } from "@/lib/admin/services/billingService"
import type { Invoice } from "@/lib/admin/services/billingService"

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<
    "all" | "paid" | "unpaid" | "partial"
  >("all")

  useEffect(() => {
    loadInvoices()
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredInvoices(invoices)
    } else {
      setFilteredInvoices(
        invoices.filter((inv) => inv.status === statusFilter)
      )
    }
  }, [statusFilter, invoices])

  const loadInvoices = async () => {
    try {
      setLoading(true)
      const data = await getInvoices()
      setInvoices(data)
      setFilteredInvoices(data)
    } catch (error) {
      console.error("Error loading invoices:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: Invoice["status"]) => {
    const variants: Record<string, string> = {
      paid: "bg-success text-success-foreground",
      unpaid: "bg-warning text-warning-foreground",
      partial: "bg-info text-info-foreground",
      cancelled: "bg-destructive text-destructive-foreground",
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
          <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">
            View and manage invoices
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
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices List</CardTitle>
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
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.patientName}</TableCell>
                      <TableCell>{invoice.doctorName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(invoice.date).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${invoice.total.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/billing/${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
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

