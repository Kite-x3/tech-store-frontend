import { Cart } from '../interfaces/cart'
import { authService } from './AuthService'

class CartService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  /**
   * Получает текущую корзину пользователя
   * @returns {Promise<Cart>} Текущая корзина
   * @throws {Error} Если не удалось загрузить корзину
   */
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
  /**
   * Добавляет товар в корзину
   * @param {number} productId - ID товара
   * @param {number} [quantity=1] - Количество (по умолчанию 1)
   * @returns {Promise<Cart>} Обновленная корзина
   * @throws {Error} Если не удалось добавить товар
   */
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
  /**
   * Обновляет количество товара в корзине
   * @param {number} cartItemId - ID элемента корзины
   * @param {number} quantity - Новое количество
   * @returns {Promise<Cart>} Обновленная корзина
   * @throws {Error} Если не удалось обновить товар
   */
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
  /**
   * Удаляет товар из корзины
   * @param {number} cartItemId - ID элемента корзины
   * @returns {Promise<void>}
   * @throws {Error} Если не удалось удалить товар
   */
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
  /**
   * Очищает корзину
   * @returns {Promise<void>}
   * @throws {Error} Если не удалось очистить корзину
   */
  async clearCart(): Promise<void> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Carts/clear`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to clear cart')
    }
  }
}

export default new CartService('/api')
