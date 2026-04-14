import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiToggleLeft, FiToggleRight, FiX, FiBookOpen } from 'react-icons/fi'
import { useAdmin } from '../../../context/AdminContext'

const EMPTY = { title: '', subtitle: '', category: 'Development', level: 'Beginner', duration: '3-10 Hours', hours: '', price: '', original: '', instructor: '', language: 'English', badge: '', about: '', thumbnail: '' }
const CATS  = ['Development', 'Design', 'Marketing', 'Business', 'Language', 'Data Science']
const LVLS  = ['Beginner', 'Intermediate', 'Advanced']
const DURS  = ['0-3 Hours', '3-10 Hours', '10+ Hours']
const LANGS = ['English', 'Hindi', 'Telugu', 'Tamil', 'Spanish']
const PER   = 8

export default function AdminCourses() {
  const { courses, addCourse, updateCourse, deleteCourse, toggleCourseStatus } = useAdmin()
  const [search, setSearch]   = useState('')
  const [catF,   setCatF]     = useState('All')
  const [statusF,setStatusF]  = useState('All')
  const [modal,  setModal]    = useState(null)   // null | 'add' | 'edit'
  const [form,   setForm]     = useState(EMPTY)
  const [delId,  setDelId]    = useState(null)
  const [page,   setPage]     = useState(1)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const filtered = courses.filter(c => {
    const q = search.toLowerCase()
    return (
      (c.title.toLowerCase().includes(q) || c.instructor?.toLowerCase().includes(q)) &&
      (catF    === 'All' || c.category === catF) &&
      (statusF === 'All' || c.status   === statusF)
    )
  })
  const totalPages = Math.ceil(filtered.length / PER)
  const paged      = filtered.slice((page - 1) * PER, page * PER)

  const openAdd  = ()  => { setForm(EMPTY); setModal('add') }
  const openEdit = (c) => { setForm({ ...c, price: c.price, original: c.original }); setModal('edit') }

  const handleSave = () => {
    if (!form.title.trim() || !form.instructor.trim() || !form.price) return
    if (modal === 'add') addCourse(form)
    else updateCourse(form)
    setModal(null)
  }

  const confirmDelete = () => { deleteCourse(delId); setDelId(null) }

  return (
    <>
      <div className="admin-page-header">
        <div><h1>Course Management</h1><p>Manage all courses on the platform</p></div>
        <button className="btn-primary-sm" onClick={openAdd}><FiPlus /> Add Course</button>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div><h3>All Courses</h3><p>{filtered.length} courses found</p></div>
          <div className="admin-toolbar">
            <div className="admin-search-box"><FiSearch /><input placeholder="Search courses…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} /></div>
            <select className="admin-filter-select" value={catF} onChange={e => { setCatF(e.target.value); setPage(1) }}>
              <option value="All">All Categories</option>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="admin-filter-select" value={statusF} onChange={e => { setStatusF(e.target.value); setPage(1) }}>
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {paged.length === 0 ? (
          <div className="admin-empty"><FiBookOpen /><h4>No courses found</h4><p>Try adjusting your filters or add a new course.</p></div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th><th>Course</th><th>Category</th><th>Instructor</th>
                  <th>Level</th><th>Price</th><th>Students</th><th>Rating</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((c, i) => (
                  <tr key={c.id}>
                    <td style={{ color: '#aaa', fontSize: '0.78rem' }}>{(page - 1) * PER + i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {c.image && <img src={c.image} alt={c.title} className="td-img" />}
                        <div className="td-title">
                          {c.title.length > 36 ? c.title.slice(0, 36) + '…' : c.title}
                          <small>{c.duration}</small>
                        </div>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '0.78rem', background: '#f0f2f5', padding: '3px 8px', borderRadius: 6 }}>{c.category}</span></td>
                    <td style={{ fontSize: '0.83rem' }}>{c.instructor}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>{c.level}</td>
                    <td style={{ fontWeight: 700 }}>₹{c.price}<br /><span style={{ fontSize: '0.72rem', color: '#bbb', textDecoration: 'line-through', fontWeight: 400 }}>₹{c.original}</span></td>
                    <td style={{ fontSize: '0.83rem' }}>{c.enrolledCount?.toLocaleString() || 0}</td>
                    <td style={{ fontSize: '0.83rem', color: '#f7b731', fontWeight: 700 }}>★ {c.rating || '—'}</td>
                    <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="act-btn" title="Edit" onClick={() => openEdit(c)}><FiEdit2 /></button>
                        <button className="act-btn toggle" title={c.status === 'active' ? 'Deactivate' : 'Activate'} onClick={() => toggleCourseStatus(c.id)}>
                          {c.status === 'active' ? <FiToggleRight style={{ color: '#1a9e5c' }} /> : <FiToggleLeft />}
                        </button>
                        <button className="act-btn delete" title="Delete" onClick={() => setDelId(c.id)}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="admin-pagination">
            <span>Showing {(page - 1) * PER + 1}–{Math.min(page * PER, filtered.length)} of {filtered.length}</span>
            <div className="admin-page-btns">
              <button className="admin-page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`admin-page-btn${page === i + 1 ? ' active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="admin-page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add New Course' : 'Edit Course'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-section-title">Basic Information</div>
                <div className="form-field span-2">
                  <label>Course Title *</label>
                  <input className="form-input" placeholder="e.g. Complete React Developer Course" value={form.title} onChange={set('title')} />
                </div>
                <div className="form-field span-2">
                  <label>Subtitle / Short Description *</label>
                  <input className="form-input" placeholder="Brief one-line description" value={form.subtitle} onChange={set('subtitle')} />
                </div>
                <div className="form-field">
                  <label>Category *</label>
                  <select className="form-select" value={form.category} onChange={set('category')}>
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Level *</label>
                  <select className="form-select" value={form.level} onChange={set('level')}>
                    {LVLS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Duration Range</label>
                  <select className="form-select" value={form.duration} onChange={set('duration')}>
                    {DURS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Total Hours</label>
                  <input className="form-input" placeholder="e.g. 28 hours" value={form.hours} onChange={set('hours')} />
                </div>

                <div className="form-section-title">Instructor & Language</div>
                <div className="form-field">
                  <label>Instructor Name *</label>
                  <input className="form-input" placeholder="Full name" value={form.instructor} onChange={set('instructor')} />
                </div>
                <div className="form-field">
                  <label>Language</label>
                  <select className="form-select" value={form.language} onChange={set('language')}>
                    {LANGS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>

                <div className="form-section-title">Pricing</div>
                <div className="form-field">
                  <label>Sale Price (₹) *</label>
                  <input className="form-input" type="number" placeholder="799" value={form.price} onChange={set('price')} />
                </div>
                <div className="form-field">
                  <label>Original Price (₹)</label>
                  <input className="form-input" type="number" placeholder="2499" value={form.original} onChange={set('original')} />
                </div>
                <div className="form-field">
                  <label>Badge</label>
                  <select className="form-select" value={form.badge} onChange={set('badge')}>
                    <option value="">None</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="new">New</option>
                  </select>
                </div>

                <div className="form-section-title">Content</div>
                <div className="form-field span-2">
                  <label>About This Course</label>
                  <textarea className="form-textarea" rows={3} placeholder="Detailed course description…" value={form.about} onChange={set('about')} />
                </div>
                <div className="form-field span-2">
                  <label>Thumbnail URL</label>
                  <input className="form-input" placeholder="https://… or leave blank" value={form.thumbnail} onChange={set('thumbnail')} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-sm" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary-sm" onClick={handleSave}>{modal === 'add' ? 'Add Course' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delId && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDelId(null)}>
          <div className="modal-box" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h3>Delete Course</h3>
              <button className="modal-close" onClick={() => setDelId(null)}><FiX /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', lineHeight: 1.7 }}>
                Are you sure you want to delete this course? This action cannot be undone and all enrolled student data will be affected.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-sm" onClick={() => setDelId(null)}>Cancel</button>
              <button className="btn-primary-sm" style={{ background: '#ff6b6b' }} onClick={confirmDelete}>Delete Course</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
