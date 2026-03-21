import { FaLaptopCode, FaRobot, FaLanguage, FaBriefcase } from 'react-icons/fa'
import PageBanner from '../../components/PageBanner'
import CourseCategories from '../Home/CourseCategories'
import PopularCourses from '../Home/PopularCourses'
import Testimonials from '../Home/Testimonials'

const cards = [
  { icon: <FaLaptopCode />, title: 'Tech Courses', lines: ['Web, AI & Cloud', '30+ Programs'], color: '#03adfc' },
  { icon: <FaRobot />, title: 'AI & Data Science', lines: ['Machine Learning', 'Python & Analytics'], color: '#6c63ff' },
  { icon: <FaLanguage />, title: 'Language Courses', lines: ['English, Japanese', '& More Languages'], color: '#f7b731' },
  { icon: <FaBriefcase />, title: 'Business & Startup', lines: ['Entrepreneurship', 'Marketing & Finance'], color: '#26de81' },
]

export default function Courses() {
  return (
    <>
      <PageBanner
        tag="OUR COURSES"
        title="Explore All Courses"
        desc="Choose from 100+ courses across technology, business, language and creative fields."
        cards={cards}
      />
      <CourseCategories />
      <PopularCourses />
      <Testimonials />
    </>
  )
}
