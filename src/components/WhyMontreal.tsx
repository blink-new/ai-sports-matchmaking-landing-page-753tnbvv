import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { MapPin, Sun, Snowflake, Users, Building } from 'lucide-react'

const neighborhoods = [
  { name: 'Plateau', courts: 8, players: 145, active: true },
  { name: 'Mile End', courts: 5, players: 98, active: false },
  { name: 'Downtown', courts: 12, players: 203, active: true },
  { name: 'NDG', courts: 6, players: 87, active: false },
  { name: 'Westmount', courts: 10, players: 156, active: true },
]

const seasons = [
  {
    season: 'Summer',
    icon: Sun,
    description: 'Perfect weather for outdoor courts',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
    activities: ['Outdoor Tournaments', 'Park Courts', 'Beach Tennis'],
  },
  {
    season: 'Winter',
    icon: Snowflake,
    description: 'Indoor facilities keep the game going',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    activities: ['Indoor Courts', 'Heated Facilities', 'Winter Leagues'],
  },
]

const WhyMontreal = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Map animation
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 70%',
        },
      }
    )

    // Neighborhood pins animation
    gsap.fromTo(
      '.neighborhood-pin',
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.montreal-map',
          start: 'top 60%',
        },
      }
    )

    // Pulse animation for active neighborhoods
    gsap.to('.active-pin', {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })

    // Season cards animation
    gsap.fromTo(
      '.season-card',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.seasons-section',
          start: 'top 70%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Montréal?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect tennis scene in Canada's cultural capital
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Montreal Map */}
          <div ref={mapRef} className="montreal-map relative">
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Tennis Hotspots
              </h3>
              
              {/* Simplified Montreal Map */}
              <div className="relative bg-blue-100 rounded-xl h-80 overflow-hidden">
                {/* Montreal outline */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  {/* Montreal island shape (simplified) */}
                  <path
                    d="M50 150 Q100 100 200 120 Q300 130 350 150 Q340 200 280 220 Q200 230 120 210 Q70 190 50 150"
                    fill="rgba(34, 197, 94, 0.1)"
                    stroke="rgba(34, 197, 94, 0.3)"
                    strokeWidth="2"
                  />
                  
                  {/* St. Lawrence River */}
                  <path
                    d="M0 180 Q200 190 400 180 L400 300 L0 300 Z"
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                </svg>

                {/* Neighborhood Pins */}
                {neighborhoods.map((neighborhood, index) => (
                  <div
                    key={index}
                    className={`neighborhood-pin ${
                      neighborhood.active ? 'active-pin' : ''
                    } absolute cursor-pointer group`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 2) * 20}%`,
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg flex items-center justify-center ${
                        neighborhood.active
                          ? 'bg-emerald-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                      <h4 className="font-bold text-sm">{neighborhood.name}</h4>
                      <p className="text-xs text-gray-600">{neighborhood.courts} courts</p>
                      <p className="text-xs text-gray-600">{neighborhood.players} players</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-4 flex justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">High Activity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Growing Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Tennis in the City
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6">
                <div className="flex items-center mb-2">
                  <Building className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="font-semibold text-gray-900">50+ Courts</span>
                </div>
                <p className="text-gray-600">Indoor and outdoor facilities across the city</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center mb-2">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="font-semibold text-gray-900">2,500+ Players</span>
                </div>
                <p className="text-gray-600">Active tennis community year-round</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="font-semibold text-gray-900">15 Neighborhoods</span>
                </div>
                <p className="text-gray-600">Courts within walking distance of major areas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seasons Section */}
        <div className="seasons-section">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Year-Round Tennis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seasons.map((season, index) => {
              const IconComponent = season.icon
              return (
                <div key={index} className="season-card group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    {/* Season Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={season.image}
                        alt={season.season}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <IconComponent className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                    </div>

                    {/* Season Content */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{season.season}</h4>
                      <p className="text-gray-600 mb-4">{season.description}</p>
                      
                      <div className="space-y-2">
                        {season.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Explore Montreal Tennis
          </Button>
        </div>
      </div>
    </section>
  )
}

export default WhyMontreal