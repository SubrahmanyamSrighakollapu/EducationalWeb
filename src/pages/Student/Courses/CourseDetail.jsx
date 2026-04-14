import { useParams, Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart, FaPlay, FaInfinity, FaMobile, FaCertificate } from 'react-icons/fa'
import { FiChevronRight, FiUsers, FiClock, FiGlobe, FiBarChart2, FiCheckCircle, FiCircle } from 'react-icons/fi'
import { COURSES } from '../../../data/courses'
import { useStore } from '../../../context/StoreContext'
import { useStudent } from '../../../context/StudentContext'

export default function StudentCourseDetail() {
  const { slug } = useParams()
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useStore()
  const { enroll, isEnrolled } = useStudent()
  const course = COURSES.find(c => c.slug === slug)

  if (!course) return (
    <div className="admin-empty" style={{ paddingTop: 80 }}>
      <h4>Course not found</h4>
      <Link to="/student/courses" className="btn-primary-sm" style={{ marginTop: 14 }}>Back to Courses</Link>
    </div>
  )

  const discount = Math.round((1 - course.price / course.original) * 100)
  const related  = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#aaa', marginBottom: 20 }}>
        <Link to="/student/courses" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Courses</Link>
        <FiChevronRight /><span>{course.category}</span><FiChevronRight />
        <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{course.title.slice(0, 30)}…</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Hero card */}
          <div className="admin-card" style={{ overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg,#0d1b2a,#1a3a5c)', padding: '28px 28px 24px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                {course.badge && <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#f7b731', color: '#fff', padding: '2px 10px', borderRadius: 20, textTransform: 'uppercase' }}>{course.badge}</span>}
                <span style={{ fontSize: '0.7rem', fontWeight: 700, background: 'rgba(36,89,159,0.4)', color: '#7eb8f7', padding: '2px 10px', borderRadius: 20 }}>{course.category}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', padding: '2px 10px', borderRadius: 20 }}>{course.level}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>{course.title}</h1>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>{course.subtitle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#f7b731', fontWeight: 700, fontSize: '0.88rem' }}>
                  <FaStar /> {course.rating} <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>({course.reviews?.toLocaleString()} reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)' }}><FiUsers /> {course.students} students</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)' }}><FiClock /> {course.hours}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)' }}><FiGlobe /> {course.language}</div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="admin-card">
            <div className="admin-card-header"><div><h3>About This Course</h3></div></div>
            <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: 20, alignItems: 'start' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', lineHeight: 1.8 }}>{course.about}</p>
              <img src={course.image} alt={course.title} style={{ width: '100%', borderRadius: 10, objectFit: 'cover', aspectRatio: '4/3' }} />
            </div>
          </div>

          {/* What you'll learn */}
          <div className="admin-card">
            <div className="admin-card-header"><div><h3>What You'll Learn</h3></div></div>
            <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {course.learns?.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: '0.87rem', color: 'var(--text-gray)' }}>
                  <FiCheckCircle style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements & Who for */}
          <div className="admin-card">
            <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 800, marginBottom: 12 }}>Requirements</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {course.requirements?.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.87rem', color: 'var(--text-gray)' }}>
                      <FiCircle style={{ fontSize: '0.5rem', flexShrink: 0, marginTop: 6 }} /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 800, marginBottom: 12 }}>Who This Is For</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {course.whoFor?.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.87rem', color: 'var(--text-gray)' }}>
                      <FiCircle style={{ fontSize: '0.5rem', flexShrink: 0, marginTop: 6 }} /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sticky card */}
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="admin-card" style={{ overflow: 'hidden' }}>
            <img src={course.image} alt={course.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '18px 20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-dark)' }}>₹{course.price}</span>
                <span style={{ fontSize: '0.95rem', color: '#bbb', textDecoration: 'line-through' }}>₹{course.original}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, background: '#e6faf2', color: '#1a9e5c', padding: '2px 8px', borderRadius: 20 }}>{discount}% off</span>
              </div>
              {isEnrolled(course.id) ? (
                <div style={{ background: '#e6faf2', color: '#1a9e5c', borderRadius: 10, padding: '13px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem', marginBottom: 10 }}>
                  ✓ Already Enrolled
                </div>
              ) : (
                <>
                  <button onClick={() => { enroll(course); addToCart(course) }}
                    style={{ width: '100%', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 10, padding: 13, fontSize: '0.97rem', fontWeight: 700, cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <FaPlay /> Enroll Now
                  </button>
                  <button onClick={() => addToCart(course)}
                    style={{ width: '100%', background: isInCart(course.id) ? '#26de81' : 'none', color: isInCart(course.id) ? '#fff' : 'var(--primary)', border: '1.5px solid', borderColor: isInCart(course.id) ? '#26de81' : 'var(--primary)', borderRadius: 10, padding: 11, fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <FaShoppingCart /> {isInCart(course.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button onClick={() => toggleWishlist(course)}
                    style={{ width: '100%', background: 'none', border: '1.5px solid', borderColor: isInWishlist(course.id) ? '#ff6b6b' : '#dde3ea', color: isInWishlist(course.id) ? '#ff6b6b' : 'var(--text-dark)', borderRadius: 10, padding: 11, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <FaHeart /> {isInWishlist(course.id) ? 'Saved' : 'Add to Wishlist'}
                  </button>
                </>
              )}
              <div style={{ borderTop: '1px solid #f0f3f7', paddingTop: 14, marginTop: 14 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 10 }}>This course includes:</div>
                {[[FaPlay, `${course.hours} on-demand video`],[FiBarChart2, course.level],[FaInfinity,'Lifetime access'],[FaMobile,'Mobile & desktop'],[FaCertificate,'Certificate']].map(([Icon, text], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: '0.82rem', color: 'var(--text-gray)', marginBottom: 7 }}>
                    <Icon style={{ color: 'var(--primary)', flexShrink: 0 }} /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="admin-card">
              <div className="admin-card-header"><div><h3>Related Courses</h3></div></div>
              <div style={{ padding: '8px 0' }}>
                {related.map(r => (
                  <Link key={r.id} to={`/student/courses/${r.slug}`} style={{ display: 'flex', gap: 12, padding: '10px 18px', textDecoration: 'none', borderBottom: '1px solid #f0f3f7' }}>
                    <img src={r.image} alt={r.title} style={{ width: 56, height: 40, borderRadius: 7, objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: 3 }}>{r.title.slice(0, 36)}…</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>₹{r.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
