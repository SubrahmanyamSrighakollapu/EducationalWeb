import { Link } from 'react-router-dom'
import { FiShield, FiMail, FiArrowRight, FiCalendar, FiLock, FiEye, FiDatabase, FiUserCheck, FiGlobe, FiTrash2 } from 'react-icons/fi'
import './Legal.css'

const sections = [
  {
    icon: <FiEye />,
    title: 'Information We Collect',
    content: (
      <>
        <p>When you register or interact with Education Web, we collect the following types of information to provide you with the best learning experience:</p>
        <ul>
          <li>Full name, email address, and contact number provided during registration</li>
          <li>Profile information such as your learning goals, preferred language, and educational background</li>
          <li>Payment details processed securely through our payment gateway partners (we do not store card numbers)</li>
          <li>Course progress, quiz scores, assignment submissions, and completion certificates</li>
          <li>Device information, browser type, IP address, and usage analytics collected automatically</li>
          <li>Communications you send us via email, chat, or support tickets</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiDatabase />,
    title: 'How We Use Your Information',
    content: (
      <>
        <p>Your information is used solely to improve your experience on our platform and to operate our services effectively:</p>
        <ul>
          <li>Create and manage your student account and personalise your dashboard</li>
          <li>Process course enrolments, payments, and issue certificates of completion</li>
          <li>Send course updates, assignment reminders, and important account notifications</li>
          <li>Provide customer support and respond to your queries promptly</li>
          <li>Analyse platform usage to improve course content and user experience</li>
          <li>Send promotional offers and new course announcements (you may opt out at any time)</li>
          <li>Comply with legal obligations and prevent fraudulent activity</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiLock />,
    title: 'Data Security',
    content: (
      <>
        <p>We take the security of your personal data seriously and implement industry-standard measures to protect it:</p>
        <div className="legal-highlight">
          All data transmitted between your browser and our servers is encrypted using SSL/TLS technology. Payment transactions are processed through PCI-DSS compliant payment gateways.
        </div>
        <ul>
          <li>All passwords are hashed using bcrypt and never stored in plain text</li>
          <li>Access to personal data is restricted to authorised personnel only</li>
          <li>Regular security audits and vulnerability assessments are conducted</li>
          <li>Data backups are encrypted and stored in secure, geographically distributed servers</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiGlobe />,
    title: 'Cookies & Tracking',
    content: (
      <>
        <p>We use cookies and similar tracking technologies to enhance your browsing experience and understand how our platform is used:</p>
        <ul>
          <li><strong>Essential cookies</strong> — required for the platform to function, including login sessions and cart data</li>
          <li><strong>Analytics cookies</strong> — help us understand which pages are visited most and how users navigate the site</li>
          <li><strong>Preference cookies</strong> — remember your language, theme, and display settings</li>
          <li><strong>Marketing cookies</strong> — used to show relevant course recommendations and promotions</li>
        </ul>
        <p>You can manage or disable cookies through your browser settings. Note that disabling essential cookies may affect platform functionality.</p>
      </>
    ),
  },
  {
    icon: <FiUserCheck />,
    title: 'Sharing Your Information',
    content: (
      <>
        <p>We do not sell, rent, or trade your personal information to third parties. We may share data only in the following limited circumstances:</p>
        <ul>
          <li>With payment processors (Razorpay, PayU) to complete transactions securely</li>
          <li>With course instructors to track student progress and issue certificates</li>
          <li>With analytics providers (Google Analytics) in anonymised, aggregated form</li>
          <li>With law enforcement or regulatory authorities when required by law</li>
          <li>With service providers who assist in operating our platform under strict confidentiality agreements</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FiTrash2 />,
    title: 'Your Rights & Data Deletion',
    content: (
      <>
        <p>You have full control over your personal data. As a user of Education Web, you have the right to:</p>
        <ul>
          <li>Access a copy of all personal data we hold about you</li>
          <li>Correct inaccurate or incomplete information in your profile</li>
          <li>Request deletion of your account and all associated personal data</li>
          <li>Withdraw consent for marketing communications at any time</li>
          <li>Data portability — receive your data in a structured, machine-readable format</li>
          <li>Lodge a complaint with the relevant data protection authority</li>
        </ul>
        <p>To exercise any of these rights, please contact us at <strong>privacy@educationweb.in</strong>. We will respond within 30 days.</p>
      </>
    ),
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <div className="legal-hero">
        <div className="legal-hero-tag"><FiShield /> Legal</div>
        <h1>Privacy Policy</h1>
        <p>We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
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
            <h3>Questions About Your Privacy?</h3>
            <p>If you have any questions about this Privacy Policy or how we handle your data, our team is here to help.</p>
            <Link to="/contact" className="legal-cta-btn">Contact Us <FiArrowRight /></Link>
          </div>
        </div>
      </div>
    </>
  )
}
