import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { LoginResponse } from '../models/auth.models'
import { authService } from '../services/AuthService'

interface AuthContextType {
  user: LoginResponse | null

  login: (userName: string, password: string) => Promise<void>

  logout: () => void

  register: (userName: string, password: string, email: string) => Promise<void>

  isAdmin: boolean
}

enum UserRole {
  Admin = 'admin',
  User = 'user',
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null)
  /**
   * Инициализирует аутентификацию при загрузке
   */
  const initializeAuth = async () => {
    const token = authService.getToken()
    if (!token) {
      return
    }

    try {
      const response = await authService.validateToken()
      if (response) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } else {
        console.log('failed valifation')
        logout()
      }
    } catch (error) {
      console.error('Auth validation failed:', error)
      logout()
    }
  }

  useEffect(() => {
    initializeAuth()
  }, [])
  /**
   * Выполняет вход пользователя
   * @param {string} userName - Имя пользователя
   * @param {string} password - Пароль
   * @returns {Promise<void>}
   * @throws {Error} Если вход не удался
   */
  const login = async (userName: string, password: string) => {
    try {
      const response = await authService.login({ userName, password })
      authService.storeToken(response.token)
      localStorage.setItem('user', JSON.stringify(response))
      setUser(response)
    } catch (error) {
      console.error('Ошибка входа:', error)
      throw error
    }
  }
  /**
   * Регистрирует нового пользователя
   * @param {string} userName - Имя пользователя
   * @param {string} password - Пароль
   * @param {string} email - Email
   * @returns {Promise<void>}
   * @throws {Error} Если регистрация не удалась
   */
  const register = async (
    userName: string,
    password: string,
    email: string
  ) => {
    try {
      const response = await authService.register({ userName, password, email })
      authService.storeToken(response.token)
      localStorage.setItem('user', JSON.stringify(response))
      setUser(response)
    } catch (error) {
      console.error('Ошибка регистрации:', error)
      throw error
    }
  }
  /**
   * Выполняет выход пользователя
   */
  const logout = () => {
    authService.removeToken()
    localStorage.removeItem('user')
    setUser(null)
  }

  const isAdmin = user?.userRole === UserRole.Admin

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, register }}>
      {children}
    </AuthContext.Provider>
  )
}
/**
 * Хук для использования контекста аутентификации
 * @returns {AuthContextType} Контекст аутентификации
 * @throws {Error} Если используется вне AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
