import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Receipt, Calendar, Download, Eye, CreditCard } from "lucide-react"
import Link from "next/link"

const invoices = [
  {
    id: "INV-001",
    date: "2024-12-15",
    doctor: "Dr. Fatima Hassan",
    services: ["Consultation", "ECG Test", "Blood Pressure Check"],
    amount: 250,
    status: "unpaid",
  },
  {
    id: "INV-002",
    date: "2024-12-10",
    doctor: "Dr. Ahmed Ali",
    services: ["Consultation", "Lab Tests"],
    amount: 200,
    status: "unpaid",
  },
  {
    id: "INV-003",
    date: "2024-11-28",
    doctor: "Dr. Aisha Rahman",
    services: ["Consultation", "Skin Biopsy"],
    amount: 350,
    status: "paid",
  },
  {
    id: "INV-004",
    date: "2024-11-15",
    doctor: "Dr. Omar Khalid",
    services: ["Consultation", "X-Ray"],
    amount: 180,
    status: "paid",
  },
]

export default function InvoicesPage() {
  const unpaidTotal = invoices.filter((inv) => inv.status === "unpaid").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Invoices</h2>
        <p className="text-muted-foreground">View and manage your medical invoices</p>
      </div>

      {/* Unpaid Summary */}
      {unpaidTotal > 0 && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-warning" />
              Unpaid Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">${unpaidTotal}</p>
                <p className="text-sm text-muted-foreground">
                  {invoices.filter((inv) => inv.status === "unpaid").length} pending invoices
                </p>
              </div>
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          All
        </Button>
        <Button variant="outline" size="sm">
          Unpaid
        </Button>
        <Button variant="outline" size="sm">
          Paid
        </Button>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Invoice {invoice.id}</h3>
                      <p className="text-sm text-muted-foreground">{invoice.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${invoice.amount}</p>
                      <Badge
                        variant={invoice.status === "paid" ? "outline" : "default"}
                        className={
                          invoice.status === "unpaid"
                            ? "bg-warning text-warning-foreground"
                            : "bg-success text-success-foreground"
                        }
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(invoice.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium mb-2">Services:</p>
                    <ul className="space-y-1">
                      {invoice.services.map((service, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="default" size="sm" asChild>
                  <Link href={`/patient/invoices/${invoice.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                {invoice.status === "unpaid" && (
                  <Button size="sm" className="ml-auto">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
