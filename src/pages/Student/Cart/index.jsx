import { Link, useNavigate } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaTag } from 'react-icons/fa'
import { FiTrash2, FiArrowRight, FiHeart, FiShoppingBag, FiBookOpen } from 'react-icons/fi'
import { useStore } from '../../../context/StoreContext'

export default function StudentCart() {
  const { cart, removeFromCart, addToWishlist, isInWishlist, cartTotal, cartOriginalTotal, cartSavings } = useStore()
  const navigate = useNavigate()
  const tax = Math.round(cartTotal * 0.18)
  const grandTotal = cartTotal + tax

  return (
    <>
      <div className="admin-page-header">
        <div><h1>My Cart</h1><p>{cart.length} course{cart.length !== 1 ? 's' : ''} in your cart</p></div>
        {cart.length > 0 && <button className="btn-outline-sm" onClick={() => navigate('/student/courses')}><FiBookOpen /> Browse More</button>}
      </div>

      {cart.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <FaShoppingCart />
            <h4>Your cart is empty</h4>
            <p>Add courses to your cart to proceed with enrollment.</p>
            <button className="btn-primary-sm" style={{ marginTop: 14 }} onClick={() => navigate('/student/courses')}>Browse Courses</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 22, alignItems: 'start' }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cart.map(course => (
              <div key={course.id} className="admin-card" style={{ display: 'flex', gap: 16, padding: '16px 20px', alignItems: 'flex-start' }}>
                <img src={course.image} alt={course.title} style={{ width: 110, height: 76, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 4 }}>{course.category}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.93rem', color: 'var(--text-dark)', marginBottom: 4, lineHeight: 1.4 }}>{course.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginBottom: 8 }}>by {course.instructor}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#f7b731', fontWeight: 700 }}><FaStar /> {course.rating}</span>
                    <span style={{ fontSize: '0.72rem', background: '#e8f0ff', color: 'var(--primary)', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>{course.level}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => removeFromCart(course.id)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '1rem', padding: 4, borderRadius: 6, display: 'flex', transition: 'color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff6b6b'} onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                    <FiTrash2 />
                  </button>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-dark)' }}>₹{course.price}</div>
                    <div style={{ fontSize: '0.78rem', color: '#bbb', textDecoration: 'line-through' }}>₹{course.original}</div>
                  </div>
                  {!isInWishlist(course.id) && (
                    <button onClick={() => addToWishlist(course)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <FiHeart /> Save for later
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="admin-card" style={{ padding: '22px 20px', position: 'sticky', top: 80 }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #f0f3f7' }}>Order Summary</h3>
            {cartSavings > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e6faf2', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: '0.82rem', color: '#1a9e5c', fontWeight: 600 }}>
                <FaTag /> You save ₹{cartSavings.toLocaleString()}!
              </div>
            )}
            {[['Subtotal', `₹${cartOriginalTotal.toLocaleString()}`],['Discount', `− ₹${cartSavings.toLocaleString()}`],['GST (18%)', `₹${tax.toLocaleString()}`]].map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.87rem', color: i === 1 ? '#26de81' : 'var(--text-gray)', fontWeight: i === 1 ? 600 : 400, marginBottom: 10 }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', borderTop: '1px solid #f0f3f7', paddingTop: 14, marginTop: 6, marginBottom: 18 }}>
              <span>Total</span><span>₹{grandTotal.toLocaleString()}</span>
            </div>
            <button className="btn-primary-sm" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: '0.97rem' }} onClick={() => navigate('/student/checkout')}>
              <FiShoppingBag /> Proceed to Checkout
            </button>
            <Link to="/student/courses" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, padding: 11, border: '1.5px solid #dde3ea', borderRadius: 10, fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', textDecoration: 'none', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#dde3ea'}>
              Continue Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
