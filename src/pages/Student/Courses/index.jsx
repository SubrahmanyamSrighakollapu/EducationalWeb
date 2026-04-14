import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { COURSES } from '../../../data/courses'
import { useStore } from '../../../context/StoreContext'
import { useStudent } from '../../../context/StudentContext'

const CATS  = ['All', 'Development', 'Design', 'Marketing']
const LVLS  = ['All', 'Beginner', 'Intermediate', 'Advanced']
const PER   = 9

export default function StudentCourses() {
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useStore()
  const { isEnrolled } = useStudent()
  const [search, setSearch] = useState('')
  const [cat,    setCat]    = useState('All')
  const [level,  setLevel]  = useState('All')
  const [sort,   setSort]   = useState('popular')
  const [page,   setPage]   = useState(1)

  const filtered = useMemo(() => {
    let list = [...COURSES]
    if (search) list = list.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    if (cat   !== 'All') list = list.filter(c => c.category === cat)
    if (level !== 'All') list = list.filter(c => c.level    === level)
    if (sort === 'popular') list.sort((a, b) => b.reviews - a.reviews)
    if (sort === 'rating')  list.sort((a, b) => b.rating  - a.rating)
    if (sort === 'newest')  list.sort((a, b) => b.id - a.id)
    return list
  }, [search, cat, level, sort])

  const totalPages = Math.ceil(filtered.length / PER)
  const paged      = filtered.slice((page - 1) * PER, page * PER)

  return (
    <>
      <div className="admin-page-header">
        <div><h1>Browse Courses</h1><p>Explore {COURSES.length} courses available on the platform</p></div>
      </div>

      {/* Toolbar */}
      <div className="admin-card" style={{ overflow: 'visible' }}>
        <div style={{ padding: '16px 22px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="admin-search-box" style={{ flex: 1, minWidth: 200 }}>
            <FiSearch />
            <input placeholder="Search courses…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="admin-filter-select" value={cat}   onChange={e => { setCat(e.target.value);   setPage(1) }}>{CATS.map(c  => <option key={c}>{c}</option>)}</select>
          <select className="admin-filter-select" value={level} onChange={e => { setLevel(e.target.value); setPage(1) }}>{LVLS.map(l  => <option key={l}>{l}</option>)}</select>
          <select className="admin-filter-select" value={sort}  onChange={e => { setSort(e.target.value);  setPage(1) }}>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-gray)', marginLeft: 'auto' }}>{filtered.length} courses</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        {paged.map(course => (
          <div key={course.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf3', overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(36,89,159,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}>
            <Link to={`/student/courses/${course.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <img src={course.image} alt={course.title} style={{ width: '100%', height: 148, objectFit: 'cover', display: 'block' }} />
            </Link>
            <div style={{ padding: '14px 16px 16px' }}>
              {course.badge && <span style={{ fontSize: '0.68rem', fontWeight: 700, background: course.badge === 'bestseller' ? '#f7b731' : '#26de81', color: '#fff', padding: '2px 9px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 6, display: 'inline-block' }}>{course.badge}</span>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', color: '#f7b731', fontWeight: 700, marginBottom: 6 }}>
                <FaStar /> {course.rating} <span style={{ color: '#aaa', fontWeight: 400 }}>({course.reviews?.toLocaleString()})</span>
              </div>
              <Link to={`/student/courses/${course.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.title}</div>
              </Link>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginBottom: 12 }}>by {course.instructor}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0f3f7', paddingTop: 12 }}>
                <div>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)' }}>₹{course.price}</span>
                  <span style={{ fontSize: '0.78rem', color: '#bbb', textDecoration: 'line-through', marginLeft: 6 }}>₹{course.original}</span>
                </div>
                {isEnrolled(course.id) ? (
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#e6faf2', color: '#1a9e5c', padding: '5px 12px', borderRadius: 8 }}>Enrolled</span>
                ) : (
                  <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => addToCart(course)} style={{ background: isInCart(course.id) ? '#26de81' : 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}><FaShoppingCart /></button>
                    <button onClick={() => toggleWishlist(course)} style={{ background: isInWishlist(course.id) ? '#fff0f0' : '#f0f2f5', color: isInWishlist(course.id) ? '#ff6b6b' : '#888', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}><FaHeart /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          <button className="admin-page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`admin-page-btn${page === i + 1 ? ' active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button className="admin-page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</button>
        </div>
      )}
    </>
  )
}
