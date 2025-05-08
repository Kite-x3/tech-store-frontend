import { NavLink } from 'react-router-dom'
import { Product } from '../../interfaces/product'
import classes from './ProductCard.module.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { useAuth } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'

export const ProductCard = ({
  id,
  imageUrls,
  productName,
  price,
  description,
}: Product) => {
  const { isAdmin } = useAuth()
  const context = useContext(ProductContext)
  const cartContext = useContext(CartContext)

  if (!context || !cartContext) return <div>No context available</div>

  const { addItem } = cartContext

  const { deleteProduct } = context

  const handleDelete = (id: number) => {
    const isConfirmed: boolean = window.confirm(
      'Are you sure you want to delete this product?'
    )
    if (isConfirmed) {
      deleteProduct(id)
    }
  }

  const handleAddToCart = () => {
    addItem(id, 1)
  }

  return (
    <div>
      {isAdmin && (
        <button
          className={classes.DeleteButton}
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      )}
      <div className={classes.Product}>
        <NavLink to={`/product/${id}`} className={classes.ProductLink}>
          <div className={classes.Info}>
            <img src={imageUrls?.[0]} loading='lazy' />
            <div className={classes.description}>
              <h2>{productName}</h2>
              <p>{description}</p>
            </div>
          </div>
        </NavLink>

        <div className={classes.Buying}>
          <strong>{price}₽</strong>
          <button onClick={handleAddToCart}>
            <AddShoppingCartIcon></AddShoppingCartIcon> Купить
          </button>
        </div>
      </div>
    </div>
  )
}
