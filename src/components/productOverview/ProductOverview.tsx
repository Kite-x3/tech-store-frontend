import { useContext, useEffect, useState } from 'react'
import { Product } from '../../interfaces/product'
import classes from './ProductOverview.module.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'

export const ProductOverview = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(ProductContext)
  const Navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const foundProduct = context?.products.find(
      (product) => product.id === parseInt(id || '', 10)
    )
    setProduct(
      foundProduct ? { ...foundProduct, img: foundProduct.img || [] } : null
    )
  }, [context, id])

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  )
  useEffect(() => {
    if (product) {
      setSelectedImage(product.img[0])
    }
  }, [product])

  const handleNext = () => {
    if (!product || !product.img || !selectedImage) return
    const currentIndex = product.img.indexOf(selectedImage)
    const nextIndex = (currentIndex + 1) % product.img.length
    setSelectedImage(product.img[nextIndex])
  }

  const handlePrev = () => {
    if (!product || !product.img || !selectedImage) return
    const currentIndex = product.img.indexOf(selectedImage)
    const prevIndex =
      (currentIndex - 1 + product.img.length) % product.img.length
    setSelectedImage(product.img[prevIndex])
  }

  return (
    <section className={classes.ProductOverview}>
      <h2>{product?.productName}</h2>
      <div className={classes.ImagesAndDescription}>
        <div className={classes.ImagesContainer}>
          <div className={classes.Thumbnails}>
            {product?.img.map((image, index) => (
              <img
                key={index}
                src={image}
                alt='thumbnail'
                className={
                  image === selectedImage ? classes.SelectedThumbnail : ''
                }
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className={classes.MainImageContainer}>
            <button className={classes.PrevButton} onClick={handlePrev}>
              <NavigateBeforeIcon />
            </button>
            <img
              src={selectedImage}
              alt='product image'
              className={classes.MainImage}
            />
            <button className={classes.NextButton} onClick={handleNext}>
              <NavigateNextIcon />
            </button>
          </div>
        </div>
        <div className={classes.Description}>
          <p>
            {`${product?.description.slice(0, 100)}...`}
            <button className={classes.ShowMoreButton}>Подробнее</button>
          </p>
          <div className={classes.Buying}>
            <strong>Цена: {product?.price} ₽</strong>
            <button className={classes.BuyButton}>
              <AddShoppingCartIcon></AddShoppingCartIcon> Купить
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
