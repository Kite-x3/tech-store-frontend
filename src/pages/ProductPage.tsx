//import { useParams } from 'react-router-dom'
import { OneProduct } from '../helpers/OneProduct/OneProduct'
import { ProductDetails } from '../components/productDetails/ProductDetails'

export const ProductPage = () => {
  //const { id } = useParams()

  if (!OneProduct) {
    return <h2>Товар не найден</h2>
  }

  return <ProductDetails {...OneProduct} />
}
