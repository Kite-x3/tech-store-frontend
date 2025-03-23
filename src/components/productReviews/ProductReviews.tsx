import { Review } from '../../interfaces/review'
import { ReviewElement } from '../reviewElement/ReviewElement'
import classes from './ProductReviews.module.css'

export const ProductReviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <section className={classes.ProductReviews}>
      <h3>Отзывы</h3>
      {reviews.map((e, i) => (
        <ReviewElement {...e} key={i} />
      ))}
    </section>
  )
}
