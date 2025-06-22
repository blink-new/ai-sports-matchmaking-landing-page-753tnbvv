import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Trophy } from 'lucide-react'

const players = [
  {
    id: 1,
    name: 'Sophie Chen',
    skill: 'Intermediate',
    location: 'Plateau',
    availability: 'Weekends',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=150&h=150&fit=crop&crop=face',
    match: 95,
  },
  {
    id: 2,
    name: 'Marc Dubois',
    skill: 'Advanced',
    location: 'Mile End',
    availability: 'Evenings',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    match: 88,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    skill: 'Beginner',
    location: 'NDG',
    availability: 'Mornings',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    match: 92,
  },
  {
    id: 4,
    name: 'Alex Johnson',
    skill: 'Intermediate',
    location: 'Downtown',
    availability: 'Flexible',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    match: 85,
  },
]

const AIMatchmaking = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      }
    )

    // Floating player cards animation
    gsap.fromTo(
      '.player-card',
      { opacity: 0, scale: 0.8, y: 100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: {
          amount: 1.5,
          from: 'random',
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 70%',
        },
      }
    )

    // Continuous floating animation
    gsap.to('.player-card', {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: {
        amount: 2,
        from: 'random',
      },
    })

    // Match percentage animation
    gsap.fromTo(
      '.match-percentage',
      { width: '0%' },
      {
        width: '100%',
        duration: 2,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 60%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Matchmaking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent algorithm finds players who match your skill level, location, and schedule preferences
          </p>
        </div>

        <div ref={cardsRef} className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
          </div>

          {/* Player Cards Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="player-card group cursor-pointer"
                style={{ zIndex: players.length - index }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  {/* Match Percentage */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 font-semibold"
                    >
                      {player.match}% Match
                    </Badge>
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="match-percentage h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                        style={{ width: `${player.match}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16 border-2 border-emerald-200">
                      <AvatarImage src={player.image} alt={player.name} />
                      <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{player.name}</h3>
                      <Badge variant="outline" className="text-sm">
                        {player.skill}
                      </Badge>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="text-sm">{player.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{player.availability}</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Central AI Brain Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Trophy className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIMatchmaking