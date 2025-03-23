import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { ProductPage } from './pages/ProductPage'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'

function App() {
  return (
    <div className='App'>
      <Router basename='/'>
        <Header />
        <div className='Content'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
