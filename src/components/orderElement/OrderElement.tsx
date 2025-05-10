import { Order } from '../../interfaces/order'
import classes from './OrderElement.module.css'

export const OrderElement = (props: Order) => {
  return (
    <div className={classes.OrderElement}>
      <div className={classes.OrderHeader}>
        <h3>Заказ #{props.orderId}</h3>
        <span
          className={classes.OrderStatus}
          style={{
            backgroundColor: getStatusColor(props.status.name),
          }}
        >
          {props.status.name}
        </span>
      </div>
      <div className={classes.OrderDate}>
        {new Date(props.orderDate).toLocaleString()}
      </div>
      <div className={classes.OrderItems}>
        {props.orderItems.map((item) => (
          <div key={item.productId} className={classes.OrderItem}>
            <span>{item.productName}</span>
            <span>
              {item.quantity} x ${item.unitPrice.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className={classes.OrderTotal}>
        Total: ${props.totalAmount.toFixed(2)}
      </div>
    </div>
  )
}

// Вспомогательная функция для цвета статуса
function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'pending':
      return '#ffc107'
    case 'processing':
      return '#17a2b8'
    case 'completed':
      return '#28a745'
    case 'cancelled':
      return '#dc3545'
    default:
      return '#6c757d'
  }
}
