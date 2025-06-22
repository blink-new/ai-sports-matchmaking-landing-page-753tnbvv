import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Mail, Check, Zap } from 'lucide-react'

const CallToAction = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Main CTA animation
    gsap.fromTo(
      '.cta-content',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )

    // Form animation
    gsap.fromTo(
      '.beta-form',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      }
    )

    // Floating benefits animation
    gsap.to('.benefit-badge', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.3,
    })

    // Background particles animation
    gsap.to('.particle', {
      y: -100,
      opacity: 0,
      duration: 4,
      repeat: -1,
      stagger: 0.5,
      ease: 'power2.out',
    })
  }, [])

  useEffect(() => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsValid(emailRegex.test(email))
  }, [email])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      // Success animation
      gsap.to('.submit-button', {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      })
      
      setIsSubmitted(true)
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    } else {
      // Error shake animation
      gsap.to('.email-input', {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 50}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-content text-center">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold mb-6">
            <Zap className="h-4 w-4 mr-2 text-yellow-300" />
            <span>Beta Access Available</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get Early Access –{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Join Our Beta
            </span>{' '}
            Now!
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Be among the first to experience AI-powered tennis matchmaking in Montréal. 
            Limited spots available for our exclusive beta program.
          </p>

          {/* Beta Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              'Free Premium Features',
              'Priority Court Booking',
              'Exclusive Events Access',
              'Direct Feedback Line',
            ].map((benefit, index) => (
              <Badge
                key={index}
                className="benefit-badge bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium"
              >
                <Check className="h-4 w-4 mr-2 text-green-300" />
                {benefit}
              </Badge>
            ))}
          </div>

          {/* Beta Form */}
          <div ref={formRef} className="max-w-md mx-auto">
            <div className="beta-form bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Enter your email to join the beta
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="email-input bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/60 focus:border-white focus:ring-white/50"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="submit-button w-full bg-white text-emerald-600 hover:bg-white/90 font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={!isValid}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Join Beta Waitlist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-sm text-white/70 text-center">
                    No spam, just tennis. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">You're In!</h3>
                  <p className="text-white/80">
                    Welcome to the MatchPoint beta! Check your email for next steps.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-white/70 mb-4">Join 500+ players already on the waitlist</p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`avatar-${i}`}
                  className="w-10 h-10 bg-white/20 rounded-full border-2 border-white/30"
                  style={{ marginLeft: i > 0 ? '-8px' : '0' }}
                />
              ))}
              <div className="flex items-center justify-center w-10 h-10 bg-white/30 rounded-full border-2 border-white/50 ml-2">
                <span className="text-white font-bold text-sm">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction