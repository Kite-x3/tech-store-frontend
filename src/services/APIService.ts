import { Product } from '../interfaces/product'

class APIService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${this.baseURL}/Products`)
    if (!response.ok) throw new Error('Failed to fetch projects')
    return await response.json()
  }

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${this.baseURL}/Products/${id}`)
    if (!response.ok) throw new Error('Failed to fetch projects')
    return await response.json()
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${this.baseURL}/Products`, {
      method: 'POST',
      headers: { 'Content-Type': 'aplication/json' },
      body: JSON.stringify(product),
    })
    if (!response.ok) throw new Error('Failed to create project')
    return await response.json()
  }

  async updateProduct(
    id: number,
    product: Omit<Product, 'id'>
  ): Promise<Product> {
    const productWithId = { ...product, id }

    const response = fetch(`${this.baseURL}/Products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productWithId),
    })

    return (await response).json()
  }

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/Products/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete project')
  }
}
