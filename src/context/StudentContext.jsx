import { createContext, useContext, useState } from 'react'
import { COURSES } from '../data/courses'

const StudentContext = createContext(null)

// Demo enrolled courses with varied progress for realistic UI
const DEMO_ENROLLED = [
  { ...COURSES[0], progress: 100, completedModules: 8,  status: 'Completed',   enrolledAt: '15 Jan 2025', paidAmount: COURSES[0].price },
  { ...COURSES[1], progress: 65,  completedModules: 8,  status: 'In Progress', enrolledAt: '20 Feb 2025', paidAmount: COURSES[1].price },
  { ...COURSES[4], progress: 100, completedModules: 6,  status: 'Completed',   enrolledAt: '10 Mar 2025', paidAmount: COURSES[4].price },
  { ...COURSES[5], progress: 30,  completedModules: 2,  status: 'In Progress', enrolledAt: '05 Apr 2025', paidAmount: COURSES[5].price },
  { ...COURSES[10],progress: 100, completedModules: 10, status: 'Completed',   enrolledAt: '18 Apr 2025', paidAmount: COURSES[10].price },
  { ...COURSES[2], progress: 45,  completedModules: 3,  status: 'In Progress', enrolledAt: '22 May 2025', paidAmount: COURSES[2].price },
]

export function StudentProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState(DEMO_ENROLLED)
  const [refundRequests,  setRefundRequests]  = useState([])

  const enroll = (course) => {
    setEnrolledCourses(prev =>
      prev.find(c => c.id === course.id) ? prev
        : [...prev, { ...course, progress: 0, completedModules: 0, status: 'In Progress', enrolledAt: new Date().toLocaleDateString('en-IN'), paidAmount: course.price }]
    )
  }

  const enrollMany = (courses) => {
    setEnrolledCourses(prev => {
      const newOnes = courses.filter(c => !prev.find(p => p.id === c.id))
        .map(c => ({ ...c, progress: 0, completedModules: 0, status: 'In Progress', enrolledAt: new Date().toLocaleDateString('en-IN'), paidAmount: c.price }))
      return [...prev, ...newOnes]
    })
  }

  const isEnrolled = (id) => enrolledCourses.some(c => c.id === id)
  const inProgress = enrolledCourses.filter(c => c.progress < 100)
  const completed  = enrolledCourses.filter(c => c.progress === 100)

  // Refund
  const submitRefundRequest = (request) => {
    const req = {
      ...request,
      id: Date.now(),
      submittedAt: new Date().toLocaleDateString('en-IN'),
      status: 'pending',
    }
    setRefundRequests(prev => [...prev, req])
    return req
  }

  const hasRefundRequest = (courseId) => refundRequests.some(r => r.courseId === courseId)
  const getRefundStatus  = (courseId) => refundRequests.find(r => r.courseId === courseId)?.status

  return (
    <StudentContext.Provider value={{
      enrolledCourses, enroll, enrollMany, isEnrolled, inProgress, completed,
      refundRequests, submitRefundRequest, hasRefundRequest, getRefundStatus,
    }}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => useContext(StudentContext)
