export interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: Date
  productId?: number
}
