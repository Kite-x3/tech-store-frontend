import {
  ApiError,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../models/auth.models'

class AuthService {
  private baseUrl: string

  private tokenKey = 'jwtToken'

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/api/Account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Login failed')
    }
    return (await response.json()) as LoginResponse
  }

  async validateToken(): Promise<boolean> {
    const token = this.getToken()
    if (!token) return false

    try {
      const response = await fetch('/api/Account/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        return !!data.userName
      }

      return false
    } catch (error) {
      console.error('Token validation failed:', error)
      return false
    }
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/api/Account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)

      if (Array.isArray(errorData)) {
        const errorMessages = errorData
          .map((err: { code: string; description: string }) => {
            switch (err.code) {
              case 'PasswordRequiresNonAlphanumeric':
                return 'Пароль должен содержать хотя бы один спецсимвол'
              case 'PasswordRequiresDigit':
                return 'Пароль должен содержать хотя бы одну цифру'
              case 'PasswordRequiresUpper':
                return 'Пароль должен содержать хотя бы одну заглавную букву'
              case 'PasswordTooShort':
                const match = err.description.match(/\d+/)
                return `Пароль должен быть не менее ${
                  match ? match[0] : 6
                } символов`
              case 'DuplicateUserName':
                return 'Пользователь с таким именем уже существует'
              case 'DuplicateEmail':
                return 'Пользователь с таким email уже существует'
              default:
                return err.description
            }
          })
          .join('. ')

        throw new Error(errorMessages || 'Ошибка регистрации')
      } else if (errorData?.errors) {
        const errorMessages = Object.values(errorData.errors).flat().join('. ')
        throw new Error(errorMessages || 'Ошибка валидации')
      } else if (errorData?.message) {
        throw new Error(errorData.message)
      } else {
        throw new Error(`Ошибка регистрации: ${response.statusText}`)
      }
    }

    return (await response.json()) as LoginResponse
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService('')
