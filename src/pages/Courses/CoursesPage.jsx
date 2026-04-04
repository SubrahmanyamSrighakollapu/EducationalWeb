import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaTh, FaLayerGroup, FaClock, FaTag, FaGlobe } from 'react-icons/fa'
import { COURSES as ALL_COURSES } from '../../data/courses'
import { useStore } from '../../context/StoreContext'
import './CoursesPage.css'

const CATEGORIES = ['Design', 'Development', 'Marketing']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const DURATIONS = ['0-3 Hours', '3-10 Hours', '10+ Hours']
const PRICE_OPTS = ['Free', 'Paid']
const PER_PAGE = 9

const catCount = (cat) => ALL_COURSES.filter(c => c.category === cat).length

export default function CoursesPage() {
  const [selCats, setSelCats] = useState([])
  const [selLevels, setSelLevels] = useState([])
  const [selDurations, setSelDurations] = useState([])
  const [selPrice, setSelPrice] = useState('')
  const [sort, setSort] = useState('popular')
  const [page, setPage] = useState(1)
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useStore()

  const toggle = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val])

  const filtered = useMemo(() => {
    let list = [...ALL_COURSES]
    if (selCats.length) list = list.filter(c => selCats.includes(c.category))
    if (selLevels.length) list = list.filter(c => selLevels.includes(c.level))
    if (selDurations.length) list = list.filter(c => selDurations.includes(c.duration))
    if (selPrice === 'Free') list = list.filter(c => c.price === 0)
    if (selPrice === 'Paid') list = list.filter(c => c.price > 0)
    if (sort === 'popular') list.sort((a, b) => b.reviews - a.reviews)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'newest') list.sort((a, b) => b.id - a.id)
    return list
  }, [selCats, selLevels, selDurations, selPrice, sort])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const clearAll = () => {
    setSelCats([]); setSelLevels([]); setSelDurations([]); setSelPrice(''); setPage(1)
  }

  const handleFilter = (setter, arr, val) => {
    toggle(arr, setter, val)
    setPage(1)
  }

  const pageNums = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push('...')
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
      if (page < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <section className="courses-page">
      <div className="courses-page-inner">
        <div className="courses-page-header">
          <h1>Explore All Courses</h1>
          <p>Master new skills with industry-led online courses designed for your career growth.</p>
        </div>

        <div className="courses-layout">
          {/* Filters */}
          <aside className="filters-sidebar">
            <div className="filters-top">
              <h3>Filters</h3>
              <button className="clear-all-btn" onClick={clearAll}>Clear All</button>
            </div>

            <div className="filter-group">
              <div className="filter-group-title"><FaTh /> Category</div>
              {CATEGORIES.map(cat => (
                <label key={cat} className="filter-option">
                  <input type="checkbox" checked={selCats.includes(cat)} onChange={() => handleFilter(setSelCats, selCats, cat)} />
                  {cat}
                  <span className="filter-count">({catCount(cat)})</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-group-title"><FaLayerGroup /> Level</div>
              {LEVELS.map(lvl => (
                <label key={lvl} className="filter-option">
                  <input type="radio" name="level" checked={selLevels.includes(lvl)} onChange={() => handleFilter(setSelLevels, selLevels, lvl)} />
                  {lvl}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-group-title"><FaClock /> Duration</div>
              {DURATIONS.map(dur => (
                <label key={dur} className="filter-option">
                  <input type="checkbox" checked={selDurations.includes(dur)} onChange={() => handleFilter(setSelDurations, selDurations, dur)} />
                  {dur}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-group-title"><FaTag /> Price</div>
              {PRICE_OPTS.map(opt => (
                <label key={opt} className="filter-option">
                  <input type="radio" name="price" checked={selPrice === opt} onChange={() => { setSelPrice(opt); setPage(1) }} />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-group-title"><FaGlobe /> Language</div>
              <select className="filter-select">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
          </aside>

          {/* Right Panel */}
          <div className="courses-right">
            <div className="courses-toolbar">
              <p className="courses-count">Showing <span>{filtered.length}</span> courses</p>
              <select className="sort-select" value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="courses-grid">
              {paginated.map(course => (
                <Link key={course.id} to={`/courses/${course.slug}`} className="course-card" style={{ textDecoration: 'none' }}>
                  <img src={course.image} alt={course.title} className="course-card-img" />
                  <div className="course-card-body">
                    {course.badge && <span className={`course-badge ${course.badge}`}>{course.badge}</span>}
                    <div className="course-rating">
                      <FaStar className="star" />
                      <strong>{course.rating}</strong>
                      <span className="reviews">({course.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div className="course-card-title">{course.title}</div>
                    <div className="course-instructor">
                      <img src={course.avatar} alt={course.instructor} className="instructor-avatar" />
                      <span className="instructor-name">by {course.instructor}</span>
                    </div>
                    <div className="course-card-footer">
                      <div className="course-price">
                        <span className="price-current">₹{course.price}</span>
                        <span className="price-original">₹{course.original}</span>
                      </div>
                      <div className="course-card-actions" onClick={e => e.preventDefault()}>
                        <button
                          className={`add-cart-btn${isInCart(course.id) ? ' in-cart' : ''}`}
                          title={isInCart(course.id) ? 'In Cart' : 'Add to Cart'}
                          onClick={() => addToCart(course)}
                        >
                          <FaShoppingCart />
                        </button>
                        <button
                          className={`add-wish-btn${isInWishlist(course.id) ? ' in-wish' : ''}`}
                          title={isInWishlist(course.id) ? 'Saved' : 'Save to Wishlist'}
                          onClick={() => toggleWishlist(course)}
                        >
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                  <FaChevronLeft />
                </button>
                {pageNums().map((p, i) =>
                  p === '...'
                    ? <span key={`d${i}`} className="page-dots">…</span>
                    : <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                )}
                <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
