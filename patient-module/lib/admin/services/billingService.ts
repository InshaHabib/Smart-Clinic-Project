/**
 * Billing Service
 * Handles all API calls related to billing and invoices
 */

export interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Invoice {
  id: string
  patientId: number
  patientName: string
  doctorId: number
  doctorName: string
  date: string
  items: InvoiceItem[]
  subtotal: number
  tax?: number
  discount?: number
  total: number
  status: "paid" | "unpaid" | "partial" | "cancelled"
  dueDate?: string
  paymentMethod?: string
  notes?: string
}

export interface InvoiceFilters {
  status?: Invoice["status"]
  patientId?: number
  dateFrom?: string
  dateTo?: string
}

const API_BASE_URL = "/api/admin/billing"

/**
 * Get all invoices with optional filters
 * TODO: Replace with actual API endpoint
 */
export async function getInvoices(filters?: InvoiceFilters): Promise<Invoice[]> {
  try {
    // const queryParams = new URLSearchParams()
    // if (filters?.status) queryParams.append("status", filters.status)
    // if (filters?.patientId) queryParams.append("patientId", filters.patientId.toString())
    // if (filters?.dateFrom) queryParams.append("dateFrom", filters.dateFrom)
    // if (filters?.dateTo) queryParams.append("dateTo", filters.dateTo)
    // const url = `${API_BASE_URL}?${queryParams.toString()}`
    // const response = await fetch(url)
    // if (!response.ok) throw new Error("Failed to fetch invoices")
    // return await response.json()

    // Placeholder data
    return [
      {
        id: "INV-001",
        patientId: 1,
        patientName: "Ilham Khan",
        doctorId: 1,
        doctorName: "Dr. Fatima Hassan",
        date: "2024-12-15",
        items: [
          {
            id: 1,
            description: "Consultation",
            quantity: 1,
            unitPrice: 250,
            total: 250,
          },
          {
            id: 2,
            description: "ECG Test",
            quantity: 1,
            unitPrice: 150,
            total: 150,
          },
          {
            id: 3,
            description: "Blood Pressure Check",
            quantity: 1,
            unitPrice: 50,
            total: 50,
          },
        ],
        subtotal: 450,
        tax: 45,
        discount: 0,
        total: 495,
        status: "unpaid",
        dueDate: "2024-12-30",
      },
      {
        id: "INV-002",
        patientId: 2,
        patientName: "Sarah Ahmed",
        doctorId: 2,
        doctorName: "Dr. Ahmed Ali",
        date: "2024-12-10",
        items: [
          {
            id: 1,
            description: "Consultation",
            quantity: 1,
            unitPrice: 200,
            total: 200,
          },
          {
            id: 2,
            description: "Lab Tests",
            quantity: 1,
            unitPrice: 300,
            total: 300,
          },
        ],
        subtotal: 500,
        tax: 50,
        discount: 0,
        total: 550,
        status: "paid",
        paymentMethod: "Credit Card",
      },
    ]
  } catch (error) {
    console.error("Error fetching invoices:", error)
    throw error
  }
}

/**
 * Get a single invoice by ID
 * TODO: Replace with actual API endpoint
 */
export async function getInvoice(id: string): Promise<Invoice> {
  try {
    // const response = await fetch(`${API_BASE_URL}/${id}`)
    // if (!response.ok) throw new Error("Failed to fetch invoice")
    // return await response.json()

    // Placeholder: Get from getInvoices
    const invoices = await getInvoices()
    const invoice = invoices.find((inv) => inv.id === id)
    if (!invoice) throw new Error("Invoice not found")
    return invoice
  } catch (error) {
    console.error(`Error fetching invoice ${id}:`, error)
    throw error
  }
}

/**
 * Download invoice as PDF
 * TODO: Replace with actual API endpoint
 */
export async function downloadInvoice(id: string): Promise<Blob> {
  try {
    // const response = await fetch(`${API_BASE_URL}/${id}/download`, {
    //   method: "GET",
    // })
    // if (!response.ok) throw new Error("Failed to download invoice")
    // return await response.blob()

    // Placeholder
    throw new Error("Not implemented")
  } catch (error) {
    console.error(`Error downloading invoice ${id}:`, error)
    throw error
  }
}

