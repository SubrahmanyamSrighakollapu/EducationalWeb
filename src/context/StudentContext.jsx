import { createContext, useContext, useState } from 'react'

const StudentContext = createContext(null)

export function StudentProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([])

  const enroll = (course) => {
    setEnrolledCourses(prev =>
      prev.find(c => c.id === course.id)
        ? prev
        : [...prev, { ...course, progress: 0, status: 'In Progress', enrolledAt: new Date().toLocaleDateString() }]
    )
  }

  const enrollMany = (courses) => {
    setEnrolledCourses(prev => {
      const newOnes = courses.filter(c => !prev.find(p => p.id === c.id))
        .map(c => ({ ...c, progress: 0, status: 'In Progress', enrolledAt: new Date().toLocaleDateString() }))
      return [...prev, ...newOnes]
    })
  }

  const isEnrolled  = (id) => enrolledCourses.some(c => c.id === id)
  const inProgress  = enrolledCourses.filter(c => c.progress < 100)
  const completed   = enrolledCourses.filter(c => c.progress === 100)

  return (
    <StudentContext.Provider value={{ enrolledCourses, enroll, enrollMany, isEnrolled, inProgress, completed }}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => useContext(StudentContext)
