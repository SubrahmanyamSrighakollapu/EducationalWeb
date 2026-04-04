import { useState, useEffect, useCallback } from 'react'
import testimonial1 from '../../assets/testimonial1.jpg'
import testimonial2 from '../../assets/testimonial2.jpg'
import testimonial3 from '../../assets/instructor2.jpg'
import testimonial4 from '../../assets/instructor3.jpg'
import testimonial5 from '../../assets/instructor4.jpg'
import Animate from '../../components/Animate'
import './Testimonials.css'

const testimonials = [
  {
    img: testimonial1,
    name: 'Sneha Patel',
    course: 'Business Management Course',
    text: '"Joining Education Web was the best decision I made for my career. The business management sessions gave me clarity on leadership, planning, and decision-making. The instructors made complex topics easy to understand."',
  },
  {
    img: testimonial2,
    name: 'Arjun Verma',
    course: 'Language Course',
    text: '"I enrolled in the Spoken English course, and it completely changed my confidence level. The classes were interactive and fun, and I now communicate fluently in my workplace. Thank you, Education Web"',
  },
  {
    img: testimonial3,
    name: 'Priya Sharma',
    course: 'IT Software Course',
    text: '"Education Web helped me build a strong foundation in software development. The instructors were patient and explained every concept clearly. I secured my first job as a junior developer within three months."',
  },
  {
    img: testimonial4,
    name: 'Rahul Bose',
    course: 'Entrepreneurship Course',
    text: '"The entrepreneurship program gave me the confidence and tools to launch my own startup. The mentors were incredibly supportive and the curriculum was practical and industry-focused."',
  },
  {
    img: testimonial5,
    name: 'Ridhima Patel',
    course: 'Digital Marketing Course',
    text: '"I learned digital marketing from scratch and landed a job within 2 months of completing the course. The hands-on projects and real-world case studies made all the difference in my learning journey."',
  },
]

export default function Testimonials() {
  const total = testimonials.length
  const [active, setActive] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [dir, setDir] = useState('next')

  const goTo = useCallback((idx, direction = 'next') => {
    if (sliding) return
    setDir(direction)
    setSliding(true)
    setTimeout(() => {
      setActive(idx)
      setSliding(false)
    }, 500)
  }, [sliding])

  const next = useCallback(() => goTo((active + 1) % total, 'next'), [active, total, goTo])
  const prev = useCallback(() => goTo((active - 1 + total) % total, 'prev'), [active, total, goTo])

  // Auto-play every 5s
  useEffect(() => {
    const t = setTimeout(next, 5000)
    return () => clearTimeout(t)
  }, [active, next])

  // Get 3 visible indices: prev, active, next
  const indices = [
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
  ]

  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <Animate type="fade-up" duration="dur-600" className="section-header">
          <div className="section-tag-center">
            <span className="tag-line-h" />
            <span>TESTIMONIAL</span>
            <span className="tag-line-h" />
          </div>
          <h2>Our Students Say!</h2>
        </Animate>

        <Animate type="fade-up" duration="dur-800" delay="d-2">
          <div className={`testi-track ${sliding ? `slide-${dir}` : ''}`}>
            {indices.map((idx, pos) => {
              const t = testimonials[idx]
              const isCenter = pos === 1
              return (
                <div key={idx} className={`testi-col${isCenter ? ' featured' : ''}`}>
                  <div className="testi-avatar-wrap">
                    <img src={t.img} alt={t.name} className="testi-avatar" />
                  </div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-course">{t.course}</div>
                  <div className={`testi-card${isCenter ? ' active-card' : ''}`}>
                    <p>{t.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Animate>

        {/* Dots */}
        <div className="testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testi-dot${i === active ? ' active' : ''}`}
              onClick={() => goTo(i, i > active ? 'next' : 'prev')}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="testi-arrows">
          <button onClick={prev} aria-label="Previous">&#8249;</button>
          <button onClick={next} aria-label="Next">&#8250;</button>
        </div>
      </div>
    </section>
  )
}
