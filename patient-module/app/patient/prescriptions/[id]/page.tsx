import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Printer, Calendar, User, Stethoscope } from "lucide-react"
import Link from "next/link"

export default function PrescriptionDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/patient/prescriptions">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Prescription Details</h2>
          <p className="text-muted-foreground">Complete prescription information</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Prescription Card */}
          <Card>
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prescription #001</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Issued on December 15, 2024</p>
                </div>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Patient Info */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Patient Information</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">John Doe</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">35 Years</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Doctor Information</h3>
                <div className="flex gap-3">
                  <Stethoscope className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Cardiologist</p>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Diagnosis</h3>
                <p className="rounded-lg bg-muted/50 p-4">Hypertension (High Blood Pressure) - Stage 1</p>
              </div>

              {/* Medications */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Prescribed Medications</h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">Amlodipine</h4>
                          <p className="text-sm text-muted-foreground">5mg Tablet</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dosage:</span>
                          <span className="font-medium">1 tablet daily</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">30 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Instructions:</span>
                          <span className="font-medium">Take with food</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">Metoprolol</h4>
                          <p className="text-sm text-muted-foreground">50mg Tablet</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dosage:</span>
                          <span className="font-medium">1 tablet twice daily</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">30 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Instructions:</span>
                          <span className="font-medium">Morning and evening</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Additional Notes</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Monitor blood pressure daily and maintain a log</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Follow a low-sodium diet</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Follow up appointment in 2 weeks</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Report any dizziness or unusual symptoms immediately</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
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
              <CardTitle>Recommended Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Blood Pressure Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  ECG
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Lipid Profile
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
