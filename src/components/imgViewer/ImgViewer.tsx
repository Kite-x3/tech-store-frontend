import { useEffect, useState } from 'react'
import { Product } from '../../interfaces/product'
import classes from './ImgViewer.module.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export const ImgViewer = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  )
  useEffect(() => {
    if (product && product.imageUrls && product.imageUrls.length > 0) {
      setSelectedImage(product.imageUrls[0])
    }
  }, [product])

  const handleNext = () => {
    if (!product || !product.imageUrls || !selectedImage) return
    const currentIndex = product.imageUrls.indexOf(selectedImage)
    const nextIndex = (currentIndex + 1) % product.imageUrls.length
    setSelectedImage(product.imageUrls[nextIndex])
  }

  const handlePrev = () => {
    if (!product || !product.imageUrls || !selectedImage) return
    const currentIndex = product.imageUrls.indexOf(selectedImage)
    const prevIndex =
      (currentIndex - 1 + product.imageUrls.length) % product.imageUrls.length
    setSelectedImage(product.imageUrls[prevIndex])
  }
  return (
    <div className={classes.ImagesContainer}>
      <div className={classes.Thumbnails}>
        {product?.imageUrls.map((image, index) => (
          <img
            key={index}
            src={image}
            alt='thumbnail'
            className={image === selectedImage ? classes.SelectedThumbnail : ''}
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
  )
}
