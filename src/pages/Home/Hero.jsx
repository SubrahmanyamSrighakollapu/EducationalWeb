import { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import hero1 from '../../assets/courosal1.jpg'
import hero2 from '../../assets/courosal2.png'
import hero3 from '../../assets/couroses2.jpg'
import './Hero.css'

const slides = [
  {
    img: hero1,
    tag: 'LEARN ANYTIME, ANYWHERE',
    title: 'The Best Online Learning Platform',
    desc: 'Empowering learners across the globe with high-quality online courses.',
  },
  {
    img: hero2,
    tag: 'GROW YOUR SKILLS',
    title: 'Expert-Led Courses for Every Learner',
    desc: 'Learn from industry professionals and gain real-world experience.',
  },
  {
    img: hero3,
    tag: 'START YOUR JOURNEY',
    title: 'Unlock Your Potential with Us',
    desc: 'Flexible learning paths designed to fit your schedule and goals.',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [])
  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])

  useEffect(() => {
    const t = setTimeout(next, 5000)
    return () => clearTimeout(t)
  }, [current, next])

  return (
    <section className="hero">
      {slides.map((s, i) => (
        <div key={i} className={`hero-slide${i === current ? ' active' : ''}`}>
          <img src={s.img} alt={s.title} className="hero-bg" />
          <div className="hero-overlay" />
        </div>
      ))}

      <div className="hero-content">
        <span className="hero-tag hero-anim-tag">{slides[current].tag}</span>
        <h1 className="hero-title hero-anim-title">{slides[current].title}</h1>
        <p className="hero-desc hero-anim-desc">{slides[current].desc}</p>
        <div className="hero-btns hero-anim-btns">
          <NavLink to="/about" className="btn-primary">Read More</NavLink>
          <NavLink to="/enroll" className="btn-outline">Join Now</NavLink>
        </div>
      </div>

      <div className="hero-arrows">
        <button onClick={prev} aria-label="Previous"><span>&#8249;</span></button>
        <button onClick={next} aria-label="Next"><span>&#8250;</span></button>
      </div>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button key={i} className={i === current ? 'dot active' : 'dot'} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
