import { ReactNode, createContext, useState } from 'react'
import { Review } from '../interfaces/review'
import ReviewService from '../services/ReviewService'

interface ReviewContextProps {
  reviews: Review[]
  createReview: (Review: Omit<Review, 'id'>) => void
  deleteReview: (id: number) => void
  fetchReviews: (productId: number) => void
}

export const ReviewContext = createContext<ReviewContextProps | undefined>(
  undefined
)

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([])

  const fetchReviews = async (productId: number) => {
    const data = await ReviewService.getProductReviews(productId)
    setReviews(data || [])
  }

  const createReview = async (review: Omit<Review, 'id'>) => {
    const data = await ReviewService.createReview(review)
    setReviews([...reviews, data])
  }

  const deleteReview = async (id: number) => {
    await ReviewService.deleteReview(id)
    const newReviews: Review[] = reviews.filter((r) => r.id == id)
    setReviews(newReviews)
  }

  return (
    <ReviewContext.Provider
      value={{ reviews, createReview, deleteReview, fetchReviews }}
    >
      {children}
    </ReviewContext.Provider>
  )
}
