/**
 * Patient Service
 * Handles all API calls related to patient management
 */

export interface Patient {
  id: number
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  address: string
  bloodGroup?: string
  emergencyContact?: string
  registrationDate: string
}

export interface UpdatePatientDto extends Partial<Omit<Patient, "id" | "registrationDate">> {
  id: number
}

const API_BASE_URL = "/api/admin/patients"

/**
 * Get all patients
 * TODO: Replace with actual API endpoint
 */
export async function getPatients(): Promise<Patient[]> {
  try {
    // const response = await fetch(API_BASE_URL)
    // if (!response.ok) throw new Error("Failed to fetch patients")
    // return await response.json()

    // Placeholder data
    return [
      {
        id: 1,
        name: "Ilham Khan",
        email: "ilham.khan@example.com",
        phone: "+1234567890",
        dateOfBirth: "1990-01-15",
        gender: "male",
        address: "123 Main St, City",
        bloodGroup: "O+",
        emergencyContact: "+1234567891",
        registrationDate: "2024-01-10",
      },
      {
        id: 2,
        name: "Sarah Ahmed",
        email: "sarah.ahmed@example.com",
        phone: "+1234567892",
        dateOfBirth: "1985-05-20",
        gender: "female",
        address: "456 Oak Ave, City",
        bloodGroup: "A+",
        registrationDate: "2024-02-15",
      },
    ]
  } catch (error) {
    console.error("Error fetching patients:", error)
    throw error
  }
}

/**
 * Get a single patient by ID
 * TODO: Replace with actual API endpoint
 */
export async function getPatient(id: number): Promise<Patient> {
  try {
    // const response = await fetch(`${API_BASE_URL}/${id}`)
    // if (!response.ok) throw new Error("Failed to fetch patient")
    // return await response.json()

    // Placeholder
    throw new Error("Not implemented")
  } catch (error) {
    console.error(`Error fetching patient ${id}:`, error)
    throw error
  }
}

/**
 * Update an existing patient
 * TODO: Replace with actual API endpoint
 */
export async function updatePatient(data: UpdatePatientDto): Promise<Patient> {
  try {
    // const response = await fetch(`${API_BASE_URL}/${data.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    // if (!response.ok) throw new Error("Failed to update patient")
    // return await response.json()

    // Placeholder
    throw new Error("Not implemented")
  } catch (error) {
    console.error(`Error updating patient ${data.id}:`, error)
    throw error
  }
}

