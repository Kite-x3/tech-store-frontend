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

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) setUser(JSON.parse(storedUser))
    }
  }, [])

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

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
