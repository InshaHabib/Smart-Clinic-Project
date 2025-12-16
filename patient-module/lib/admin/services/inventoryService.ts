/**
 * Inventory Service
 * Handles all API calls related to medicine/inventory management
 */

export interface Medicine {
  id: number
  name: string
  description: string
  stock: number
  price: number
  category: string
  expiryDate: string
  supplier?: string
  lowStockThreshold?: number
}

export interface CreateMedicineDto {
  name: string
  description: string
  stock: number
  price: number
  category: string
  expiryDate: string
  supplier?: string
  lowStockThreshold?: number
}

export interface UpdateMedicineDto extends Partial<CreateMedicineDto> {
  id: number
}

const API_BASE_URL = "/api/admin/inventory"

/**
 * Get all medicines
 * TODO: Replace with actual API endpoint
 */
export async function getMedicines(): Promise<Medicine[]> {
  try {
    // const response = await fetch(API_BASE_URL)
    // if (!response.ok) throw new Error("Failed to fetch medicines")
    // return await response.json()

    // Placeholder data
    return [
      {
        id: 1,
        name: "Paracetamol 500mg",
        description: "Pain reliever and fever reducer",
        stock: 150,
        price: 5.99,
        category: "Pain Relief",
        expiryDate: "2025-12-31",
        supplier: "PharmaCorp",
        lowStockThreshold: 50,
      },
      {
        id: 2,
        name: "Amoxicillin 250mg",
        description: "Antibiotic for bacterial infections",
        stock: 30,
        price: 12.99,
        category: "Antibiotics",
        expiryDate: "2025-06-30",
        supplier: "MedSupply",
        lowStockThreshold: 50,
      },
      {
        id: 3,
        name: "Ibuprofen 400mg",
        description: "Anti-inflammatory and pain reliever",
        stock: 200,
        price: 8.99,
        category: "Pain Relief",
        expiryDate: "2026-01-15",
        supplier: "PharmaCorp",
        lowStockThreshold: 50,
      },
    ]
  } catch (error) {
    console.error("Error fetching medicines:", error)
    throw error
  }
}

/**
 * Get medicines with low stock
 * TODO: Replace with actual API endpoint
 */
export async function getLowStockItems(threshold?: number): Promise<Medicine[]> {
  try {
    // const queryParams = threshold ? `?threshold=${threshold}` : ""
    // const response = await fetch(`${API_BASE_URL}/low-stock${queryParams}`)
    // if (!response.ok) throw new Error("Failed to fetch low stock items")
    // return await response.json()

    // Placeholder: Filter from getMedicines
    const medicines = await getMedicines()
    return medicines.filter(
      (med) => med.stock <= (med.lowStockThreshold || threshold || 50)
    )
  } catch (error) {
    console.error("Error fetching low stock items:", error)
    throw error
  }
}

/**
 * Get a single medicine by ID
 * TODO: Replace with actual API endpoint
 */
export async function getMedicine(id: number): Promise<Medicine> {
  try {
    // const response = await fetch(`${API_BASE_URL}/${id}`)
    // if (!response.ok) throw new Error("Failed to fetch medicine")
    // return await response.json()

    // Placeholder
    const medicines = await getMedicines()
    const medicine = medicines.find((m) => m.id === id)
    if (!medicine) throw new Error("Medicine not found")
    return medicine
  } catch (error) {
    console.error(`Error fetching medicine ${id}:`, error)
    throw error
  }
}

/**
 * Add a new medicine
 * TODO: Replace with actual API endpoint
 */
export async function addMedicine(data: CreateMedicineDto): Promise<Medicine> {
  try {
    // const response = await fetch(API_BASE_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    // if (!response.ok) throw new Error("Failed to add medicine")
    // return await response.json()

    // Placeholder
    return {
      id: Date.now(),
      ...data,
      lowStockThreshold: data.lowStockThreshold || 50,
    }
  } catch (error) {
    console.error("Error adding medicine:", error)
    throw error
  }
}

/**
 * Update an existing medicine
 * TODO: Replace with actual API endpoint
 */
export async function updateMedicine(
  data: UpdateMedicineDto
): Promise<Medicine> {
  try {
    // const response = await fetch(`${API_BASE_URL}/${data.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    // if (!response.ok) throw new Error("Failed to update medicine")
    // return await response.json()

    // Placeholder
    throw new Error("Not implemented")
  } catch (error) {
    console.error(`Error updating medicine ${data.id}:`, error)
    throw error
  }
}

/**
 * Delete a medicine
 * TODO: Replace with actual API endpoint
 */
export async function deleteMedicine(id: number): Promise<void> {
  try {
    // const response = await fetch(`${API_BASE_URL}/${id}`, {
    //   method: "DELETE",
    // })
    // if (!response.ok) throw new Error("Failed to delete medicine")

    // Placeholder
    console.log(`Medicine ${id} deleted`)
  } catch (error) {
    console.error(`Error deleting medicine ${id}:`, error)
    throw error
  }
}

