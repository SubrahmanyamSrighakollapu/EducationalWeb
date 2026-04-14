import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// Providers
import { StoreProvider } from './context/StoreContext'
import { AuthProvider } from './context/auth/AuthContext'
import { StudentProvider } from './context/StudentContext'

// Marketing site layout
import Header from './components/Header'
import Footer from './components/Footer'

// Marketing pages
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import CourseDetail from './pages/Courses/CourseDetail'
import CartPage from './pages/Cart'
import WishlistPage from './pages/Wishlist'
import ContactPage from './pages/Contact'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import RefundPolicy from './pages/Legal/RefundPolicy'

// Auth pages
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

// Dashboard layouts
import AdminLayout from './layouts/AdminLayout'
import StudentLayout from './layouts/StudentLayout'

// Admin pages
import AdminDashboard from './pages/Admin/Dashboard'
import AdminCourses from './pages/Admin/Courses'
import AdminStudents from './pages/Admin/Students'
import AdminProfile from './pages/Admin/Profile'
import AdminReports from './pages/Admin/Reports'
import AdminSettings from './pages/Admin/Settings'

// Student pages
import StudentDashboard from './pages/Student/Dashboard'
import StudentCourses from './pages/Student/Courses'
import StudentCourseDetail from './pages/Student/Courses/CourseDetail'
import StudentMyCourses from './pages/Student/MyCourses'
import StudentCart from './pages/Student/Cart'
import StudentWishlist from './pages/Student/Wishlist'
import StudentCheckout from './pages/Student/Checkout'
import StudentProfile from './pages/Student/Profile'

import './App.css'
import './styles/animate.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Marketing site wrapper (with Header + Footer)
function MarketingLayout({ children }) {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-enter">
      <Header />
      <main>
        <ScrollToTop />
        {children}
      </main>
      <Footer />
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <Routes location={location}>

      {/* ── Marketing Site ── */}
      <Route path="/" element={<MarketingLayout><Home /></MarketingLayout>} />
      <Route path="/about" element={<MarketingLayout><About /></MarketingLayout>} />
      <Route path="/courses" element={<MarketingLayout><Courses /></MarketingLayout>} />
      <Route path="/courses/:slug" element={<MarketingLayout><CourseDetail /></MarketingLayout>} />
      <Route path="/cart" element={<MarketingLayout><CartPage /></MarketingLayout>} />
      <Route path="/wishlist" element={<MarketingLayout><WishlistPage /></MarketingLayout>} />
      <Route path="/contact" element={<MarketingLayout><ContactPage /></MarketingLayout>} />
      <Route path="/privacy-policy" element={<MarketingLayout><PrivacyPolicy /></MarketingLayout>} />
      <Route path="/terms-of-service" element={<MarketingLayout><TermsOfService /></MarketingLayout>} />
      <Route path="/refund-policy" element={<MarketingLayout><RefundPolicy /></MarketingLayout>} />

      {/* ── Auth (no Header/Footer) ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ── Admin Dashboard ── */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* ── Student Dashboard ── */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="courses/:slug" element={<StudentCourseDetail />} />
        <Route path="my-courses" element={<StudentMyCourses />} />
        <Route path="cart" element={<StudentCart />} />
        <Route path="wishlist" element={<StudentWishlist />} />
        <Route path="checkout" element={<StudentCheckout />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <StudentProvider>
            <AppRoutes />
          </StudentProvider>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
