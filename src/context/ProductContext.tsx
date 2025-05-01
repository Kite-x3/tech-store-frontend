import { ReactNode, createContext, useEffect, useState } from 'react'
import { Product } from '../interfaces/product'
import APIService from '../services/ProductService'

interface ProductContextProps {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  deleteProduct: (id: number) => void
  updateProduct: (
    id: number,
    updatedProduct: Omit<Product, 'id'>
  ) => Promise<Product>
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const data = await APIService.getProducts()
    setProducts(data || [])
  }

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = await APIService.createProduct(product)
    setProducts([...products, newProduct])
  }

  const deleteProduct = async (id: number) => {
    await APIService.deleteProduct(id)
    const newProducts: Product[] = products.filter((p) => p.id !== id)
    setProducts(newProducts)
  }

  const updateProduct = async (
    id: number,
    updatedProduct: Omit<Product, 'id'>
  ): Promise<Product> => {
    const response: Product = await APIService.updateProduct(id, updatedProduct)

    const newProducts: Product[] = products.map((p) =>
      p.id === id ? response : p
    )

    setProducts(newProducts)

    return response
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  )
}
