import { Link } from 'react-router-dom'
import { FiFileText, FiArrowRight, FiCalendar, FiCheckCircle, FiAlertCircle, FiBook, FiCreditCard, FiUserX, FiAward } from 'react-icons/fi'
import './Legal.css'

const sections = [
  {
    icon: <FiCheckCircle />,
    title: 'Acceptance of Terms',
    content: (
      <>
        <p>By accessing or using the Education Web platform, website, or any of our services, you agree to be bound by these Terms of Service. Please read them carefully before enrolling in any course or creating an account.</p>
        <div className="legal-highlight">
          If you do not agree to these terms, please do not use our platform. Continued use of Education Web constitutes your acceptance of any updates to these terms.
        </div>
        <p>These terms apply to all users including students, instructors, and visitors. We reserve the right to update these terms at any time with reasonable notice provided via email or platform notification.</p>
      </>
    ),
  },
  {
    icon: <FiBook />,
    title: 'Course Enrolment & Access',
    content: (
      <>
        <p>When you enrol in a course on Education Web, the following terms apply to your access and usage:</p>
        <ul>
          <li>Upon successful payment, you receive lifetime access to the enrolled course content</li>
          <li>Course access is granted to the individual account holder only and is non-transferable</li>
          <li>You may access course materials on any device using your registered account credentials</li>
          <li>Downloading course videos for offline viewing is permitted only through our official app</li>
          <li>Sharing login credentials or course content with others is strictly prohibited</li>
          <li>Education Web reserves the right to update course content to keep it current and accurate</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiCreditCard />,
    title: 'Payments & Billing',
    content: (
      <>
        <p>All payments on Education Web are processed securely. The following terms govern all financial transactions:</p>
        <ul>
          <li>Course prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes</li>
          <li>Payments are processed through Razorpay and PayU — both PCI-DSS compliant gateways</li>
          <li>We accept UPI, credit/debit cards, net banking, and popular digital wallets</li>
          <li>EMI options are available on select courses for eligible cards</li>
          <li>Promotional discounts and coupon codes cannot be combined unless explicitly stated</li>
          <li>In case of payment failure, no amount will be deducted; if deducted, it will be refunded within 5–7 business days</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiAward />,
    title: 'Certificates & Intellectual Property',
    content: (
      <>
        <p>Education Web issues certificates of completion to students who successfully finish a course. The following terms apply:</p>
        <ul>
          <li>Certificates are issued digitally upon completing all required modules and assessments</li>
          <li>Certificates are for personal use and may be shared on LinkedIn or included in resumes</li>
          <li>All course content including videos, PDFs, quizzes, and materials are owned by Education Web or respective instructors</li>
          <li>You may not reproduce, distribute, or sell any course content without written permission</li>
          <li>Screen recording or unauthorised copying of course materials is a violation of these terms</li>
        </ul>
        <div className="legal-highlight">
          Certificates issued by Education Web are recognised by our industry partners. They are not equivalent to formal university degrees unless explicitly stated.
        </div>
      </>
    ),
  },
  {
    icon: <FiAlertCircle />,
    title: 'Prohibited Conduct',
    content: (
      <>
        <p>To maintain a safe and productive learning environment, the following activities are strictly prohibited on our platform:</p>
        <ul>
          <li>Creating fake accounts or misrepresenting your identity</li>
          <li>Sharing, reselling, or distributing course content to third parties</li>
          <li>Using automated tools, bots, or scrapers to access platform content</li>
          <li>Posting offensive, discriminatory, or harmful content in forums or reviews</li>
          <li>Attempting to hack, disrupt, or gain unauthorised access to our systems</li>
          <li>Submitting plagiarised work in assignments or assessments</li>
          <li>Engaging in any activity that violates applicable Indian or international laws</li>
        </ul>
        <p>Violation of these terms may result in immediate account suspension without refund.</p>
      </>
    ),
  },
  {
    icon: <FiUserX />,
    title: 'Account Termination',
    content: (
      <>
        <p>Either party may terminate the user account under the following circumstances:</p>
        <ul>
          <li>You may delete your account at any time from your account settings</li>
          <li>Education Web may suspend or terminate accounts that violate these terms</li>
          <li>Upon termination, access to enrolled courses will be revoked</li>
          <li>Refunds upon termination are subject to our Refund Policy</li>
          <li>We reserve the right to retain certain data as required by law even after account deletion</li>
        </ul>
        <p>If you believe your account was terminated in error, please contact our support team within 14 days of termination.</p>
      </>
    ),
  },
]

export default function TermsOfService() {
  return (
    <>
      <div className="legal-hero">
        <div className="legal-hero-tag"><FiFileText /> Legal</div>
        <h1>Terms of Service</h1>
        <p>These terms govern your use of the Education Web platform. By using our services, you agree to these terms in full.</p>
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
            <h3>Have Questions About Our Terms?</h3>
            <p>Our support team is available to clarify any aspect of these terms. Reach out and we'll respond within 24 hours.</p>
            <Link to="/contact" className="legal-cta-btn">Get in Touch <FiArrowRight /></Link>
          </div>
        </div>
      </div>
    </>
  )
}
