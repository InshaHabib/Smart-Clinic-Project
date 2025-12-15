import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Download, Eye } from "lucide-react"
import Link from "next/link"

const prescriptions = [
  {
    id: 1,
    doctor: "Dr. Fatima Hassan",
    date: "2024-12-15",
    diagnosis: "Hypertension",
    medicines: ["Amlodipine 5mg", "Metoprolol 50mg"],
    status: "active",
  },
  {
    id: 2,
    doctor: "Dr. Ahmed Ali",
    date: "2024-12-10",
    diagnosis: "Seasonal Flu",
    medicines: ["Paracetamol 500mg", "Amoxicillin 250mg"],
    status: "completed",
  },
  {
    id: 3,
    doctor: "Dr. Aisha Rahman",
    date: "2024-11-28",
    diagnosis: "Skin Allergy",
    medicines: ["Cetirizine 10mg", "Hydrocortisone Cream"],
    status: "completed",
  },
  {
    id: 4,
    doctor: "Dr. Ibrahim Malik",
    date: "2024-11-20",
    diagnosis: "Migraine",
    medicines: ["Sumatriptan 50mg", "Ibuprofen 400mg"],
    status: "completed",
  },
]

export default function PrescriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Prescriptions</h2>
        <p className="text-muted-foreground">View your medical prescriptions and download them</p>
      </div>

      {/* Active Medications */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Active Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {prescriptions
              .filter((p) => p.status === "active")
              .map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between rounded-lg bg-background p-3">
                  <div>
                    <p className="font-medium">{prescription.medicines.join(", ")}</p>
                    <p className="text-sm text-muted-foreground">Prescribed by {prescription.doctor}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/patient/prescriptions/${prescription.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* All Prescriptions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Prescriptions</h3>
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Prescription #{prescription.id}</h3>
                      <p className="text-sm text-muted-foreground">{prescription.doctor}</p>
                    </div>
                    <Badge
                      variant={prescription.status === "active" ? "default" : "outline"}
                      className={prescription.status === "active" ? "bg-success text-success-foreground" : ""}
                    >
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(prescription.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Diagnosis:</span> {prescription.diagnosis}
                    </p>
                    <div>
                      <p className="text-sm font-medium mb-1">Medicines:</p>
                      <ul className="text-sm space-y-1">
                        {prescription.medicines.map((medicine, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {medicine}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="default" size="sm" asChild>
                  <Link href={`/patient/prescriptions/${prescription.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
