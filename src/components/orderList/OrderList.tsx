import { useContext } from 'react'
import { OrderContext } from '../../context/OrderContext'
import classes from './OrderList.module.css'
import { OrderElement } from '../orderElement/OrderElement'

export const OrderList = () => {
  const context = useContext(OrderContext)

  if (!context) return <div>No context available...</div>

  const { orders, loading, error } = context

  if (loading) return <div>Loading orders...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={classes.OrderList}>
      <h1>История заказов</h1>
      {orders.map((order) => (
        <OrderElement key={order.orderId} {...order} />
      ))}
    </div>
  )
}
