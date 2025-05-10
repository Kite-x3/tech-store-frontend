import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Order, CreateOrderDto } from '../interfaces/order'
import OrderService from '../services/OrderService'
import { useAuth } from './AuthContext'

interface OrderContextProps {
  orders: Order[]
  loading: boolean
  error: string | null
  createOrder: (orderDto: CreateOrderDto) => Promise<Order>
  refreshOrders: () => Promise<void>
}

export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined
)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    if (!user) {
      setOrders([])
      return
    }
    try {
      setLoading(true)
      const data = await OrderService.getUserOrders()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [user])

  const createOrder = async (orderDto: CreateOrderDto): Promise<Order> => {
    if (!user) {
      throw new Error('User not authenticated')
    }
    try {
      setLoading(true)
      const order = await OrderService.createOrder(orderDto)
      await fetchOrders() // Обновляем список заказов после создания
      return order
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
        refreshOrders: fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
