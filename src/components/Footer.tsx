import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Twitter, 
  Linkedin,
  Facebook,
  Heart,
  Zap
} from 'lucide-react'

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null)
  const skylineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Footer fade-in animation
    gsap.fromTo(
      '.footer-content',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
      }
    )

    // Social icons hover animation
    gsap.set('.social-icon', { scale: 1 })
    
    // Montreal skyline animation
    gsap.to('.skyline-building', {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.3,
    })

    // Pulsing logo animation
    gsap.to('.logo-pulse', {
      scale: 1.05,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })
  }, [])

  const handleSocialHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      rotation: 5,
      duration: 0.3,
      ease: 'back.out(1.7)',
    })
  }

  const handleSocialLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'back.out(1.7)',
    })
  }

  return (
    <footer ref={footerRef} className="relative bg-gray-900 text-white overflow-hidden">
      {/* Montreal Skyline */}
      <div ref={skylineRef} className="absolute top-0 left-0 right-0 h-32 opacity-20">
        <svg viewBox="0 0 1200 200" className="w-full h-full">
          {/* Simplified Montreal skyline silhouette */}
          <rect className="skyline-building" x="100" y="80" width="40" height="120" fill="currentColor" />
          <rect className="skyline-building" x="150" y="60" width="30" height="140" fill="currentColor" />
          <rect className="skyline-building" x="190" y="90" width="35" height="110" fill="currentColor" />
          <rect className="skyline-building" x="235" y="50" width="50" height="150" fill="currentColor" />
          <rect className="skyline-building" x="295" y="70" width="25" height="130" fill="currentColor" />
          <rect className="skyline-building" x="330" y="40" width="60" height="160" fill="currentColor" />
          <rect className="skyline-building" x="400" y="85" width="30" height="115" fill="currentColor" />
          <rect className="skyline-building" x="440" y="65" width="40" height="135" fill="currentColor" />
          <rect className="skyline-building" x="490" y="45" width="45" height="155" fill="currentColor" />
          <rect className="skyline-building" x="545" y="75" width="35" height="125" fill="currentColor" />
          <rect className="skyline-building" x="590" y="55" width="50" height="145" fill="currentColor" />
          <rect className="skyline-building" x="650" y="80" width="30" height="120" fill="currentColor" />
          <rect className="skyline-building" x="690" y="60" width="40" height="140" fill="currentColor" />
          <rect className="skyline-building" x="740" y="90" width="25" height="110" fill="currentColor" />
          <rect className="skyline-building" x="775" y="50" width="55" height="150" fill="currentColor" />
          <rect className="skyline-building" x="840" y="70" width="35" height="130" fill="currentColor" />
          <rect className="skyline-building" x="885" y="85" width="30" height="115" fill="currentColor" />
          <rect className="skyline-building" x="925" y="45" width="45" height="155" fill="currentColor" />
          <rect className="skyline-building" x="980" y="65" width="40" height="135" fill="currentColor" />
          <rect className="skyline-building" x="1030" y="80" width="30" height="120" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="footer-content lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="logo-pulse w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">MatchPoint</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered tennis matchmaking connecting players across Montréal. 
              Find your perfect match, book courts, and join the community.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
              ].map((social, index) => {
                const IconComponent = social.icon
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={`social-icon p-2 text-gray-400 ${social.color} transition-colors duration-300`}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Product Column */}
          <div className="footer-content">
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                'How It Works',
                'AI Matching',
                'Court Booking',
                'Community Events',
                'Mobile App',
                'Pricing',
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-content">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                'About Us',
                'Careers',
                'Press Kit',
                'Partners',
                'Contact',
                'Blog',
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-content">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">
                    1234 Rue Saint-Catherine<br />
                    Montréal, QC H3G 1P1<br />
                    Canada
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <a href="mailto:hello@matchpoint.ca" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                  hello@matchpoint.ca
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+15141234567" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                  +1 (514) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-content border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 MatchPoint. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                  Terms of Service
                </a>
              </div>
            </div>
            
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" />
              <span>in Montréal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer