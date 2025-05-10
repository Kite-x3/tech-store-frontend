export interface Order {
  orderId: number
  userId: string
  orderDate: string
  totalAmount: number
  status: OrderStatus
  orderItems: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderStatus {
  orderStatusId: number
  name: string
  description: string
}

export interface OrderItem {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
}

export interface CreateOrderDto {
  items: {
    productId: number
    quantity: number
  }[]
}
