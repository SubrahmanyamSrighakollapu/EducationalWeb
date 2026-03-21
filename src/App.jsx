import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import ContactPage from './pages/Contact'
import './App.css'
import './styles/animate.css'

function PageWrapper({ children }) {
  const location = useLocation()
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove('page-enter')
      void ref.current.offsetWidth // reflow to restart animation
      ref.current.classList.add('page-enter')
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return <div ref={ref} className="page-enter">{children}</div>
}

function AppRoutes() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </PageWrapper>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
