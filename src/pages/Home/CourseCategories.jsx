import { FaLaptopCode, FaChartLine, FaLanguage, FaBriefcase, FaPaintBrush, FaRobot } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Animate from '../../components/Animate'
import './CourseCategories.css'

const categories = [
  { icon: <FaLaptopCode />, label: 'Web Development', count: '12 Courses', color: '#03adfc' },
  { icon: <FaRobot />,      label: 'AI & Machine Learning', count: '8 Courses',  color: '#6c63ff' },
  { icon: <FaChartLine />,  label: 'Business & Finance', count: '10 Courses', color: '#ff6b6b' },
  { icon: <FaLanguage />,   label: 'Language Courses', count: '15 Courses', color: '#f7b731' },
  { icon: <FaBriefcase />,  label: 'Entrepreneurship', count: '6 Courses',  color: '#26de81' },
  { icon: <FaPaintBrush />, label: 'Design & Creative', count: '9 Courses',  color: '#fd9644' },
]

export default function CourseCategories() {
  return (
    <section className="categories">
      <div className="categories-inner">
        <Animate type="fade-up" duration="dur-600" className="section-header">
          <div className="section-tag-center">
            <span className="tag-line-h" />
            <span>CATEGORIES</span>
            <span className="tag-line-h" />
          </div>
          <h2>Browse Course Categories</h2>
        </Animate>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <Animate key={i} type="zoom-in" duration="dur-600" delay={`d-${i}`}>
              <NavLink to="/courses" className="cat-card" style={{ '--accent': cat.color }}>
              <div className="cat-icon-wrap">
                {cat.icon}
              </div>
              <div className="cat-info">
                <h4>{cat.label}</h4>
                <span>{cat.count}</span>
              </div>
              <div className="cat-arrow">→</div>
              </NavLink>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}
