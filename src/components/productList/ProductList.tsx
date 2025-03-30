import { useContext } from 'react'
import { ProductCard } from '../productCard/ProductCard'
import classes from './ProductList.module.css'
import { ProductContext } from '../../context/ProductContext'
import { useNavigate } from 'react-router-dom'

export const ProductList = ({ className = 'grid' }: { className?: string }) => {
  const context = useContext(ProductContext)
  const navigate = useNavigate()

  if (!context) return <div>No context available</div>

  const { products } = context

  return (
    <>
      <button onClick={() => navigate('product/add')}>Add new product</button>
      <section className={`${classes.ProductList} ${classes[className]}`}>
        {products.map((p, i) => {
          return (
            <>
              <ProductCard {...p} key={i}></ProductCard>
            </>
          )
        })}
      </section>
    </>
  )
}
