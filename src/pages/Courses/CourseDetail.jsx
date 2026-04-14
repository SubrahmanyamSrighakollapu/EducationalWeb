import { useParams, Link, NavLink } from 'react-router-dom'
import { FaStar, FaHeart, FaPlay, FaInfinity, FaMobile, FaCertificate, FaShoppingCart } from 'react-icons/fa'
import { FiArrowLeft, FiChevronRight, FiUsers, FiClock, FiGlobe, FiBarChart2, FiCheckCircle, FiCircle } from 'react-icons/fi'
import { COURSES } from '../../data/courses'
import { useStore } from '../../context/StoreContext'
import './CourseDetail.css'

const REVIEWS = [
  { name: 'Rahul Sharma',  initials: 'RS', text: 'We are completely changed my career trajectory. The Web Development Bootcamp was incredibly practical I landed a job within 3 months of completing it.' },
  { name: 'Priya Mehta',   initials: 'PM', text: 'We are completely changed my career trajectory. The Web Development Bootcamp was incredibly practical I landed a job within 3 months of completing it.' },
  { name: 'Arjun Nair',    initials: 'AN', text: 'We are completely changed my career trajectory. The Web Development Bootcamp was incredibly practical I landed a job within 3 months of completing it.' },
]

export default function CourseDetail() {
  const { slug } = useParams()
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useStore()
  const course = COURSES.find(c => c.slug === slug)

  if (!course) {
    return (
      <div className="cd-not-found">
        <h2>Course Not Found</h2>
        <p>The course you are looking for does not exist.</p>
        <NavLink to="/courses" className="cd-back-btn"><FiArrowLeft /> Back to Courses</NavLink>
      </div>
    )
  }

  const related = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3)
  const discount = Math.round((1 - course.price / course.original) * 100)

  return (
    <>
      {/* ── Hero ── */}
      <section className="cd-hero">
        <div className="cd-hero-inner">
          {/* Left */}
          <div>
            <div className="cd-breadcrumb">
              <Link to="/courses">Courses</Link>
              <FiChevronRight />
              <span>{course.category}</span>
              <FiChevronRight />
              <span>{course.title.slice(0, 30)}…</span>
            </div>

            <div className="cd-badges">
              {course.badge && <span className={`cd-badge ${course.badge}`}>{course.badge}</span>}
              <span className="cd-badge cat">{course.category}</span>
              <span className="cd-badge level">{course.level}</span>
            </div>

            <h1 className="cd-hero-title">{course.title}</h1>
            <p className="cd-hero-subtitle">{course.subtitle}</p>

            <div className="cd-hero-meta">
              <div className="cd-rating-row">
                <div className="stars">
                  {[1,2,3,4,5].map(i => <FaStar key={i} style={{ opacity: i <= Math.round(course.rating) ? 1 : 0.3 }} />)}
                </div>
                <strong>{course.rating}</strong>
                <span className="rev">({course.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="cd-meta-item"><FiUsers /> {course.students} students</div>
              <div className="cd-meta-item"><FiClock /> {course.hours} total</div>
              <div className="cd-meta-item"><FiGlobe /> {course.language}</div>
            </div>

            <div className="cd-instructor-row">
              <img src={course.avatar} alt={course.instructor} />
              <span>by <strong>{course.instructor}</strong></span>
            </div>
          </div>

          {/* Right — enroll card */}
          <div className="cd-enroll-card">
            <img src={course.image} alt={course.title} className="cd-card-img" />
            <div className="cd-card-body">
              <div className="cd-card-price">
                <span className="cd-price-now">₹{course.price}</span>
                <span className="cd-price-old">₹{course.original}</span>
                <span className="cd-discount">{discount}% off</span>
              </div>
              <button
                className="cd-enroll-btn"
                onClick={() => addToCart(course)}
                style={isInCart(course.id) ? { background: '#26de81' } : {}}
              >
                <FaShoppingCart style={{ marginRight: 8 }} />
                {isInCart(course.id) ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                className="cd-wishlist-btn"
                onClick={() => toggleWishlist(course)}
                style={isInWishlist(course.id) ? { borderColor: '#ff6b6b', color: '#ff6b6b' } : {}}
              >
                <FaHeart style={{ marginRight: 6, color: isInWishlist(course.id) ? '#ff6b6b' : '#ff6b6b' }} />
                {isInWishlist(course.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
              <div className="cd-card-includes">
                <h5>This course includes:</h5>
                {[
                  [FaPlay,        `${course.hours} on-demand video`],
                  [FiBarChart2,   `${course.level} level`],
                  [FaInfinity,    'Full lifetime access'],
                  [FaMobile,      'Access on mobile & desktop'],
                  [FaCertificate, 'Certificate of completion'],
                ].map(([Icon, text], i) => (
                  <div key={i} className="cd-include-item"><Icon /> {text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="cd-body">
        <div className="cd-body-inner">
          {/* Main content */}
          <div>
            {/* About */}
            <div className="cd-section">
              <h2>{course.category}</h2>
              <div className="cd-about-grid">
                <p>{course.about}</p>
                <img src={course.image} alt={course.title} className="cd-about-img" />
              </div>
            </div>

            {/* What you'll learn */}
            <div className="cd-section">
              <h2>What You'll Learn</h2>
              <div className="cd-two-col">
                {course.learns.map((item, i) => (
                  <div key={i} className="cd-list-item">
                    <FiCheckCircle /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Who this is for */}
            <div className="cd-section">
              <div className="cd-req-who">
                <div className="cd-sub-section">
                  <h3>Requirements</h3>
                  <div className="cd-one-col">
                    {course.requirements.map((item, i) => (
                      <div key={i} className="cd-list-item"><FiCircle style={{ fontSize: '0.5rem' }} /> {item}</div>
                    ))}
                  </div>
                </div>
                <div className="cd-sub-section">
                  <h3>Who This Is For</h3>
                  <div className="cd-one-col">
                    {course.whoFor.map((item, i) => (
                      <div key={i} className="cd-list-item"><FiCircle style={{ fontSize: '0.5rem' }} /> {item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="cd-sidebar-sticky">
            {/* Course stats */}
            <div className="cd-sidebar-card">
              <h4>Course Details</h4>
              {[
                [FiClock,    'Duration',  course.hours],
                [FiBarChart2,'Level',     course.level],
                [FiUsers,    'Students',  course.students],
                [FaStar,     'Rating',    `${course.rating} / 5`],
                [FiGlobe,    'Language',  course.language],
                [FaCertificate, 'Certificate', 'Yes, included'],
              ].map(([Icon, label, val], i) => (
                <div key={i} className="cd-course-stat">
                  <span><Icon /> {label}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>

            {/* Related courses */}
            {related.length > 0 && (
              <div className="cd-sidebar-card">
                <h4>Related Courses</h4>
                {related.map(r => (
                  <Link key={r.id} to={`/courses/${r.slug}`} className="cd-related-item">
                    <img src={r.image} alt={r.title} className="cd-related-img" />
                    <div className="cd-related-info">
                      <div className="cd-related-title">{r.title}</div>
                      <div className="cd-related-price">₹{r.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="cd-testimonials">
        <div className="cd-testimonials-inner">
          <h2>What Our Students Say</h2>
          <p>Real stories from real learners who transformed their careers with EduSpark.</p>
          <div className="cd-reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="cd-review-card">
                <div className="cd-review-stars">{[1,2,3,4,5].map(s => <FaStar key={s} />)}</div>
                <p className="cd-review-text">"{r.text}"</p>
                <div className="cd-reviewer">
                  <div className="cd-reviewer-avatar">{r.initials}</div>
                  <div>
                    <div className="cd-reviewer-name">{r.name}</div>
                    <div className="cd-reviewer-course">{course.title.slice(0, 28)}…</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
