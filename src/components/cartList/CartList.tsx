import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { CartItemElement } from '../cartItemElement/CartItemElement'
import classes from './CartList.module.css'

export const CartList = () => {
  const context = useContext(CartContext)

  if (!context) return <div>No context avalible...</div>

  const { cart, placeOrder } = context

  const handlePlaceOrder = async () => {
    try {
      await placeOrder()
      alert('заказ оформлен, его можно увидеть в истори заказов')
    } catch (error) {
      console.error('Failed to place order:', error)
    }
  }

  return (
    <div className={classes.CartPage}>
      <div className={classes.CartList}>
        {cart?.items.map((e, i) => {
          return <CartItemElement {...e} key={i}></CartItemElement>
        })}
      </div>
      <button
        className={classes.OrderButton}
        onClick={handlePlaceOrder}
        disabled={!cart || cart.items.length === 0}
      >
        Оформить заказ
      </button>
    </div>
  )
}
