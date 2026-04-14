import { Link, useNavigate } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { FiTrash2, FiBookOpen } from 'react-icons/fi'
import { useStore } from '../../../context/StoreContext'
import { useStudent } from '../../../context/StudentContext'

export default function StudentWishlist() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useStore()
  const { isEnrolled } = useStudent()
  const navigate = useNavigate()

  return (
    <>
      <div className="admin-page-header">
        <div><h1>My Wishlist</h1><p>{wishlist.length} saved course{wishlist.length !== 1 ? 's' : ''}</p></div>
        {wishlist.length > 0 && <button className="btn-outline-sm" onClick={() => navigate('/student/courses')}><FiBookOpen /> Browse More</button>}
      </div>

      {wishlist.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <FaHeart />
            <h4>Your wishlist is empty</h4>
            <p>Save courses you love and come back to them anytime.</p>
            <button className="btn-primary-sm" style={{ marginTop: 14 }} onClick={() => navigate('/student/courses')}>Browse Courses</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {wishlist.map(course => (
            <div key={course.id} className="admin-card" style={{ overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(36,89,159,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}>
              <div style={{ position: 'relative' }}>
                <img src={course.image} alt={course.title} style={{ width: '100%', height: 155, objectFit: 'cover', display: 'block' }} />
                <button onClick={() => removeFromWishlist(course.id)}
                  style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: '#ff6b6b', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'background 0.18s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ff6b6b'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ff6b6b' }}>
                  <FiTrash2 />
                </button>
              </div>
              <div style={{ padding: '14px 16px 18px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 5 }}>{course.category}</div>
                <Link to={`/student/courses/${course.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: 5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.title}</div>
                </Link>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginBottom: 8 }}>by {course.instructor}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: '#f7b731', fontWeight: 700, marginBottom: 12 }}>
                  <FaStar /> {course.rating} <span style={{ color: '#aaa', fontWeight: 400 }}>({course.reviews?.toLocaleString()})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0f3f7', paddingTop: 12 }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)' }}>₹{course.price}</span>
                    <span style={{ fontSize: '0.78rem', color: '#bbb', textDecoration: 'line-through', marginLeft: 6 }}>₹{course.original}</span>
                  </div>
                  {isEnrolled(course.id) ? (
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#e6faf2', color: '#1a9e5c', padding: '5px 10px', borderRadius: 8 }}>Enrolled</span>
                  ) : (
                    <button onClick={() => addToCart(course)} className="btn-primary-sm" style={{ padding: '7px 14px', fontSize: '0.8rem', background: isInCart(course.id) ? '#26de81' : 'var(--primary)' }}>
                      <FaShoppingCart /> {isInCart(course.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
