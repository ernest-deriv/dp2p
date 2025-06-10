import { API } from "@/lib/local-variables"

export interface LoginRequest {
  email: string
}

export interface LoginResponse {
  code: string
  message: string
}

export interface VerificationRequest {
  token: string
  type: string
  email: string
}

export interface VerificationResponse {
  access_token?: string
  user?: {
    id: string
    email?: string
  }
}

/**
 * Initiate login with email
 */
export async function login(email: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API.coreUrl}/login`, {
      method: "POST",
      body: JSON.stringify(email),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    const { data } = result

    return data[0];
  } catch (error) {
    console.error("Login error:", error)
    throw new Error("Failed to login. Please try again.")
  }
}

/**
 * Verify the code sent to email
 */
export async function verifyCode(verificationData: VerificationRequest): Promise<VerificationResponse> {
  try {
    const response = await fetch(`${API.coreUrl}/verify`, {
      method: "POST",
      body: JSON.stringify(verificationData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    const { data } = result

    return data[0]
  } catch (error) {
    console.error("Verification error:", error)
    throw new Error("Failed to verify code. Please try again.")
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("auth_token")
}

/**
 * Get the authentication token
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  try {
    const token = getAuthToken()
    if (token) {
      await fetch(`${API.coreUrl}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch((e) => {
        console.log(e);
      })
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
    }
  } catch (error) {
    console.error("Logout error:", error)
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}