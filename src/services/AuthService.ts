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
  /**
   * Выполняет вход пользователя
   * @param {LoginRequest} credentials - Данные для входа
   * @returns {Promise<LoginResponse>} Данные авторизованного пользователя
   * @throws {Error} Если вход не удался
   */
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
  /**
   * Проверяет валидность токена
   * @returns {Promise<boolean>} true, если токен валиден
   */
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
  /**
   * Регистрирует нового пользователя
   * @param {RegisterRequest} data - Данные для регистрации
   * @returns {Promise<LoginResponse>} Данные зарегистрированного пользователя
   * @throws {Error} Если регистрация не удалась
   */
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
  /**
   * Сохраняет токен в localStorage
   * @param {string} token - JWT токен
   */
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }
  /**
   * Получает токен из localStorage
   * @returns {string | null} Токен или null, если не найден
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }
  /**
   * Удаляет токен из localStorage
   */
  removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }
  /**
   * Проверяет, аутентифицирован ли пользователь
   * @returns {boolean} true, если токен существует
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService('')
