import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'

interface newProduct {
  price: number
  productName: string
  description: string
  img: string[]
  categoryId: number
}

export const ProductForm = () => {
  const navigate = useNavigate()
  const context = useContext(ProductContext)

  const [newProduct, setNewProduct] = useState<newProduct>({
    price: 0,
    productName: '',
    description: '',
    img: [],
    categoryId: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !newProduct.productName.trim() ||
      !newProduct.description.trim() ||
      !newProduct.price ||
      !newProduct.categoryId
    ) {
      alert('please fill all required fields')
      return
    }
    if (context) {
      context.addProduct({ ...newProduct })

      setNewProduct({
        price: 0,
        productName: '',
        description: '',
        img: [],
        categoryId: 0,
      })

      navigate('/')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Product</h2>
      <div>
        <h3>Name</h3>
        <input
          type='text'
          placeholder='Name'
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, productName: e.target.value })
          }
        />
      </div>
      <div>
        <h3>Description</h3>
        <textarea
          placeholder='Description'
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
      </div>
      <div>
        <h3>Price</h3>
        <input
          type='number'
          placeholder='Price'
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <h3>CategoryId</h3>
        <input
          type='number'
          placeholder='CategoryId'
          required
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              categoryId: parseInt(e.target.value),
            })
          }
        />
      </div>
      <button type='submit'>Add Product</button>
      <button onClick={() => navigate('/')}>Back</button>
    </form>
  )
}
