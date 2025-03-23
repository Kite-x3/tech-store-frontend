// MainPage.js
import { useState } from 'react'
import { ProductList } from '../components/productList/ProductList'
import { Products } from '../helpers/products/Products'
import { ViewToggle } from '../components/viewToggle/ViewToggle'

export const MainPage = () => {
  const [layout, setLayout] = useState('grid')

  return (
    <>
      <ViewToggle onChange={setLayout} />
      <ProductList products={Products} className={layout} />
    </>
  )
}
