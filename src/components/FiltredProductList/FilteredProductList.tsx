import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Slider,
} from '@mui/material'
import { ProductQueryParams } from '../../interfaces/product'
import { ProductCard } from '../productCard/ProductCard'
import classes from './FilteredProductList.module.css'
import { useParams } from 'react-router-dom'

export const FilteredProductList = ({
  className = 'grid',
}: {
  className?: string
}) => {
  const { Id } = useParams()
  const categoryId = Id ? parseInt(Id) : undefined
  const context = useContext(ProductContext)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<ProductQueryParams>({
    pageNumber: 1,
    pageSize: 2,
    categoryId,
    sortBy: 'name',
    sortDescending: false,
    minPrice: 0,
    maxPrice: 500000,
  })

  if (!context) {
    return <div>Loading...</div>
  }

  const { paginatedProducts, getProductsByFilter } = context

  useEffect(() => {
    setPage(1)
    setQuery((prev) => ({
      ...prev,
      categoryId: Id ? parseInt(Id) : undefined,
      pageNumber: 1,
    }))
  }, [Id])

  useEffect(() => {
    getProductsByFilter(query)
  }, [query])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
    setQuery((prev) => ({ ...prev, pageNumber: value }))
  }

  const handleSortChange = (event: SelectChangeEvent) => {
    setQuery((prev) => ({
      ...prev,
      sortBy: event.target.value,
      pageNumber: 1,
    }))
    setPage(1)
  }

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    setQuery((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      pageNumber: 1,
    }))
    setPage(1)
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Filters}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Сортировка</InputLabel>
          <Select
            value={query.sortBy}
            label='Сортировка'
            onChange={handleSortChange}
            sx={{
              color: '#ffffff',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#979797',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#979797',
              },
              '.MuiSvgIcon-root': {
                color: '#ffffff',
              },
            }}
          >
            <MenuItem value='name'>По названию</MenuItem>
            <MenuItem value='price'>По цене</MenuItem>
            <MenuItem value='createdAt'>По новизне</MenuItem>
          </Select>
        </FormControl>

        <div className={classes.PriceFilter}>
          <h4 className={classes.PriceTitle}>Цена, ₽</h4>
          <Slider
            value={[query.minPrice || 0, query.maxPrice || 500000]}
            onChange={handlePriceChange}
            valueLabelDisplay='auto'
            min={0}
            max={500000}
            step={1000}
            sx={{
              width: '90%',
              margin: '0 auto',
              color: '#979797',
              '.MuiSlider-valueLabel': {
                backgroundColor: '#393939',
                color: '#ffffff',
              },
            }}
          />
          <div className={classes.PriceValues}>
            <span>{query.minPrice} ₽</span>
            <span>{query.maxPrice} ₽</span>
          </div>
        </div>
      </div>
      <div>
        <div className={`${classes.ProductList} ${classes[className]}`}>
          {paginatedProducts?.items.map((product) => (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {paginatedProducts && paginatedProducts.totalCount > 0 && (
          <Pagination
            count={Math.ceil(
              paginatedProducts.totalCount / (query.pageSize || 10)
            )}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        )}
      </div>
    </div>
  )
}
