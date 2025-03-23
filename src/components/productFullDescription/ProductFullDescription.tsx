import { Product } from '../../interfaces/product'
import classes from './ProductFullDescription.module.css'

export const ProductFullDescription = ({ product }: { product: Product }) => {
  if (!product.fullDescription && !product.specifications) return null

  return (
    <section className={classes.ProductFullDescription}>
      {product.fullDescription && (
        <div>
          <h3>Описание</h3>
          <p>{product.fullDescription}</p>
        </div>
      )}

      {product.specifications && product.specifications.length > 0 && (
        <div>
          <h3>Технические характеристики</h3>
          <ul className={classes.SpecificationList}>
            {product.specifications.map((spec, index) => (
              <li key={index} className={classes.Specification}>
                <strong className={classes.SpecificationTitle}>
                  {spec.name}
                </strong>
                <span className={classes.SpecificationValue}>{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
