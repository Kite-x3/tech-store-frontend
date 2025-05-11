import { Review } from '../interfaces/review'
import { authService } from './AuthService'

class ReviewService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  /**
   * Получает отзывы для конкретного продукта
   * @param {number} productId - ID продукта
   * @returns {Promise<Review[]>} Массив отзывов
   * @throws {Error} Если не удалось загрузить отзывы
   */
  async getProductReviews(productId: number): Promise<Review[]> {
    const response = await fetch(`${this.baseURL}/Reviews/product/${productId}`)
    if (!response.ok) throw new Error('Failed to fetch reviews')
    const data = await response.json()
    return data.map((review: Review) => ({
      ...review,
      date: new Date(review.date),
    }))
  }
  /**
   * Создает новый отзыв о продукте
   * @param {Omit<Review, 'id'>} review - Данные отзыва (без ID)
   * @returns {Promise<Review>} Созданный отзыв
   * @throws {Error} Если не удалось создать отзыв
   */
  async createReview(review: Omit<Review, 'id'>): Promise<Review> {
    const token = authService.getToken()
    const requestData = {
      Author: review.author,
      Rating: review.rating,
      Comment: review.comment,
      Date: review.date.toISOString(),
      ProductId: review.productId,
    }

    const response = await fetch(`${this.baseURL}/Reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) throw new Error('failed to create review')

    const data = await response.json()
    return {
      ...data,
      date: new Date(data.date),
    }
  }
  /**
   * Удаляет отзыв
   * @param {number} id - ID отзыва для удаления
   * @returns {Promise<void>}
   * @throws {Error} Если не удалось удалить отзыв
   */
  async deleteReview(id: number): Promise<void> {
    const token = authService.getToken()
    const response = await fetch(`${this.baseURL}/Reviews/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('failed to delete review')
  }
}

export default new ReviewService('/api')
