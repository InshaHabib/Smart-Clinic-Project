"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
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
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"
import { getInvoice, downloadInvoice } from "@/lib/admin/services/billingService"
import type { Invoice } from "@/lib/admin/services/billingService"

export default function InvoiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInvoice()
  }, [id])

  const loadInvoice = async () => {
    try {
      setLoading(true)
      const data = await getInvoice(id)
      setInvoice(data)
    } catch (error) {
      console.error("Error loading invoice:", error)
      alert("Failed to load invoice")
      router.push("/admin/billing")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      // TODO: Implement PDF download
      // const blob = await downloadInvoice(id)
      // const url = window.URL.createObjectURL(blob)
      // const a = document.createElement("a")
      // a.href = url
      // a.download = `invoice-${id}.pdf`
      // document.body.appendChild(a)
      // a.click()
      // window.URL.revokeObjectURL(url)
      // document.body.removeChild(a)

      alert("Download functionality will be implemented with PDF generation")
    } catch (error) {
      console.error("Error downloading invoice:", error)
      alert("Failed to download invoice")
    }
  }

  const handlePrint = () => {
    // TODO: Implement print functionality
    window.print()
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8 text-muted-foreground">
          Loading...
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8 text-muted-foreground">
          Invoice not found
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/billing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Invoice {invoice.id}
            </h2>
            <p className="text-muted-foreground">Invoice details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice Information</CardTitle>
            {getStatusBadge(invoice.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Patient Information</h3>
              <p className="text-sm text-muted-foreground">
                {invoice.patientName}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Doctor Information</h3>
              <p className="text-sm text-muted-foreground">
                {invoice.doctorName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Invoice Date</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(invoice.date).toLocaleDateString()}
              </p>
            </div>
            {invoice.dueDate && (
              <div>
                <h3 className="font-semibold mb-2">Due Date</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-4">Line Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      ${item.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              {invoice.tax && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax:</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
              )}
              {invoice.discount && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount:</span>
                  <span>-${invoice.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {invoice.paymentMethod && (
            <div>
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <p className="text-sm text-muted-foreground">
                {invoice.paymentMethod}
              </p>
            </div>
          )}

          {invoice.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground">{invoice.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

