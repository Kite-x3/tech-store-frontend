export interface Product {
  id: number
  price: number
  productName: string
  description: string
  imageUrls: string[]
  categoryId: number
}

export interface ProductCreateDto extends Omit<Product, 'id' | 'imageUrls'> {
  images?: File[] // Для загрузки файлов
}

export interface ProductUpdateDto extends Product {
  newImages?: File[]
  imagesToDelete?: string[]
}

export interface ProductQueryParams {
  categoryId?: number
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDescending?: boolean
  minPrice?: number
  maxPrice?: number
}
