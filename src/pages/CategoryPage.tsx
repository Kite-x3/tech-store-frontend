import { useState } from 'react'
import { ViewToggle } from '../components/viewToggle/ViewToggle'
import { FilteredProductList } from '../components/FiltredProductList/FilteredProductList'

export const CategoryPage = () => {
  const [layout, setLayout] = useState('grid')

  return (
    <>
      <ViewToggle onChange={setLayout} />
      <FilteredProductList className={layout} />
    </>
  )
}
