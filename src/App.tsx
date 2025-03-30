import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { ProductProvider } from './context/ProductContext'
import { ProductForm } from './components/productForm/ProductForm'
import { ProductOverview } from './components/productOverview/ProductOverview'

function App() {
  return (
    <div className='App'>
      <ProductProvider>
        <Router basename='/'>
          <Header />
          <div className='Content'>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/product/:id' element={<ProductOverview />} />
              <Route path='/product/add' element={<ProductForm />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ProductProvider>
    </div>
  )
}

export default App
