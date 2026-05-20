import { createContext, useContext, useState } from 'react'

const TutorContext = createContext(null)

// Demo pre-seeded requests — includes records for the demo student account
const DEMO = [
  {
    id: 2001, type: 'tutor',
    name: 'Dr. Ramesh Kumar', subject: 'Mathematics & Statistics', qualification: 'PhD Mathematics, IIT Delhi',
    experience: '12 years', mode: 'Online & Offline', languages: 'English, Hindi, Telugu',
    location: 'Hyderabad, Telangana', phone: '+91 98765 43210', email: 'ramesh.kumar@gmail.com',
    availability: 'Weekdays 6–9 PM, Weekends All Day', fee: '₹1,500/hour',
    about: 'Experienced mathematics tutor specialising in competitive exam preparation (JEE, GATE, CAT).',
    studentName: 'Alex Rivera', studentEmail: 'student@educationweb.in',
    submittedAt: '05 Jun 2025', status: 'approved', approvedAt: '06 Jun 2025', paid: false,
  },
  {
    id: 2002, type: 'institute',
    name: 'TechSkills Academy', category: 'Technology & IT', affiliation: 'NASSCOM Certified',
    established: '2015', totalStudents: '5,000+', courses: 'Python, Java, Web Dev, Data Science',
    mode: 'Offline', location: 'Madhapur, Hyderabad', phone: '+91 40-2345-6789',
    email: 'admissions@techskills.in', website: 'www.techskills.in',
    fee: '₹25,000–₹80,000 per course', about: 'Premier technology training institute with 100% placement assistance.',
    studentName: 'Alex Rivera', studentEmail: 'student@educationweb.in',
    submittedAt: '08 Jun 2025', status: 'approved', approvedAt: '09 Jun 2025', paid: true, paidAt: '09 Jun 2025',
  },
  {
    id: 2003, type: 'tutor',
    name: 'Anita Sharma', subject: 'English Communication & IELTS', qualification: 'MA English, CELTA Certified',
    experience: '8 years', mode: 'Online', languages: 'English, Hindi',
    location: 'Bangalore, Karnataka', phone: '+91 87654 32109', email: 'anita.sharma@gmail.com',
    availability: 'Flexible – by appointment', fee: '₹1,200/hour',
    about: 'Specialised in IELTS, TOEFL, and business English communication training.',
    studentName: 'Alex Rivera', studentEmail: 'student@educationweb.in',
    submittedAt: '10 Jun 2025', status: 'rejected', rejectedReason: 'Incomplete documentation provided. Please resubmit with valid certificates.', paid: false, rejectedAt: '11 Jun 2025',
  },
  {
    id: 2004, type: 'institute',
    name: 'CareerEdge Institute', category: 'Business & Management', affiliation: 'ISO 9001:2015 Certified',
    established: '2012', totalStudents: '12,000+', courses: 'MBA Prep, CAT Coaching, Leadership, Finance',
    mode: 'Online & Offline', location: 'Banjara Hills, Hyderabad', phone: '+91 40-6789-1234',
    email: 'info@careeredge.in', website: 'www.careeredge.in',
    fee: '₹30,000–₹1,20,000 per program', about: 'Top-ranked business management institute with strong alumni network and placement record.',
    studentName: 'Alex Rivera', studentEmail: 'student@educationweb.in',
    submittedAt: '12 Jun 2025', status: 'pending', paid: false,
  },
  {
    id: 2005, type: 'tutor',
    name: 'Vikram Nair', subject: 'Data Science & Machine Learning', qualification: 'M.Tech CSE, IIT Bombay',
    experience: '6 years', mode: 'Online', languages: 'English, Malayalam, Hindi',
    location: 'Remote (Pan India)', phone: '+91 76543 21098', email: 'vikram.nair@gmail.com',
    availability: 'Weekends 10 AM–6 PM', fee: '₹2,000/hour',
    about: 'Industry expert with experience at Google and Flipkart. Specialises in Python, ML, and AI projects.',
    studentName: 'Alex Rivera', studentEmail: 'student@educationweb.in',
    submittedAt: '14 Jun 2025', status: 'approved', approvedAt: '15 Jun 2025', paid: false,
  },
  // Other students' records (visible in admin)
  {
    id: 2006, type: 'tutor',
    name: 'Priya Iyer', subject: 'Physics & Chemistry', qualification: 'MSc Physics, Osmania University',
    experience: '10 years', mode: 'Offline', languages: 'English, Telugu, Tamil',
    location: 'Secunderabad, Telangana', phone: '+91 65432 10987', email: 'priya.iyer@gmail.com',
    availability: 'Mon–Sat 4–8 PM', fee: '₹900/hour',
    about: 'Dedicated science tutor with proven track record in board and competitive exam results.',
    studentName: 'Rahul Sharma', studentEmail: 'rahul@gmail.com',
    submittedAt: '11 Jun 2025', status: 'pending', paid: false,
  },
]

export function TutorProvider({ children }) {
  const [requests, setRequests] = useState(DEMO)

  // Student adds a new request
  const addRequest = (data, studentName, studentEmail) => {
    const req = {
      ...data,
      id: Date.now(),
      studentName,
      studentEmail,
      submittedAt: new Date().toLocaleDateString('en-IN'),
      status: 'pending',
      paid: false,
    }
    setRequests(p => [...p, req])
    return req
  }

  // Admin actions
  const approveRequest = (id) =>
    setRequests(p => p.map(r => r.id === id ? { ...r, status: 'approved', approvedAt: new Date().toLocaleDateString('en-IN') } : r))

  const rejectRequest = (id, reason) =>
    setRequests(p => p.map(r => r.id === id ? { ...r, status: 'rejected', rejectedReason: reason, rejectedAt: new Date().toLocaleDateString('en-IN') } : r))

  // Student pays
  const markPaid = (id) =>
    setRequests(p => p.map(r => r.id === id ? { ...r, paid: true, paidAt: new Date().toLocaleDateString('en-IN') } : r))

  // Student's own requests
  const getStudentRequests = (email) => requests.filter(r => r.studentEmail === email)

  return (
    <TutorContext.Provider value={{ requests, addRequest, approveRequest, rejectRequest, markPaid, getStudentRequests }}>
      {children}
    </TutorContext.Provider>
  )
}

export const useTutor = () => useContext(TutorContext)
