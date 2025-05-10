import { useContext, useEffect } from 'react'
import { ProductCard } from '../productCard/ProductCard'
import classes from './ProductList.module.css'
import { ProductContext } from '../../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const ProductList = ({ className = 'grid' }: { className?: string }) => {
  const { isAdmin = false } = useAuth()
  const context = useContext(ProductContext)
  const navigate = useNavigate()

  if (!context) return <div>No context available</div>

  const { products, fetchMainPageProducts } = context

  useEffect(() => {
    fetchMainPageProducts()
  }, [])

  return (
    <>
      {isAdmin && (
        <button
          className={classes.AddProductButton}
          onClick={() => navigate('product/add')}
        >
          Add new product
        </button>
      )}
      <section className={`${classes.ProductList} ${classes[className]}`}>
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </section>
    </>
  )
}
