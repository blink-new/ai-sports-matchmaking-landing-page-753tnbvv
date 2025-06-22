import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Developer',
    location: 'Plateau',
    rating: 5,
    text: "MatchPoint helped me find amazing tennis partners when I moved to Montreal. The AI matching is incredibly accurate - I've made great friends and improved my game!",
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Alexandre Dubois',
    role: 'Marketing Manager',
    location: 'Mile End',
    rating: 5,
    text: "C'est fantastique! I love how easy it is to find players at my level. The scheduling feature saved me so much time, and I've joined several tournaments through the app.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Graduate Student',
    location: 'NDG',
    rating: 5,
    text: "As a beginner, I was nervous about finding partners. The community is so welcoming, and the skill-based matching means I always play with people at my level.",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'David Kim',
    role: 'Consultant',
    location: 'Downtown',
    rating: 5,
    text: "The convenience is unmatched. I can book a match, find a court, and play - all within the same app. It's revolutionized how I approach tennis in the city.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Emma Thompson',
    role: 'Teacher',
    location: 'Westmount',
    rating: 5,
    text: "I've been playing tennis for years, but MatchPoint introduced me to a whole new community. The events and tournaments are perfectly organized.",
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  },
]

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Initial testimonial animation
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 70%',
        },
      }
    )

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate testimonial change
    gsap.fromTo(
      '.active-testimonial',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5 }
    )
  }, [currentIndex])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Players Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied players who found their perfect tennis matches
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div ref={carouselRef} className="relative">
          <div className="max-w-4xl mx-auto">
            {/* Featured Testimonial */}
            <div className="active-testimonial bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
              {/* Quote decoration */}
              <div className="absolute top-6 left-6 text-6xl text-emerald-200 font-serif">"</div>
              
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={`featured-star-${i}`} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed font-medium">
                  {currentTestimonial.text}
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="h-16 w-16 border-4 border-emerald-200">
                    <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                    <AvatarFallback>
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-gray-900">{currentTestimonial.name}</h4>
                    <p className="text-gray-600">{currentTestimonial.role}</p>
                    <p className="text-sm text-emerald-600 font-medium">{currentTestimonial.location}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg hover:shadow-xl"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg hover:shadow-xl"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-emerald-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mini Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 opacity-60">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`testimonial-${index}-star-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {testimonial.text.slice(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials