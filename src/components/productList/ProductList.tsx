import { Product } from '../../interfaces/product'
import { ProductCard } from '../productCard/ProductCard'
import classes from './ProductList.module.css'

export const ProductList = ({
  products,
  className = 'grid',
}: {
  products: Product[]
  className?: string
}) => {
  return (
    <section className={`${classes.ProductList} ${classes[className]}`}>
      {products.map((p, i) => {
        return <ProductCard {...p} key={i}></ProductCard>
      })}
    </section>
  )
}
