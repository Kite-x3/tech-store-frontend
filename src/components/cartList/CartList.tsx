import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { CartItemElement } from '../cartItemElement/CartItemElement'
import classes from './CartList.module.css'

export const CartList = () => {
  const context = useContext(CartContext)

  if (!context) return <div>No context avalible...</div>

  const { cart } = context

  return (
    <div className={classes.CartPage}>
      <div className={classes.CartList}>
        {cart?.items.map((e, i) => {
          return <CartItemElement {...e} key={i}></CartItemElement>
        })}
      </div>
      <button className={classes.OrderButton}>Оформить заказ</button>
    </div>
  )
}
