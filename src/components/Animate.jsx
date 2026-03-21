import useInView from '../hooks/useInView'
import '../styles/animate.css'

/**
 * Animate wrapper — wraps any element with scroll-triggered animation.
 * Props:
 *   type    : 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade-in'
 *   duration: 'dur-400' | 'dur-600' | 'dur-800' | 'dur-900'
 *   delay   : 'd-0' … 'd-7'
 *   tag     : HTML tag to render (default 'div')
 *   className: extra classes
 */
export default function Animate({
  children,
  type = 'fade-up',
  duration = 'dur-600',
  delay = 'd-0',
  tag: Tag = 'div',
  className = '',
  style,
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`anim ${type} ${duration} ${delay}${inView ? ' visible' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  )
}
