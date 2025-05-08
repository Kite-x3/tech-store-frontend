import { Box, Button, Divider, Modal, Typography, Badge } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import classes from './ShoppingCartModal.module.css'
import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext'

export const ShoppingCartModal = ({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean
  setIsCartOpen: (x: boolean) => void
}) => {
  const context = useContext(CartContext)

  if (!context) return <div>No context available</div>

  const { cart, removeItem, updateItem } = context

  const navigate = useNavigate()

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25vw',
    bgcolor: 'background.paper',
    p: 3,
    borderRadius: '1rem',
  }

  const totalItems =
    cart?.items.reduce((total, item) => total + item.quantity, 0) || 0
  const totalPrice =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0

  return (
    <>
      <Badge badgeContent={totalItems} color='error' overlap='circular'>
        <button
          onClick={() => setIsCartOpen(true)}
          className={classes.ShoppingCart}
        >
          Корзина
          <ShoppingCartIcon></ShoppingCartIcon>
        </button>
      </Badge>

      <Modal
        className={classes.ShopingCartModal}
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        aria-labelledby='cart-modal-title'
        aria-describedby='cart-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography
            id='cart-modal-title'
            variant='h6'
            component='h2'
            fontWeight='bold'
          >
            Ваша корзина
          </Typography>

          <Box sx={{ maxHeight: '50vh', overflowY: 'auto', mb: 2 }}>
            {cart?.items && cart.items.length > 0 ? (
              cart.items.map((item) => (
                <Box
                  key={item.cartItemId}
                  sx={{
                    p: 2,
                    backgroundColor: 'background.default',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography fontWeight='medium'>
                      {item.product.productName}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() =>
                          updateItem(item.cartItemId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Typography variant='body2'>{item.quantity}</Typography>
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() =>
                          updateItem(item.cartItemId, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        size='small'
                        color='error'
                        onClick={() => removeItem(item.cartItemId)}
                      >
                        Удалить
                      </Button>
                    </Box>
                  </Box>
                  <Typography>
                    {(item.product.price * item.quantity).toFixed(2)} ₽
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography
                sx={{ textAlign: 'center', py: 3 }}
                color='text.secondary'
              >
                Корзина пуста
              </Typography>
            )}
          </Box>

          {cart?.items && cart.items.length > 0 && (
            <Typography
              sx={{
                mt: 2,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textAlign: 'right',
              }}
            >
              Итого: {totalPrice.toFixed(2)} ₽
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
          >
            <Button
              variant='outlined'
              onClick={() => navigate('/orders')}
              fullWidth
            >
              История заказов
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                navigate('/cart')
                setIsCartOpen(false)
              }}
              disabled={!cart?.items || cart.items.length === 0}
              fullWidth
            >
              Перейти к корзине
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
