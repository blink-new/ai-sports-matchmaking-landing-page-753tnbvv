import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight } from 'lucide-react'

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const tennisballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Hero entrance animations
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )

    // Floating tennis ball animation
    gsap.to(tennisballRef.current, {
      x: 100,
      y: -50,
      rotation: 360,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })

    // Parallax effect for hero background
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-orange-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="hero-bg absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Tennis Ball */}
      <div
        ref={tennisballRef}
        className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg"
      >
        <div className="absolute inset-2 border-2 border-white rounded-full"></div>
        <div className="absolute inset-4 bg-white rounded-full opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Find Your Perfect{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
            Tennis Match
          </span>{' '}
          in Montréal
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          AI-powered matchmaking. Smart scheduling. Real players near you.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Join Beta
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group px-8 py-6 text-lg font-semibold border-2 border-gray-300 hover:border-emerald-600 transition-all duration-300"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            How It Works
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection