import { useParams } from 'react-router-dom'
import { ReviewElement } from '../reviewElement/ReviewElement'
import classes from './ProductReviews.module.css'
import { useContext, useEffect, useState } from 'react'
import { ReviewContext } from '../../context/ReviewContext'
import { useAuth } from '../../context/AuthContext'
import { Box, Button, Rating, TextField } from '@mui/material'

export const ProductReviews = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(ReviewContext)
  const [commentText, setCommentText] = useState('')
  const [rating, setRating] = useState<number | null>(null)

  const { user } = useAuth()

  if (!context) return <div>No context available</div>

  const { reviews, fetchReviews, createReview } = context

  useEffect(() => {
    if (id) {
      fetchReviews(Number(id))
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !commentText.trim() || !rating) return

    try {
      if (user)
        await createReview({
          productId: Number(id),
          comment: commentText,
          author: user?.userName,
          date: new Date(),
          rating: rating,
        })
      setCommentText('')
      setRating(0)
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
  }

  return (
    <section className={classes.ProductReviews}>
      <h3>Отзывы {reviews.length}</h3>

      {user && (
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ mb: 3, color: 'white' }}
        >
          <Rating
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue)
            }}
            precision={1}
            sx={{
              mb: 2,
              color: 'white',
              '& .MuiRating-icon': {
                color: 'white',
              },
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='Напишите ваш отзыв...'
            variant='outlined'
            required
            slotProps={{
              inputLabel: {
                style: { color: '#fff' },
              },
              input: {
                style: { color: '#fff' },
              },
            }}
            sx={{
              mb: 2,
              color: 'white',
              borderColor: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
            }}
          />
          <Button type='submit' variant='contained' disabled={!rating}>
            Отправить
          </Button>
        </Box>
      )}
      {reviews.map((e, i) => (
        <ReviewElement {...e} key={i} />
      ))}
    </section>
  )
}
