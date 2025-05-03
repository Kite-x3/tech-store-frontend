import {
  Product,
  ProductCreateDto,
  ProductUpdateDto,
} from '../interfaces/product'

class APIService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${this.baseURL}/Products`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return await response.json()
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

  async updateProduct(
    id: number,
    product: Omit<ProductUpdateDto, 'id'>
  ): Promise<Product> {
    const formData = new FormData()

    formData.append(
      'productDto',
      JSON.stringify({
        id: id,
        productName: product.productName,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        imageUrls: product.imageUrls,
      })
    )

    if (product.newImages) {
      product.newImages.forEach((file) => {
        formData.append('newImages', file)
      })
    }

    if (product.imagesToDelete) {
      formData.append('imagesToDelete', JSON.stringify(product.imagesToDelete))
    }

    const response = await fetch(`${this.baseURL}/Products/${id}`, {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update product')
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

export default new APIService('/api')
