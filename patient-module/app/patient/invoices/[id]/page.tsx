import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Printer, CreditCard } from "lucide-react"
import Link from "next/link"

export default function InvoiceDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/patient/invoices">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoice Details</h2>
          <p className="text-muted-foreground">Complete invoice information</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Card */}
          <Card>
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice INV-001</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Issued on December 15, 2024</p>
                </div>
                <Badge className="bg-warning text-warning-foreground">Unpaid</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Patient Info */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Bill To</h3>
                <div className="space-y-2">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">123 Main Street</p>
                  <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                  <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                </div>
              </div>

              {/* Clinic Info */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">From</h3>
                <div className="space-y-2">
                  <p className="font-medium">Smart Clinic</p>
                  <p className="text-sm text-muted-foreground">456 Healthcare Ave</p>
                  <p className="text-sm text-muted-foreground">New York, NY 10002</p>
                  <p className="text-sm text-muted-foreground">contact@smartclinic.com</p>
                </div>
              </div>

              {/* Services */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Services Rendered</h3>
                <div className="rounded-lg border">
                  <div className="border-b bg-muted/30 px-4 py-3">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium">
                      <div className="col-span-2">Description</div>
                      <div className="text-right">Quantity</div>
                      <div className="text-right">Amount</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    <div className="px-4 py-3">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="col-span-2">
                          <p className="font-medium">Consultation with Dr. Sarah Johnson</p>
                          <p className="text-muted-foreground text-xs">Cardiologist consultation</p>
                        </div>
                        <div className="text-right">1</div>
                        <div className="text-right font-medium">$100</div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="col-span-2">
                          <p className="font-medium">ECG Test</p>
                          <p className="text-muted-foreground text-xs">Electrocardiogram</p>
                        </div>
                        <div className="text-right">1</div>
                        <div className="text-right font-medium">$80</div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="col-span-2">
                          <p className="font-medium">Blood Pressure Check</p>
                          <p className="text-muted-foreground text-xs">Routine monitoring</p>
                        </div>
                        <div className="text-right">1</div>
                        <div className="text-right font-medium">$20</div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="col-span-2">
                          <p className="font-medium">Lab Processing Fee</p>
                        </div>
                        <div className="text-right">1</div>
                        <div className="text-right font-medium">$50</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t pt-6">
                <div className="space-y-2 max-w-sm ml-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">$250.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (0%)</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold">$250.00</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Payment Information</h3>
                <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-medium">Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">December 30, 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-warning/10 p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Amount Due</p>
                <p className="text-3xl font-bold">$250.00</p>
              </div>
              <Button className="w-full" size="lg">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Have questions about this invoice?</p>
              <Button variant="outline" className="w-full bg-transparent" size="sm">
                Contact Billing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
