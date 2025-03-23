import { ProductSpecification } from './productSpecification'
import { Review } from './review'

export interface Product {
  id: number
  price: number
  productName: string
  description: string
  img: string[]
  fullDescription?: string
  specifications?: ProductSpecification[]
  reviews?: Review[]
}
