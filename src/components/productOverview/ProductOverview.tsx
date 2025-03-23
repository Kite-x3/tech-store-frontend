import { useState } from 'react'
import { Product } from '../../interfaces/product'
import classes from './ProductOverview.module.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

export const ProductOverview = ({
  id,
  price,
  productName,
  description,
  img,
}: Product) => {
  const [selectedImage, setSelectedImage] = useState(img[0])

  const handleNext = () => {
    const currentIndex = img.indexOf(selectedImage)
    const nextIndex = (currentIndex + 1) % img.length
    setSelectedImage(img[nextIndex])
  }

  const handlePrev = () => {
    const currentIndex = img.indexOf(selectedImage)
    const prevIndex = (currentIndex - 1 + img.length) % img.length
    setSelectedImage(img[prevIndex])
  }
  return (
    <section className={classes.ProductOverview}>
      <h2>{productName}</h2>
      <div className={classes.ImagesAndDescription}>
        <div className={classes.ImagesContainer}>
          <div className={classes.Thumbnails}>
            {img.map((image, index) => (
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
              alt='product'
              className={classes.MainImage}
            />
            <button className={classes.NextButton} onClick={handleNext}>
              <NavigateNextIcon />
            </button>
          </div>
        </div>
        <div className={classes.Description}>
          <p>
            {`${description.slice(0, 100)}...`}
            <button className={classes.ShowMoreButton}>Подробнее</button>
          </p>
          <div className={classes.Buying}>
            <strong>Цена: {price} ₽</strong>
            <button className={classes.BuyButton}>
              <AddShoppingCartIcon></AddShoppingCartIcon> Купить
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
