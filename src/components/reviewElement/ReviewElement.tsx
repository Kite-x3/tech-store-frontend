import classes from './ReviewElement.module.css'

import { Review } from '../../interfaces/review'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

export const ReviewElement = ({ author, rating, comment, date }: Review) => {
  return (
    <div className={classes.Review}>
      <div className={classes.DateAndRatingBlock}>
        <div>
          <p>{author}</p>
          {[...Array(5)].map((_, i) =>
            i < rating ? (
              <StarIcon className={classes.Star} />
            ) : (
              <StarBorderIcon />
            )
          )}
        </div>
        <p>{date.toUTCString()}</p>
      </div>
      <h4>Комментарий</h4>
      <p>{comment}</p>
    </div>
  )
}
