import { ReactNode, createContext, useEffect, useState } from 'react'
import { Order, CreateOrderDto, OrderStatus } from '../interfaces/order'
import OrderService from '../services/OrderService'
import { useAuth } from './AuthContext'

interface OrderContextProps {
  orders: Order[]
  orderStatuses: OrderStatus[]
  adminOrders: Order[]
  loading: boolean
  error: string | null
  createOrder: (orderDto: CreateOrderDto) => Promise<Order>
  refreshOrders: () => Promise<void>
  updateOrderStatus: (orderId: number, statusId: number) => Promise<void>
  getOrderStatuses: () => Promise<void>
  getAllOrders: () => Promise<void>
}

export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined
)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [adminOrders, setAdminOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([])
  /**
   * Загружает заказы текущего пользователя
   */
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
    getOrderStatuses()
    fetchOrders()
  }, [user])
  /**
   * Загружает все заказы (для администратора)
   */
  const getAllOrders = async (): Promise<void> => {
    if (!user) {
      setAdminOrders([])
      return
    }
    try {
      setLoading(true)
      const data = await OrderService.getOrders()
      setAdminOrders(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch all orders'
      )
    } finally {
      setLoading(false)
    }
  }
  /**
   * Создает новый заказ
   * @param {CreateOrderDto} orderDto - Данные заказа
   * @returns {Promise<Order>} Созданный заказ
   */
  const createOrder = async (orderDto: CreateOrderDto): Promise<Order> => {
    if (!user) {
      throw new Error('User not authenticated')
    }
    try {
      setLoading(true)
      const order = await OrderService.createOrder(orderDto)

      setOrders((prevOrders) => [...prevOrders, order])
      setAdminOrders((prevAdminOrders) => [...prevAdminOrders, order])

      return order
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order')
      throw err
    } finally {
      setLoading(false)
    }
  }
  /**
   * Загружает статусы заказов
   */
  const getOrderStatuses = async () => {
    try {
      const statuses = await OrderService.getOrderStatuses()
      setOrderStatuses(statuses)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch order statuses'
      )
    }
  }
  /**
   * Обновляет статус заказа
   * @param {number} orderId - ID заказа
   * @param {number} statusId - ID нового статуса
   * @returns {Promise<void>}
   * @throws {Error} Если не удалось обновить статус
   */
  const updateOrderStatus = async (orderId: number, statusId: number) => {
    try {
      setLoading(true)
      await OrderService.updateOrderStatus(orderId, statusId)
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? { ...order, status: { ...order.status, orderStatusId: statusId } }
            : order
        )
      )

      setAdminOrders((prevAdminOrders) =>
        prevAdminOrders.map((order) =>
          order.orderId === orderId
            ? { ...order, status: { ...order.status, orderStatusId: statusId } }
            : order
        )
      )
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update order status'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderStatuses,
        adminOrders,
        loading,
        error,
        createOrder,
        refreshOrders: fetchOrders,
        updateOrderStatus,
        getOrderStatuses,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
