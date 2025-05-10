import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { Footer } from './components/Layout/footer/Footer'
import { Header } from './components/Layout/header/Header'
import { ProductProvider } from './context/ProductContext'
import { ProductForm } from './components/productForm/ProductForm'
import { ProductPage } from './pages/ProductPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ReactElement } from 'react'
import { LoginPage } from './pages/LoginPage'
import { ReviewProvider } from './context/ReviewContext'
import { CategoryProvider } from './context/CategoryContext'
import { CategoryPage } from './pages/CategoryPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { CartProvider } from './context/CartContext'
import { CartPage } from './pages/CartPage'
import { OrderProvider } from './context/OrderContext'
import { OrdersPage } from './pages/OrderPage'

const ProtectedRoute = ({
  children,
  adminOnly = false,
}: {
  children: ReactElement
  adminOnly?: boolean
}) => {
  const { user, isAdmin } = useAuth()

  if (!user) {
    alert('Недостаточно прав. Выполните вход!')

    return <Navigate to='/' replace />
  } else if (adminOnly && !isAdmin) {
    alert('Недостаточно прав пользователя!')
    return <Navigate to='/' replace />
  }

  return children
}

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <ReviewProvider>
                  <Router basename='/'>
                    <Header />
                    <div className='Content'>
                      <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/product/:id' element={<ProductPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route
                          path='/product/add'
                          element={
                            <ProtectedRoute adminOnly>
                              <ProductForm />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path='/category/:Id'
                          element={<CategoryPage />}
                        />
                        <Route
                          path='/register'
                          element={<RegistrationPage />}
                        />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='/orders' element={<OrdersPage />} />
                      </Routes>
                    </div>
                    <Footer />
                  </Router>
                </ReviewProvider>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </div>
  )
}

export default App
