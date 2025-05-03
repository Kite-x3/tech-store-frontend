import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'
import { ProductCreateDto } from '../../interfaces/product'

export const ProductForm = () => {
  const navigate = useNavigate()
  const context = useContext(ProductContext)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newProduct, setNewProduct] = useState<ProductCreateDto>({
    price: 0,
    productName: '',
    description: '',
    categoryId: 0,
    images: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !newProduct.productName.trim() ||
      !newProduct.description.trim() ||
      !newProduct.price ||
      !newProduct.categoryId ||
      !newProduct.images
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
        categoryId: 0,
        images: [] as File[],
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
      <h3>Current Images</h3>
      <div>
        <h3>Images</h3>
        <input
          type='file'
          multiple
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files) {
              setNewProduct({
                ...newProduct,
                images: Array.from(e.target.files),
              })
            }
          }}
        />
        <div>
          {newProduct.images?.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      </div>
      <button type='submit'>Add Product</button>
      <button onClick={() => navigate('/')}>Back</button>
    </form>
  )
}
