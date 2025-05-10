import { ReactNode, createContext, useEffect, useState } from 'react'
import { Cart } from '../interfaces/cart'
import CartService from '../services/CartService'
import { useAuth } from './AuthContext'
import OrderService from '../services/OrderService'
import { CreateOrderDto, Order } from '../interfaces/order'

interface CartContextProps {
  cart: Cart | null
  loading: boolean
  error: string | null
  addItem: (productId: number, quantity?: number) => Promise<void>
  updateItem: (cartItemId: number, quantity: number) => Promise<void>
  removeItem: (cartItemId: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
  placeOrder: () => Promise<Order | null>
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const placeOrder = async (): Promise<Order | null> => {
    if (!user || !cart) return null

    try {
      setLoading(true)
      const orderDto: CreateOrderDto = {
        items: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }
      const order = await OrderService.createOrder(orderDto)
      await clearCart()
      return order
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order')
      return null
    } finally {
      setLoading(false)
    }
  }

  const fetchCart = async () => {
    if (!user) {
      setCart(null)
      return
    }
    try {
      setLoading(true)
      const data = await CartService.getCart()
      setCart(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  const addItem = async (productId: number, quantity: number = 1) => {
    if (!user) {
      setError('User not authenticated')
      return
    }
    try {
      setLoading(true)
      const updatedCart = await CartService.addItem(productId, quantity)
      setCart(updatedCart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item')
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (cartItemId: number, quantity: number) => {
    try {
      setLoading(true)
      const updatedCart = await CartService.updateItem(cartItemId, quantity)
      setCart(updatedCart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item')
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (cartItemId: number) => {
    try {
      setLoading(true)
      await CartService.removeItem(cartItemId)
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item')
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      await CartService.clearCart()
      setCart(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        refreshCart: fetchCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
