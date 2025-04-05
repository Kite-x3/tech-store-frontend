import classes from './ProductDetails.module.css'
import { Product } from '../../interfaces/product'
import { ProductOverview } from '../productOverview/ProductOverview'
import { ProductFullDescription } from '../productFullDescription/ProductFullDescription'
import { ProductReviews } from '../productReviews/ProductReviews'

export const ProductDetails = (product: Product) => {
  return (
    <div className={classes.ProductDetails}>
      <ProductOverview></ProductOverview>
      <ProductFullDescription product={product}></ProductFullDescription>
      {/*       <ProductReviews reviews={product.reviews ?? []} /> */}
    </div>
  )
}
