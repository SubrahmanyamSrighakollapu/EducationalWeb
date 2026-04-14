import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiToggleLeft, FiToggleRight, FiX, FiUsers } from 'react-icons/fi'
import { useAdmin } from '../../../context/AdminContext'

const EMPTY = { name: '', email: '', phone: '', password: '', enrolledCourses: [], status: 'active' }
const PER   = 8

export default function AdminStudents() {
  const { students, courses, addStudent, updateStudent, deleteStudent, toggleStudentStatus } = useAdmin()
  const [search,  setSearch]  = useState('')
  const [statusF, setStatusF] = useState('All')
  const [modal,   setModal]   = useState(null)
  const [form,    setForm]    = useState(EMPTY)
  const [delId,   setDelId]   = useState(null)
  const [page,    setPage]    = useState(1)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const filtered = students.filter(s => {
    const q = search.toLowerCase()
    return (
      (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)) &&
      (statusF === 'All' || s.status === statusF)
    )
  })
  const totalPages = Math.ceil(filtered.length / PER)
  const paged      = filtered.slice((page - 1) * PER, page * PER)

  const openAdd  = ()  => { setForm(EMPTY); setModal('add') }
  const openEdit = (s) => { setForm({ ...s }); setModal('edit') }

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return
    if (modal === 'add') addStudent(form)
    else updateStudent(form)
    setModal(null)
  }

  const toggleCourse = (id) => {
    setForm(f => ({
      ...f,
      enrolledCourses: f.enrolledCourses.includes(id)
        ? f.enrolledCourses.filter(x => x !== id)
        : [...f.enrolledCourses, id],
    }))
  }

  return (
    <>
      <div className="admin-page-header">
        <div><h1>Student Management</h1><p>Manage all registered students</p></div>
        <button className="btn-primary-sm" onClick={openAdd}><FiPlus /> Add Student</button>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div><h3>All Students</h3><p>{filtered.length} students found</p></div>
          <div className="admin-toolbar">
            <div className="admin-search-box"><FiSearch /><input placeholder="Search students…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} /></div>
            <select className="admin-filter-select" value={statusF} onChange={e => { setStatusF(e.target.value); setPage(1) }}>
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {paged.length === 0 ? (
          <div className="admin-empty"><FiUsers /><h4>No students found</h4><p>Try adjusting your search or add a new student.</p></div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Student</th><th>Phone</th><th>Enrolled</th><th>Join Date</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {paged.map((s, i) => (
                  <tr key={s.id}>
                    <td style={{ color: '#aaa', fontSize: '0.78rem' }}>{(page - 1) * PER + i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="td-avatar">{s.name[0]}</div>
                        <div className="td-title">{s.name}<small>{s.email}</small></div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.83rem', color: 'var(--text-gray)' }}>{s.phone || '—'}</td>
                    <td>
                      <span style={{ fontSize: '0.78rem', background: '#e8f0ff', color: 'var(--primary)', padding: '3px 9px', borderRadius: 6, fontWeight: 700 }}>
                        {s.enrolledCourses.length} courses
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>{s.joinDate}</td>
                    <td><span className={`status-badge ${s.status}`}>{s.status}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="act-btn" title="Edit" onClick={() => openEdit(s)}><FiEdit2 /></button>
                        <button className="act-btn toggle" title={s.status === 'active' ? 'Deactivate' : 'Activate'} onClick={() => toggleStudentStatus(s.id)}>
                          {s.status === 'active' ? <FiToggleRight style={{ color: '#1a9e5c' }} /> : <FiToggleLeft />}
                        </button>
                        <button className="act-btn delete" title="Delete" onClick={() => setDelId(s.id)}><FiTrash2 /></button>
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
              <h3>{modal === 'add' ? 'Add New Student' : 'Edit Student'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-section-title">Personal Information</div>
                <div className="form-field span-2">
                  <label>Full Name *</label>
                  <input className="form-input" placeholder="e.g. Rahul Sharma" value={form.name} onChange={set('name')} />
                </div>
                <div className="form-field">
                  <label>Email Address *</label>
                  <input className="form-input" type="email" placeholder="student@email.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                </div>
                {modal === 'add' && (
                  <div className="form-field span-2">
                    <label>Password *</label>
                    <input className="form-input" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={set('password')} />
                  </div>
                )}
                <div className="form-field">
                  <label>Status</label>
                  <select className="form-select" value={form.status} onChange={set('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-section-title">Assign Courses</div>
                <div className="form-field span-2">
                  <label>Select Courses to Enroll</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflowY: 'auto', border: '1.5px solid #dde3ea', borderRadius: 9, padding: '10px 12px' }}>
                    {courses.filter(c => c.status === 'active').map(c => (
                      <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: '0.85rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.enrolledCourses.includes(c.id)} onChange={() => toggleCourse(c.id)} style={{ accentColor: 'var(--primary)', width: 14, height: 14 }} />
                        <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{c.title.slice(0, 45)}{c.title.length > 45 ? '…' : ''}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-gray)' }}>{c.category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-sm" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary-sm" onClick={handleSave}>{modal === 'add' ? 'Add Student' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delId && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDelId(null)}>
          <div className="modal-box" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h3>Delete Student</h3>
              <button className="modal-close" onClick={() => setDelId(null)}><FiX /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', lineHeight: 1.7 }}>
                Are you sure you want to delete this student? All their enrollment data and progress will be permanently removed.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-sm" onClick={() => setDelId(null)}>Cancel</button>
              <button className="btn-primary-sm" style={{ background: '#ff6b6b' }} onClick={() => { deleteStudent(delId); setDelId(null) }}>Delete Student</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
