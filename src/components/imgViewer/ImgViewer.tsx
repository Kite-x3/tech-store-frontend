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
    <div className={classes.ImagesContainer}>
      <div className={classes.Thumbnails}>
        {product?.img.map((image, index) => (
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
