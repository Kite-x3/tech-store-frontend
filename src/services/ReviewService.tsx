import { Review } from '../interfaces/review'

class ReviewService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  async getProductReviews(productId: number): Promise<Review[]> {
    const response = await fetch(`${this.baseURL}/Reviews/product/${productId}`)
    if (!response.ok) throw new Error('Failed to fetch reviews')
    const data = await response.json()
    return data.map((review: Review) => ({
      ...review,
      date: new Date(review.date),
    }))
  }
  async createReview(review: Omit<Review, 'id'>): Promise<Review> {
    const response = await fetch(`${this.baseURL}/Reviwes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
    if (!response.ok) throw new Error('failed to create review')
    const data = await response.json()
    return {
      ...data,
      date: new Date(data.date),
    }
  }
  async deleteReview(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/Reviwes/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('failed to delete review')
  }
}

export default new ReviewService('/api')
