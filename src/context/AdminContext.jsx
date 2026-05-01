import { createContext, useContext, useState } from 'react'
import { COURSES } from '../data/courses'

const AdminContext = createContext(null)

const INIT_STUDENTS = [
  { id: 1, name: 'Rahul Sharma',   email: 'rahul@gmail.com',   phone: '+91 9281441011', enrolledCourses: [1, 2], joinDate: '2024-01-15', status: 'active',   avatar: '' },
  { id: 2, name: 'Priya Mehta',    email: 'priya@gmail.com',   phone: '+91 87654 32109', enrolledCourses: [3],    joinDate: '2024-02-20', status: 'active',   avatar: '' },
  { id: 3, name: 'Arjun Nair',     email: 'arjun@gmail.com',   phone: '+91 76543 21098', enrolledCourses: [1, 4], joinDate: '2024-03-10', status: 'inactive', avatar: '' },
  { id: 4, name: 'Sneha Patel',    email: 'sneha@gmail.com',   phone: '+91 65432 10987', enrolledCourses: [5, 6], joinDate: '2024-04-05', status: 'active',   avatar: '' },
  { id: 5, name: 'Vikram Singh',   email: 'vikram@gmail.com',  phone: '+91 54321 09876', enrolledCourses: [2],    joinDate: '2024-05-18', status: 'active',   avatar: '' },
  { id: 6, name: 'Ananya Reddy',   email: 'ananya@gmail.com',  phone: '+91 43210 98765', enrolledCourses: [7, 8], joinDate: '2024-06-22', status: 'inactive', avatar: '' },
]

const INIT_COURSES = COURSES.map(c => ({ ...c, status: 'active', enrolledCount: parseInt(c.students?.replace(/,/g, '') || '0') }))

export function AdminProvider({ children }) {
  const [courses,  setCourses]  = useState(INIT_COURSES)
  const [students, setStudents] = useState(INIT_STUDENTS)

  // Courses
  const addCourse    = (c)  => setCourses(p => [...p, { ...c, id: Date.now(), status: 'active', enrolledCount: 0, slug: c.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }])
  const updateCourse = (c)  => setCourses(p => p.map(x => x.id === c.id ? { ...x, ...c } : x))
  const deleteCourse = (id) => setCourses(p => p.filter(x => x.id !== id))
  const toggleCourseStatus = (id) => setCourses(p => p.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))

  // Students
  const addStudent    = (s)  => setStudents(p => [...p, { ...s, id: Date.now(), enrolledCourses: [], joinDate: new Date().toISOString().split('T')[0], status: 'active' }])
  const updateStudent = (s)  => setStudents(p => p.map(x => x.id === s.id ? { ...x, ...s } : x))
  const deleteStudent = (id) => setStudents(p => p.filter(x => x.id !== id))
  const toggleStudentStatus = (id) => setStudents(p => p.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))

  return (
    <AdminContext.Provider value={{
      courses, students,
      addCourse, updateCourse, deleteCourse, toggleCourseStatus,
      addStudent, updateStudent, deleteStudent, toggleStudentStatus,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
