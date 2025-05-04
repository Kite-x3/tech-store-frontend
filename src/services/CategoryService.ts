import { Category } from '../interfaces/category'

class CategoryService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseURL}/Categories`)
    if (!response.ok) {
      throw new Error('failed to get categories')
    }
    return response.json()
  }

  async getCategoryById(id: number): Promise<Category> {
    const response = await fetch(`${this.baseURL}/Categories${id}`)
    if (!response.ok) {
      throw new Error('failed to get categories')
    }
    return response.json()
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const response = await fetch(`${this.baseURL}/Categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    if (!response.ok) {
      throw new Error('failed to get categories')
    }
    return response.json()
  }
  async updateCategory(
    id: number,
    category: Omit<Category, 'id'>
  ): Promise<Category> {
    const response = await fetch(`${this.baseURL}/Categories`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, category }),
    })
    if (!response.ok) {
      throw new Error('failed to get categories')
    }
    return response.json()
  }
  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/Categories${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('failed to get categories')
    }
  }
}

export default new CategoryService('/api')
