import { Category } from '../interfaces/category'

class CategoryService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  /**
   * Получает список всех категорий
   * @returns {Promise<Category[]>} Массив категорий
   * @throws {Error} Если не удалось загрузить категории
   */
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseURL}/Categories`)
    if (!response.ok) {
      throw new Error('failed to get categories')
    }
    return response.json()
  }
  /**
   * Получает категорию по ID
   * @param {number} id - ID категории
   * @returns {Promise<Category>} Найденная категория
   * @throws {Error} Если не удалось найти категорию
   */
  async getCategoryById(id: number): Promise<Category> {
    const response = await fetch(`${this.baseURL}/Categories${id}`)
    if (!response.ok) {
      throw new Error('failed to get categories')
    }
    return response.json()
  }
  /**
   * Создает новую категорию
   * @param {Omit<Category, 'id'>} category - Данные категории (без ID)
   * @returns {Promise<Category>} Созданная категория
   * @throws {Error} Если не удалось создать категорию
   */
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
  /**
   * Обновляет существующую категорию
   * @param {number} id - ID категории
   * @param {Omit<Category, 'id'>} category - Новые данные категории
   * @returns {Promise<Category>} Обновленная категория
   * @throws {Error} Если не удалось обновить категорию
   */
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
  /**
   * Удаляет категорию
   * @param {number} id - ID категории
   * @returns {Promise<void>}
   * @throws {Error} Если не удалось удалить категорию
   */
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
