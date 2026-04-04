import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaTag } from 'react-icons/fa'
import { FiTrash2, FiArrowRight, FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import './Cart.css'

export default function CartPage() {
  const { cart, removeFromCart, addToWishlist, isInWishlist, cartTotal, cartOriginalTotal, cartSavings } = useStore()
  const tax = Math.round(cartTotal * 0.18)
  const grandTotal = cartTotal + tax

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-inner">
          <h1 className="cart-page-title">My Cart</h1>
          <div className="cart-empty">
            <div className="cart-empty-icon"><FaShoppingCart /></div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any courses yet. Start exploring!</p>
            <Link to="/courses" className="cart-empty-btn">Browse Courses <FiArrowRight /></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h1 className="cart-page-title">My Cart</h1>
        <p className="cart-page-sub">{cart.length} course{cart.length > 1 ? 's' : ''} in your cart</p>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map(course => (
              <div key={course.id} className="cart-item">
                <img src={course.image} alt={course.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-category">{course.category}</div>
                  <div className="cart-item-title">{course.title}</div>
                  <div className="cart-item-instructor">by {course.instructor}</div>
                  <div className="cart-item-meta">
                    <span className="cart-item-rating">
                      <FaStar /> {course.rating}
                      <span style={{ color: '#aaa', fontWeight: 400 }}>({course.reviews?.toLocaleString()})</span>
                    </span>
                    <span className="cart-item-level">{course.level}</span>
                  </div>
                </div>
                <div className="cart-item-right">
                  <button className="cart-remove-btn" onClick={() => removeFromCart(course.id)} title="Remove">
                    <FiTrash2 />
                  </button>
                  <div>
                    <div className="cart-item-price">₹{course.price}</div>
                    <div className="cart-item-original">₹{course.original}</div>
                  </div>
                  {!isInWishlist(course.id) && (
                    <button className="cart-move-btn" onClick={() => addToWishlist(course)}>
                      <FiHeart /> Save for later
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            {cartSavings > 0 && (
              <div className="summary-discount-badge">
                <FaTag />
                You save ₹{cartSavings.toLocaleString()} on this order!
              </div>
            )}

            <div className="summary-row">
              <span>Subtotal ({cart.length} courses)</span>
              <span>₹{cartOriginalTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row savings">
              <span>Discount</span>
              <span>− ₹{cartSavings.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>

            <button className="checkout-btn">
              <FiShoppingBag style={{ marginRight: 8 }} /> Proceed to Checkout
            </button>
            <Link to="/courses" className="continue-btn">
              Continue Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
