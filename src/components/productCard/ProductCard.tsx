import { NavLink } from 'react-router-dom'
import { Product } from '../../interfaces/product'
import classes from './ProductCard.module.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

export const ProductCard = ({
  id,
  img,
  productName,
  price,
  description,
}: Product) => {
  return (
    <div className={classes.Product}>
      <NavLink to={`/product/${id}`} className={classes.ProductLink}>
        <div className={classes.Info}>
          <img src={img[0]} />
          <div className={classes.description}>
            <h2>{productName}</h2>
            <p>{description}</p>
          </div>
        </div>
      </NavLink>

      <div className={classes.Buying}>
        <strong>{price}$</strong>
        <button>
          <AddShoppingCartIcon></AddShoppingCartIcon> Купить
        </button>
      </div>
    </div>
  )
}
