import {
  Product,
  ProductCreateDto,
  ProductQueryParams,
  ProductUpdateDto,
} from '../interfaces/product'
import { PaginatedResponse } from '../models/pagination.model'

class ProductService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async getMainPageProducts(): Promise<Product[]> {
    const response = await fetch(`${this.baseURL}/products/main`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return await response.json()
  }

  async getFilteredProducts(
    query: ProductQueryParams
  ): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()

    if (query.categoryId)
      params.append('categoryId', query.categoryId.toString())
    if (query.pageNumber)
      params.append('pageNumber', query.pageNumber.toString())
    if (query.pageSize) params.append('pageSize', query.pageSize.toString())
    if (query.sortBy) params.append('sortBy', query.sortBy)
    if (query.sortDescending)
      params.append('sortDescending', query.sortDescending.toString())
    if (query.minPrice) params.append('minPrice', query.minPrice.toString())
    if (query.maxPrice) params.append('maxPrice', query.maxPrice.toString())

    const response = await fetch(
      `${this.baseURL}/products?${params.toString()}`
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || 'Failed to fetch products')
    }
    const data2 = await response.json()
    console.log(data2.items)
    return data2
  }

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${this.baseURL}/Products/${id}`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return await response.json()
  }

  async createProduct(product: ProductCreateDto): Promise<Product> {
    const formData = new FormData()

    formData.append('productName', product.productName)
    formData.append('description', product.description)
    formData.append('price', product.price.toString())
    formData.append('categoryId', product.categoryId.toString())

    product.images?.forEach((file, i) => {
      formData.append(`image${i}`, file)
    })

    const response = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Server response:', error)
      throw new Error(error || 'Failed to create product')
    }
    return response.json()
  }

  async updateProduct(id: number, product: ProductUpdateDto): Promise<Product> {
    const formData = new FormData()

    // Добавляем основные поля продукта
    formData.append('ProductName', product.productName)
    formData.append('Description', product.description)
    formData.append('Price', product.price.toString())
    formData.append('CategoryId', product.categoryId.toString())
    formData.append('Id', id.toString())

    if (product.imageUrls) {
      formData.append('ImageUrls', JSON.stringify(product.imageUrls))
    }

    if (product.newImages) {
      product.newImages.forEach((file, index) => {
        formData.append(`image${index}`, file)
      })
    }

    if (product.imagesToDelete && product.imagesToDelete.length > 0) {
      formData.append('imagesToDelete', JSON.stringify(product.imagesToDelete))
    }

    const response = await fetch(`${this.baseURL}/Products/${id}`, {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Server response:', error)
      throw new Error(error || 'Failed to update product')
    }

    return await response.json()
  }

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/Products/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete product')
  }
}

export default new ProductService('/api')
