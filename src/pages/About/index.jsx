import { FaUserGraduate, FaChalkboardTeacher, FaAward, FaGlobe } from 'react-icons/fa'
import PageBanner from '../../components/PageBanner'
import AboutUs from '../Home/Aboutus'
import ExpertInstructors from '../Home/ExpertInstructors'

const cards = [
  { icon: <FaUserGraduate />, title: 'Students Enrolled', lines: ['10,000+', 'Across India & Abroad'], color: '#03adfc' },
  { icon: <FaChalkboardTeacher />, title: 'Expert Instructors', lines: ['50+ Certified', 'Industry Professionals'], color: '#6c63ff' },
  { icon: <FaAward />, title: 'Certifications', lines: ['Internationally', 'Recognised Certificates'], color: '#ff6b6b' },
  { icon: <FaGlobe />, title: 'Online Reach', lines: ['20+ Countries', 'Global Learning Network'], color: '#f7b731' },
]

export default function About() {
  return (
    <>
      <PageBanner
        tag="ABOUT US"
        title="Who We Are"
        desc="Empowering learners with industry-ready skills since 2015. Learn from the best, grow beyond limits."
        cards={cards}
      />
      <AboutUs />
      <ExpertInstructors />
    </>
  )
}
