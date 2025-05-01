import { useParams } from 'react-router-dom'
import { ReviewElement } from '../reviewElement/ReviewElement'
import classes from './ProductReviews.module.css'
import { useContext, useEffect } from 'react'
import { ReviewContext } from '../../context/ReviewContext'

export const ProductReviews = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(ReviewContext)

  if (!context) return <div>No context available</div>

  const { reviews, fetchReviews } = context

  useEffect(() => {
    if (id) {
      fetchReviews(Number(id))
    }
  }, [id])

  return (
    <section className={classes.ProductReviews}>
      <h3>Отзывы {reviews.length}</h3>
      {reviews.map((e, i) => (
        <ReviewElement {...e} key={i} />
      ))}
    </section>
  )
}
