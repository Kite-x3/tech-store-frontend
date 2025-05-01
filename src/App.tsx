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
        <ProductProvider>
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
                </Routes>
              </div>
              <Footer />
            </Router>
          </ReviewProvider>
        </ProductProvider>
      </AuthProvider>
    </div>
  )
}

export default App
