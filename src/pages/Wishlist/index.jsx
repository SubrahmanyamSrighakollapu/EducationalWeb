import { Link } from 'react-router-dom'
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FiArrowRight, FiTrash2 } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import './Wishlist.css'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useStore()

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-inner">
          <h1 className="wishlist-page-title">My Wishlist</h1>
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon"><FaHeart /></div>
            <h3>Your wishlist is empty</h3>
            <p>Save courses you love and come back to them anytime.</p>
            <Link to="/courses" className="wishlist-empty-btn">Browse Courses <FiArrowRight /></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-inner">
        <h1 className="wishlist-page-title">My Wishlist</h1>
        <p className="wishlist-page-sub">{wishlist.length} saved course{wishlist.length > 1 ? 's' : ''}</p>

        <div className="wishlist-grid">
          {wishlist.map(course => (
            <div key={course.id} className="wl-card">
              <div className="wl-card-img-wrap">
                <img src={course.image} alt={course.title} className="wl-card-img" />
                <button className="wl-remove-btn" onClick={() => removeFromWishlist(course.id)} title="Remove from wishlist">
                  <FiTrash2 />
                </button>
              </div>
              <div className="wl-card-body">
                <div className="wl-card-category">{course.category}</div>
                <div className="wl-card-title">{course.title}</div>
                <div className="wl-card-instructor">by {course.instructor}</div>
                <div className="wl-card-rating">
                  <FaStar /> {course.rating}
                  <span>({course.reviews?.toLocaleString()})</span>
                </div>
                <div className="wl-card-footer">
                  <div className="wl-price-wrap">
                    <span className="wl-price-now">₹{course.price}</span>
                    <span className="wl-price-old">₹{course.original}</span>
                  </div>
                  <button
                    className={`wl-cart-btn${isInCart(course.id) ? ' added' : ''}`}
                    onClick={() => addToCart(course)}
                    disabled={isInCart(course.id)}
                  >
                    <FaShoppingCart />
                    {isInCart(course.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
