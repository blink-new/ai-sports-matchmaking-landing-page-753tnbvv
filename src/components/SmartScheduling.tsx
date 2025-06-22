import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

const timeSlots = [
  { time: '9:00 AM', available: true, court: 'Court 1' },
  { time: '10:00 AM', available: false, court: 'Court 2' },
  { time: '11:00 AM', available: true, court: 'Court 3' },
  { time: '12:00 PM', available: true, court: 'Court 1' },
  { time: '1:00 PM', available: false, court: 'Court 2' },
  { time: '2:00 PM', available: true, court: 'Court 4' },
]

const venues = [
  { name: 'Parc Jarry Tennis Courts', distance: '0.8 km', available: 4 },
  { name: 'Parc Jeanne-Mance', distance: '1.2 km', available: 2 },
  { name: 'IGA Stadium', distance: '2.1 km', available: 6 },
]

const SmartScheduling = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedTime, setSelectedTime] = useState('11:00 AM')
  const [selectedVenue, setSelectedVenue] = useState('Parc Jarry Tennis Courts')

  useEffect(() => {
    // Calendar animation
    gsap.fromTo(
      '.calendar-demo',
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.calendar-demo',
          start: 'top 70%',
        },
      }
    )

    // Time slots stagger animation
    gsap.fromTo(
      '.time-slot',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.time-slots-grid',
          start: 'top 70%',
        },
      }
    )

    // Venue cards animation
    gsap.fromTo(
      '.venue-card',
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.venues-list',
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
            Smart Scheduling
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sync your calendar, find available courts, and book matches seamlessly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Demo */}
          <div className="calendar-demo lg:col-span-1">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-emerald-600" />
                Your Calendar
              </h3>
              
              {/* Mini Calendar */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                <div className="text-center font-semibold text-gray-900 mb-3">January 2024</div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={`weekday-${index}-${day}`} className="text-gray-500 text-center py-1 font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={`calendar-day-${day}`}
                      className={`text-center py-2 rounded cursor-pointer transition-colors ${
                        day === 15 
                          ? 'bg-emerald-600 text-white' 
                          : day === 20 || day === 22 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                  <span>Selected Date</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Available Slots</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                Available Times
              </h3>
              
              <div className="time-slots-grid space-y-3">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`time-slot p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      slot.available
                        ? selectedTime === slot.time
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-25'
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{slot.time}</span>
                      <span className="text-sm text-gray-500">{slot.court}</span>
                    </div>
                    {!slot.available && (
                      <span className="text-xs text-gray-400">Booked</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Venues */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-purple-600" />
                Nearby Venues
              </h3>
              
              <div className="venues-list space-y-4">
                {venues.map((venue, index) => (
                  <div
                    key={index}
                    className={`venue-card p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedVenue === venue.name
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedVenue(venue.name)}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{venue.name}</h4>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{venue.distance}</span>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{venue.available} courts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                size="lg"
              >
                Book Match
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SmartScheduling