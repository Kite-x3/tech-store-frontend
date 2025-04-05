import { useContext, useEffect, useState } from 'react'
import { Product } from '../../interfaces/product'
import classes from './ProductOverview.module.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'
import APIService from '../../services/APIService'

export const ProductOverview = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(ProductContext)
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [formProduct, setFormProduct] = useState<Product | null>(null)

  const fetchProduct = async () => {
    if (id) {
      try {
        const fetchedProduct: Product = await APIService.getProductById(
          parseInt(id, 10)
        )
        setProduct(fetchedProduct)
        setFormProduct(fetchedProduct)
      } catch (error) {
        console.error('Failed to fetch product:', error)
        alert('Failed to load product details.')
      }
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (context && formProduct) {
      try {
        const updatedProduct: Product = await context.updateProduct(
          formProduct.id,
          formProduct
        )
        setProduct(updatedProduct)
        setEditMode(false)
      } catch (e) {
        console.error('Failed to update product:', e)
        alert('Failed to update product.')
      }
    }
  }

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

  if (!product) {
    return <div>Loading product details...</div>
  }

  return (
    <div>
      <button onClick={() => setEditMode(true)}>Edit</button>
      <button onClick={() => navigate('/')}>Back</button>
      {!editMode ? (
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
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Name</h3>
            <input
              type='text'
              placeholder='Name'
              value={formProduct?.productName || ''}
              required
              onChange={(e) =>
                setFormProduct({ ...formProduct!, productName: e.target.value })
              }
            />
          </div>
          <div>
            <h3>Description</h3>
            <textarea
              placeholder='Description'
              value={formProduct?.description || ''}
              required
              onChange={(e) =>
                setFormProduct({ ...formProduct!, description: e.target.value })
              }
            />
          </div>
          <div>
            <h3>Price</h3>
            <input
              type='number'
              placeholder='Price'
              value={formProduct?.price || ''}
              required
              onChange={(e) =>
                setFormProduct({
                  ...formProduct!,
                  price: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div>
            <h3>CategoryId</h3>
            <input
              type='number'
              placeholder='CategoryId'
              value={formProduct?.categoryId || ''}
              required
              onChange={(e) =>
                setFormProduct({
                  ...formProduct!,
                  categoryId: parseInt(e.target.value),
                })
              }
            />
          </div>
          <button type='submit'>Save</button>
        </form>
      )}
    </div>
  )
}
