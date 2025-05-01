import classes from './ProductDetails.module.css'
import { ProductOverview } from '../productOverview/ProductOverview'
import { ProductFullDescription } from '../productFullDescription/ProductFullDescription'
import { ProductReviews } from '../productReviews/ProductReviews'

export const ProductDetails = () => {
  return (
    <div className={classes.ProductDetails}>
      <ProductOverview></ProductOverview>
      {/* <ProductFullDescription product={product}></ProductFullDescription> */}
      <ProductReviews />
    </div>
  )
}
