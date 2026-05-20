import { createContext, useContext, useState } from 'react'
import { COURSES } from '../data/courses'

const AdminContext = createContext(null)

const INIT_STUDENTS = [
  { id: 1, name: 'Rahul Sharma',  email: 'rahul@gmail.com',  phone: '+91 98765 43210', enrolledCourses: [1, 2],  joinDate: '2024-01-15', status: 'active' },
  { id: 2, name: 'Priya Mehta',   email: 'priya@gmail.com',  phone: '+91 87654 32109', enrolledCourses: [3],     joinDate: '2024-02-20', status: 'active' },
  { id: 3, name: 'Arjun Nair',    email: 'arjun@gmail.com',  phone: '+91 76543 21098', enrolledCourses: [1, 4],  joinDate: '2024-03-10', status: 'inactive' },
  { id: 4, name: 'Sneha Patel',   email: 'sneha@gmail.com',  phone: '+91 65432 10987', enrolledCourses: [5, 6],  joinDate: '2024-04-05', status: 'active' },
  { id: 5, name: 'Vikram Singh',  email: 'vikram@gmail.com', phone: '+91 54321 09876', enrolledCourses: [2],     joinDate: '2024-05-18', status: 'active' },
  { id: 6, name: 'Ananya Reddy',  email: 'ananya@gmail.com', phone: '+91 43210 98765', enrolledCourses: [7, 8],  joinDate: '2024-06-22', status: 'inactive' },
]

const INIT_COURSES = COURSES.map(c => ({
  ...c, status: 'active',
  enrolledCount: parseInt(c.students?.replace(/,/g, '') || '0'),
}))

// Demo refund requests pre-seeded for admin view
const INIT_REFUNDS = [
  {
    id: 1001, courseId: 1, courseTitle: 'Complete UI/UX Design Essentials: Figma to Studio',
    courseImage: COURSES[0].image, paidAmount: COURSES[0].price,
    studentName: 'Rahul Sharma', studentEmail: 'rahul@gmail.com', studentPhone: '+91 98765 43210',
    completionPercent: 100, completedModules: 8, totalModules: 8,
    reason: 'Course content did not match my current job requirements. I have already completed it fully but the skills are not applicable to my role.',
    bankName: 'HDFC Bank', accountHolder: 'Rahul Sharma', accountNumber: '****4521', ifsc: 'HDFC0001234',
    submittedAt: '10 Jun 2025', status: 'pending',
    platformFee: Math.round(COURSES[0].price * 0.1),
    refundAmount: Math.round(COURSES[0].price * 0.9),
  },
  {
    id: 1002, courseId: 5, courseTitle: 'AWS Cloud Practitioner Certification',
    courseImage: COURSES[4].image, paidAmount: COURSES[4].price,
    studentName: 'Sneha Patel', studentEmail: 'sneha@gmail.com', studentPhone: '+91 65432 10987',
    completionPercent: 100, completedModules: 6, totalModules: 6,
    reason: 'I passed the AWS exam and got certified. The course was good but I feel the refund policy should apply since I completed it.',
    bankName: 'SBI', accountHolder: 'Sneha Patel', accountNumber: '****8832', ifsc: 'SBIN0005678',
    submittedAt: '12 Jun 2025', status: 'approved',
    platformFee: Math.round(COURSES[4].price * 0.1),
    refundAmount: Math.round(COURSES[4].price * 0.9),
    approvedAt: '13 Jun 2025',
  },
]

export function AdminProvider({ children }) {
  const [courses,        setCourses]        = useState(INIT_COURSES)
  const [students,       setStudents]       = useState(INIT_STUDENTS)
  const [refundRequests, setRefundRequests] = useState(INIT_REFUNDS)

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

  // Refunds
  const addRefundRequest = (req) => setRefundRequests(p => [...p, req])
  const approveRefund    = (id)  => setRefundRequests(p => p.map(r => r.id === id ? { ...r, status: 'approved', approvedAt: new Date().toLocaleDateString('en-IN') } : r))
  const rejectRefund     = (id, reason) => setRefundRequests(p => p.map(r => r.id === id ? { ...r, status: 'rejected', rejectedReason: reason, rejectedAt: new Date().toLocaleDateString('en-IN') } : r))

  return (
    <AdminContext.Provider value={{
      courses, students, refundRequests,
      addCourse, updateCourse, deleteCourse, toggleCourseStatus,
      addStudent, updateStudent, deleteStudent, toggleStudentStatus,
      addRefundRequest, approveRefund, rejectRefund,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
