import PageBanner from '../../components/PageBanner'
import AboutPage from './AboutPage'

export default function About() {
  return (
    <>
      <PageBanner
        tag="ABOUT US"
        title="Who We Are"
        desc="Empowering learners with industry-ready skills since 2015. Learn from the best, grow beyond limits."
      />
      <AboutPage />
    </>
  )
}
