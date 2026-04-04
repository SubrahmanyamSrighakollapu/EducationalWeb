import PageBanner from '../../components/PageBanner'
import CoursesPage from './CoursesPage'

export default function Courses() {
  return (
    <>
      <PageBanner
        tag="OUR COURSES"
        title="Explore All Courses"
        desc="Choose from 100+ courses across technology, business, language and creative fields."
      />
      <CoursesPage />
    </>
  )
}
