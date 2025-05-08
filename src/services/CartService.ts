import { Cart } from '../interfaces/cart'
import { authService } from './AuthService'

class CartService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async getCart(): Promise<Cart> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to get cart')
    }
    return response.json()
  }

  async addItem(productId: number, quantity: number = 1): Promise<Cart> {
    const isValid = await authService.validateToken()
    if (!isValid) {
      authService.removeToken()
      throw new Error('Session expired, please login again')
    }

    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Carts/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    })

    if (response.status === 401) {
      authService.removeToken()
      throw new Error('Session expired, please login again')
    }

    if (!response.ok) {
      throw new Error('Failed to add item to cart')
    }

    return response.json()
  }

  async updateItem(cartItemId: number, quantity: number): Promise<Cart> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Carts/items/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    })
    if (!response.ok) {
      throw new Error('Failed to update cart item')
    }
    return response.json()
  }

  async removeItem(cartItemId: number): Promise<void> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Carts/items/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to remove item from cart')
    }
  }

  async clearCart(): Promise<void> {
    const response = await fetch(`${this.baseURL}/Carts/clear`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to clear cart')
    }
  }
}

export default new CartService('/api')
