import classes from './ReviewElement.module.css'

import { Review } from '../../interfaces/review'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { Avatar } from '@mui/material'
import { useContext } from 'react'
import { ReviewContext } from '../../context/ReviewContext'
import { useAuth } from '../../context/AuthContext'

export const ReviewElement = ({
  id,
  author,
  rating,
  comment,
  date,
}: Review) => {
  const { isAdmin } = useAuth()

  const context = useContext(ReviewContext)

  if (!context) return <div>No context avalible...</div>

  const { deleteReview } = context

  return (
    <div>
      {isAdmin && (
        <button
          className={classes.deleteButton}
          onClick={() => deleteReview(id)}
        ></button>
      )}
      <div className={classes.Review}>
        <div className={classes.DateAndRatingBlock}>
          <div className={classes.AuthorBox}>
            <Avatar sx={{ width: 32, height: 32 }} />
            <div>
              <p>{author}</p>
              {[...Array(5)].map((_, i) =>
                i < rating ? (
                  <StarIcon className={classes.Star} key={i} />
                ) : (
                  <StarBorderIcon key={i} />
                )
              )}
            </div>
          </div>
          <p>{date.toLocaleDateString()}</p>
        </div>
        <h4>Комментарий</h4>
        <p>{comment}</p>
      </div>
    </div>
  )
}
