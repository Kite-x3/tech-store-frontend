import { Product } from './product'

export interface Cart {
  cartId: number
  userId: string
  items: CartItem[]
  totalPrice: number
}

export interface CartItem {
  cartItemId: number
  productId: number
  product: Product
  quantity: number
  price: number
}
