import { useContext, useEffect } from 'react'
import { OrderContext } from '../../context/OrderContext'
import classes from './AdminOrderList.module.css'
import { OrderElement } from '../orderElement/OrderElement'

export const AdminOrderList = () => {
  const context = useContext(OrderContext)

  if (!context) return <div>No context available...</div>

  const { getAllOrders, adminOrders } = context

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Управление заказами</h1>
      <div className={classes.AdminOrderList}>
        {adminOrders.map((order) => (
          <OrderElement key={order.orderId} {...order} />
        ))}
      </div>
    </div>
  )
}
