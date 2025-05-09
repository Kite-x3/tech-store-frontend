import { NavLink } from 'react-router-dom'
import { CartItem } from '../../interfaces/cart'
import classes from './CartItemElement.module.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Box, Button, Typography } from '@mui/material'

export const CartItemElement = ({
  cartItemId,
  productId,
  product,
  quantity,
}: CartItem) => {
  const context = useContext(CartContext)

  if (!context) return <div>No context avalible...</div>

  const { removeItem, updateItem } = context

  return (
    <div className={classes.CartItemElement}>
      <NavLink to={`/product/${productId}`} className={classes.ProductLink}>
        <div className={classes.Info}>
          <img src={product.imageUrls?.[0]} loading='lazy' />
          <h3>{product.productName}</h3>
        </div>
      </NavLink>
      <div className={classes.PriceAndQuantity}>
        <p>{product.price} ₽</p>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 1,
          }}
        >
          <Button
            sx={{
              color: 'white',
              borderColor: 'white',
            }}
            size='small'
            variant='outlined'
            onClick={() => updateItem(cartItemId, quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Typography variant='body2'>{quantity}</Typography>
          <Button
            sx={{
              color: 'white',
              borderColor: 'white',
            }}
            size='small'
            variant='outlined'
            onClick={() => updateItem(cartItemId, quantity + 1)}
          >
            +
          </Button>
          <Button
            size='small'
            color='error'
            onClick={() => removeItem(cartItemId)}
          >
            Удалить
          </Button>
        </Box>
      </div>
    </div>
  )
}
