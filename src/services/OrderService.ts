import { Order, CreateOrderDto, OrderStatus } from '../interfaces/order'
import { authService } from './AuthService'

class OrderService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

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
}

export default new OrderService('/api')
