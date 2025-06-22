import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Trophy, MapPin } from 'lucide-react'

const events = [
  {
    title: 'Montreal Open Amateur',
    date: 'Feb 15-18, 2024',
    location: 'IGA Stadium',
    participants: 64,
    type: 'Tournament',
    skill: 'All Levels',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop',
  },
  {
    title: 'Weekly Doubles League',
    date: 'Every Saturday',
    location: 'Parc Jarry',
    participants: 32,
    type: 'League',
    skill: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=250&fit=crop',
  },
  {
    title: 'Beginner Clinic',
    date: 'Feb 10, 2024',
    location: 'Parc Jeanne-Mance',
    participants: 16,
    type: 'Clinic',
    skill: 'Beginner',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop',
  },
]

const partners = [
  { name: 'Tennis Canada', logo: 'TC' },
  { name: 'City of Montreal', logo: 'MTL' },
  { name: 'Wilson', logo: 'W' },
  { name: 'HEAD', logo: 'H' },
  { name: 'Babolat', logo: 'B' },
  { name: 'Prince', logo: 'P' },
]

const CommunityEvents = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax background effect
    gsap.to('.events-bg', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Events cards animation
    gsap.fromTo(
      '.event-card',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.events-grid',
          start: 'top 70%',
        },
      }
    )

    // Partners logo animation
    gsap.fromTo(
      '.partner-logo',
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.partners-section',
          start: 'top 80%',
        },
      }
    )

    // Floating animation for event cards
    gsap.to('.event-card', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.5,
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="events-bg absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Community & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join tournaments, leagues, and clinics. Connect with Montreal's vibrant tennis community
          </p>
        </div>

        {/* Events Grid */}
        <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event, index) => (
            <div key={index} className="event-card group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900 font-semibold">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-sm">{event.participants} participants</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {event.skill}
                    </Badge>
                    <Button size="sm" variant="outline" className="text-xs">
                      Join Event
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="partners-section text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-logo group cursor-pointer"
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-2xl font-bold text-gray-700">
                    {partner.logo}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Trophy className="mr-2 h-5 w-5" />
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CommunityEvents