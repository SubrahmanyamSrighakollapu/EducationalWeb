import { Link } from 'react-router-dom'
import { FiRefreshCw, FiArrowRight, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiDollarSign, FiHelpCircle, FiAlertTriangle } from 'react-icons/fi'
import './Legal.css'

const sections = [
  {
    icon: <FiCheckCircle />,
    title: '7-Day Money-Back Guarantee',
    content: (
      <>
        <p>At Education Web, we stand behind the quality of every course we offer. That is why we provide a <strong>7-day money-back guarantee</strong> on all course purchases — no questions asked.</p>
        <div className="legal-highlight">
          If you are not completely satisfied with your course within 7 days of purchase, contact us at refunds@educationweb.in and we will process a full refund to your original payment method.
        </div>
        <ul>
          <li>Refund requests must be submitted within 7 calendar days of the purchase date</li>
          <li>The refund applies to the full course price including any taxes paid</li>
          <li>No reason is required — we trust our students to make fair use of this policy</li>
          <li>Refunds are processed within 5–7 business days to your original payment method</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiClock />,
    title: 'Refund Eligibility Criteria',
    content: (
      <>
        <p>To be eligible for a refund, the following conditions must be met:</p>
        <ul>
          <li>The refund request is submitted within 7 days of the original purchase date</li>
          <li>Less than 30% of the course content has been consumed or completed</li>
          <li>The course certificate has not been downloaded or issued</li>
          <li>The purchase was made directly through the Education Web platform</li>
          <li>The account has not previously received a refund for the same course</li>
        </ul>
        <h3>Non-Refundable Situations</h3>
        <ul>
          <li>Courses purchased during flash sales or with discount coupons exceeding 50% off</li>
          <li>Requests submitted after the 7-day window has expired</li>
          <li>Courses where the certificate has already been issued and downloaded</li>
          <li>Subscription plans after the first billing cycle</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiDollarSign />,
    title: 'Refund Process & Timeline',
    content: (
      <>
        <p>Once your refund request is approved, here is what you can expect:</p>
        <ul>
          <li><strong>Step 1:</strong> Submit your refund request via email to refunds@educationweb.in with your order ID</li>
          <li><strong>Step 2:</strong> Our team reviews your request within 1–2 business days</li>
          <li><strong>Step 3:</strong> You receive a confirmation email once the refund is approved</li>
          <li><strong>Step 4:</strong> Refund is credited to your original payment method within 5–7 business days</li>
        </ul>
        <div className="legal-highlight">
          UPI and wallet refunds are typically processed within 1–3 business days. Credit/debit card refunds may take up to 7–10 business days depending on your bank.
        </div>
      </>
    ),
  },
  {
    icon: <FiXCircle />,
    title: 'Course Cancellations by Education Web',
    content: (
      <>
        <p>In rare circumstances, Education Web may need to cancel or discontinue a course. In such cases:</p>
        <ul>
          <li>All enrolled students will receive a full refund regardless of course completion percentage</li>
          <li>Students will be notified via email at least 14 days before the course is discontinued</li>
          <li>Where possible, we will offer an equivalent replacement course at no additional cost</li>
          <li>Refunds for cancelled courses are processed automatically within 3–5 business days</li>
          <li>Any certificates already issued will remain valid and verifiable on our platform</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiAlertTriangle />,
    title: 'Special Circumstances',
    content: (
      <>
        <p>We understand that life can be unpredictable. We consider refund requests beyond the standard 7-day window in the following exceptional circumstances:</p>
        <ul>
          <li>Medical emergencies supported by documentation</li>
          <li>Technical issues on our platform that prevented course access for more than 48 hours</li>
          <li>Duplicate purchases made in error within the same session</li>
          <li>Significant discrepancy between the course description and actual content</li>
        </ul>
        <p>Such requests are reviewed on a case-by-case basis by our support team. We aim to be fair and reasonable in all circumstances.</p>
      </>
    ),
  },
  {
    icon: <FiHelpCircle />,
    title: 'Disputes & Escalations',
    content: (
      <>
        <p>If you are not satisfied with the outcome of your refund request, you may escalate the matter:</p>
        <ul>
          <li>Email our escalation team at disputes@educationweb.in with your case reference number</li>
          <li>Escalated cases are reviewed by a senior team member within 3 business days</li>
          <li>If unresolved, disputes may be referred to the Consumer Disputes Redressal Forum under the Consumer Protection Act, 2019</li>
          <li>Education Web is committed to resolving all disputes amicably and in good faith</li>
        </ul>
        <div className="legal-highlight">
          Our goal is 100% student satisfaction. If a course did not meet your expectations, we want to know — your feedback helps us improve.
        </div>
      </>
    ),
  },
]

export default function RefundPolicy() {
  return (
    <>
      <div className="legal-hero">
        <div className="legal-hero-tag"><FiRefreshCw /> Legal</div>
        <h1>Refund Policy</h1>
        <p>We want you to learn with confidence. Our fair and transparent refund policy ensures you are never at risk when investing in your education.</p>
        <div className="legal-hero-meta"><FiCalendar /> Last updated: January 1, 2025</div>
      </div>

      <div className="legal-body">
        <div className="legal-inner">
          {sections.map((s, i) => (
            <div key={i} className="legal-card">
              <div className="legal-card-header">
                <div className="legal-card-icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              {s.content}
            </div>
          ))}

          <div className="legal-contact-cta">
            <h3>Need Help With a Refund?</h3>
            <p>Our support team is ready to assist you. Reach out and we will make sure your issue is resolved quickly and fairly.</p>
            <Link to="/contact" className="legal-cta-btn">Contact Support <FiArrowRight /></Link>
          </div>
        </div>
      </div>
    </>
  )
}
