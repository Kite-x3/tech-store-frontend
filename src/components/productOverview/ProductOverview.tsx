import { useContext, useEffect, useState } from 'react'
import { Product } from '../../interfaces/product'
import classes from './ProductOverview.module.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'
import ProductService from '../../services/ProductService'
import { ImgViewer } from '../imgViewer/ImgViewer'
import { useAuth } from '../../context/AuthContext'

export const ProductOverview = () => {
  const { isAdmin } = useAuth()
  const { id } = useParams<{ id: string }>()
  const context = useContext(ProductContext)
  const [product, setProduct] = useState<Product | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [formProduct, setFormProduct] = useState<Partial<Product> | null>(null)
  const [newImages, setNewImages] = useState<File[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const fetchProduct = async () => {
    if (id) {
      try {
        const fetchedProduct = await ProductService.getProductById(
          parseInt(id, 10)
        )
        setProduct(fetchedProduct)
        setFormProduct(fetchedProduct)
        setImagePreviews(fetchedProduct.imageUrls || [])
      } catch (error) {
        console.error('Failed to fetch product:', error)
        alert('Failed to load product details.')
      }
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setNewImages(files)

      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setImagePreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const handleImageDelete = (imageUrl: string) => {
    if (imageUrl.startsWith('blob:')) {
      setImagePreviews((prev) => prev.filter((img) => img !== imageUrl))
      setNewImages((prev) => {
        const index = imagePreviews.indexOf(imageUrl)
        return index !== -1
          ? prev.filter(
              (_, i) => i !== index - (imagePreviews.length - prev.length)
            )
          : prev
      })
    } else {
      setImagesToDelete((prev) => [...prev, imageUrl])
      setImagePreviews((prev) => prev.filter((img) => img !== imageUrl))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (context && formProduct && id && product?.id) {
      try {
        const updatedProduct = await context.updateProduct(parseInt(id, 10), {
          id: product.id,
          productName: formProduct.productName || '',
          description: formProduct.description || '',
          price: formProduct.price || 0,
          categoryId: formProduct.categoryId || 0,
          imageUrls: product?.imageUrls || [],
          newImages,
          imagesToDelete,
        })
        setProduct(updatedProduct)
        setEditMode(false)
        setNewImages([])
        setImagesToDelete([])
        setImagePreviews(updatedProduct.imageUrls || [])
      } catch (e) {
        console.error('Failed to update product:', e)
        alert('Failed to update product.')
      }
    }
  }

  if (!product) {
    return <div>Loading product details...</div>
  }

  return (
    <div className={classes.EditAndProductContainer}>
      {isAdmin && (
        <button
          className={classes.EditButton}
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
      )}

      {!editMode ? (
        <section className={classes.ProductOverview}>
          <h2>{product.productName}</h2>
          <div className={classes.ImagesAndDescription}>
            <ImgViewer product={product} />
            <div className={classes.Description}>
              <p>
                {`${product.description.slice(0, 100)}...`}
                <button className={classes.ShowMoreButton}>Подробнее</button>
              </p>
              <div className={classes.Buying}>
                <strong>Цена: {product.price} ₽</strong>
                <button className={classes.BuyButton}>
                  <AddShoppingCartIcon /> Купить
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <form onSubmit={handleSubmit} className={classes.ProductForm}>
          <div className={classes.FormGroup}>
            <label>Name</label>
            <input
              type='text'
              value={formProduct?.productName || ''}
              required
              onChange={(e) =>
                setFormProduct({ ...formProduct!, productName: e.target.value })
              }
            />
          </div>

          <div className={classes.FormGroup}>
            <label>Description</label>
            <textarea
              value={formProduct?.description || ''}
              required
              onChange={(e) =>
                setFormProduct({ ...formProduct!, description: e.target.value })
              }
            />
          </div>

          <div className={classes.FormGroup}>
            <label>Price</label>
            <input
              type='number'
              value={formProduct?.price || 0}
              required
              onChange={(e) =>
                setFormProduct({
                  ...formProduct!,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className={classes.FormGroup}>
            <label>Category ID</label>
            <input
              type='number'
              value={formProduct?.categoryId || 0}
              required
              onChange={(e) =>
                setFormProduct({
                  ...formProduct!,
                  categoryId: parseInt(e.target.value),
                })
              }
            />
          </div>

          <div className={classes.FormGroup}>
            <label>Product Images</label>
            <div className={classes.ImageGallery}>
              {imagePreviews.map((url, index) => (
                <div key={index} className={classes.ImageContainer}>
                  <img src={url} alt={`Preview ${index}`} />
                  <button
                    type='button'
                    className={classes.DeleteImageButton}
                    onClick={() => handleImageDelete(url)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={handleImageUpload}
            />
          </div>

          <div className={classes.FormActions}>
            <button
              type='button'
              onClick={() => {
                setEditMode(false)
                setImagePreviews(product.imageUrls || [])
                setNewImages([])
                setImagesToDelete([])
              }}
            >
              Cancel
            </button>
            <button type='submit'>Save Changes</button>
          </div>
        </form>
      )}
    </div>
  )
}
