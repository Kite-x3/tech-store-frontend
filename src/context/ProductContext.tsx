import { ReactNode, createContext, useState } from 'react'
import {
  Product,
  ProductCreateDto,
  ProductQueryParams,
  ProductUpdateDto,
} from '../interfaces/product'
import ProductService from '../services/ProductService'
import { PaginatedResponse } from '../models/pagination.model'

interface ProductContextProps {
  products: Product[]
  paginatedProducts: PaginatedResponse<Product> | null
  addProduct: (product: ProductCreateDto) => Promise<Product>
  deleteProduct: (id: number) => void
  updateProduct: (
    id: number,
    updatedProduct: ProductUpdateDto
  ) => Promise<Product>
  fetchMainPageProducts: () => Promise<Product[]>
  getProductsByFilter: (
    query: ProductQueryParams
  ) => Promise<PaginatedResponse<Product>>
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [paginatedProducts, setPaginatedProducts] =
    useState<PaginatedResponse<Product> | null>(null)
  /**
   * Загружает товары для главной страницы
   * @returns {Promise<Product[]>} Массив товаров
   */
  const fetchMainPageProducts = async (): Promise<Product[]> => {
    const data = await ProductService.getMainPageProducts()
    setProducts(data || [])
    return data
  }
  /**
   * Добавляет новый товар
   * @param {ProductCreateDto} product - Данные товар
   * @returns {Promise<Product>} Созданный товар
   */
  const addProduct = async (product: ProductCreateDto): Promise<Product> => {
    const newProduct = await ProductService.createProduct(product)
    setProducts([...products, newProduct])
    return newProduct
  }
  /**
   * Получает отфильтрованные товары
   * @param {ProductQueryParams} query - Параметры фильтрации
   * @returns {Promise<PaginatedResponse<Product>>} Пагинированный ответ с товарами
   */
  const getProductsByFilter = async (
    query: ProductQueryParams
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const data = await ProductService.getFilteredProducts(query)
      setPaginatedProducts(data)
      return data
    } catch (error) {
      console.error('Failed to fetch filtered products:', error)
      throw error
    }
  }
  /**
   * Удаляет товар
   * @param {number} id - ID товара
   */
  const deleteProduct = async (id: number) => {
    await ProductService.deleteProduct(id)
    const newProducts: Product[] = products.filter((p) => p.id !== id)
    setProducts(newProducts)
  }
  /**
   * Обновляет товар
   * @param {number} id - ID товара
   * @param {ProductUpdateDto} updatedProduct - Новые данные товара
   * @returns {Promise<Product>} Обновленный товар
   */
  const updateProduct = async (
    id: number,
    updatedProduct: ProductUpdateDto
  ): Promise<Product> => {
    const response: Product = await ProductService.updateProduct(
      id,
      updatedProduct
    )

    const newProducts: Product[] = products.map((p) =>
      p.id === id ? response : p
    )

    setProducts(newProducts)

    return response
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        paginatedProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        fetchMainPageProducts,
        getProductsByFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
