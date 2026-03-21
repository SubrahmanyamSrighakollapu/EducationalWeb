import Animate from './Animate'
import './PageBanner.css'

export default function PageBanner({ tag, title, desc, cards }) {
  return (
    <div className="page-banner-wrap">
      <div className="page-banner">
        <div className="page-banner-overlay" />
        <div className="page-banner-content">
          <div className="pb-tag">
            <span className="pb-line" />
            <span>{tag}</span>
            <span className="pb-line" />
          </div>
          <h1>{title}</h1>
          {desc && <p>{desc}</p>}
        </div>
      </div>

      {cards && (
        <div className="pb-cards-wrap">
          <div className={`pb-cards cols-${cards.length}`}>
            {cards.map((card, i) => (
              <Animate key={i} type="fade-up" duration="dur-600" delay={`d-${i + 1}`}>
                <div className="pb-info-card" style={{ '--card-color': card.color }}>
                  <div className="pb-card-icon">{card.icon}</div>
                  <h4>{card.title}</h4>
                  {card.lines.map((l, j) => <p key={j}>{l}</p>)}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
