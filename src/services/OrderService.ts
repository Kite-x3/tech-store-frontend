import { Order, CreateOrderDto, OrderStatus } from '../interfaces/order'
import { authService } from './AuthService'

class OrderService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  /**
   * Получает список всех заказов (для администратора)
   * @returns {Promise<Order[]>} Массив заказов
   * @throws {Error} Если не удалось загрузить заказы
   */
  async getOrders(): Promise<Order[]> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get orders')
    }

    return response.json()
  }
  /**
   * Получает заказы текущего пользователя
   * @returns {Promise<Order[]>} Массив заказов пользователя
   * @throws {Error} Если не удалось загрузить заказы
   */
  async getUserOrders(): Promise<Order[]> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Orders/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user orders')
    }

    return response.json()
  }
  /**
   * Получает заказ по ID
   * @param {number} id - ID заказа
   * @returns {Promise<Order>} Найденный заказ
   * @throws {Error} Если не удалось найти заказ
   */
  async getOrderById(id: number): Promise<Order> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get order')
    }

    return response.json()
  }
  /**
   * Создает новый заказ
   * @param {CreateOrderDto} orderDto - Данные для создания заказа
   * @returns {Promise<Order>} Созданный заказ
   * @throws {Error} Если не удалось создать заказ
   */
  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderDto),
    })

    if (!response.ok) {
      throw new Error('Failed to create order')
    }

    return response.json()
  }
  /**
   * Получает список возможных статусов заказа
   * @returns {Promise<OrderStatus[]>} Массив статусов заказа
   * @throws {Error} Если не удалось загрузить статусы
   */
  async getOrderStatuses(): Promise<OrderStatus[]> {
    const response = await fetch(`${this.baseURL}/order-statuses`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get order statuses')
    }

    return response.json()
  }
  /**
   * Обновляет статус заказа
   * @param {number} orderId - ID заказа
   * @param {number} statusId - ID нового статуса
   * @returns {Promise<void>}
   * @throws {Error} Если не удалось обновить статус
   */
  async updateOrderStatus(orderId: number, statusId: number): Promise<void> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statusId),
    })

    if (!response.ok) {
      throw new Error('Failed to update order status')
    }
  }
}

export default new OrderService('/api')
