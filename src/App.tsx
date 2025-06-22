import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import AIMatchmaking from './components/AIMatchmaking'
import SmartScheduling from './components/SmartScheduling'
import CommunityEvents from './components/CommunityEvents'
import WhyMontreal from './components/WhyMontreal'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize smooth scrolling
    gsap.config({
      nullTargetWarn: false,
    })

    // Global scroll animations
    gsap.fromTo(
      '.section-fade',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.section-fade',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={appRef} className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <HowItWorks />
      <AIMatchmaking />
      <SmartScheduling />
      <CommunityEvents />
      <WhyMontreal />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default App