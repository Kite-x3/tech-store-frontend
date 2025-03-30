import { ReactNode, createContext, useEffect, useState } from 'react'
import { Product } from '../interfaces/product'
import APIService from '../services/APIService'

interface ProductContextProps {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
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

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
