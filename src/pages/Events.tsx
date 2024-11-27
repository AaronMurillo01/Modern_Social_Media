import React from 'react';
import { Calendar as CalendarIcon, MapPin, Users, ExternalLink, Clock } from 'lucide-react';
import { format, addDays } from 'date-fns';

const events = [
  {
    id: '1',
    name: 'Albuquerque International Balloon Fiesta',
    description: 'Experience the world\'s largest hot air balloon festival with hundreds of colorful balloons filling the morning sky.',
    date: addDays(new Date(), 7),
    time: '6:00 AM - 10:00 PM',
    venue: 'Balloon Fiesta Park',
    address: '5000 Balloon Fiesta Parkway NE, Albuquerque, NM 87113',
    imageUrl: 'https://images.unsplash.com/photo-1545063914-a1a6ec821c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80',
    attendees: 450,
    price: '$15 - $75',
    tags: ['Festival', 'Outdoor', 'Family-Friendly']
  },
  {
    id: '2',
    name: 'New Mexico State Fair',
    description: 'Annual state fair featuring exhibits, livestock shows, carnival rides, food vendors, and live entertainment.',
    date: addDays(new Date(), 14),
    time: '10:00 AM - 9:00 PM',
    venue: 'Expo New Mexico',
    address: '300 San Pedro Dr NE, Albuquerque, NM 87108',
    imageUrl: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80',
    attendees: 325,
    price: '$12 - $25',
    tags: ['Fair', 'Entertainment', 'Food']
  },
  {
    id: '3',
    name: 'Downtown Growers\' Market',
    description: 'Local farmers market featuring fresh produce, artisanal goods, live music, and community activities.',
    date: addDays(new Date(), 3),
    time: '8:00 AM - 12:00 PM',
    venue: 'Robinson Park',
    address: '8th and Central SW, Albuquerque, NM 87102',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80',
    attendees: 200,
    price: 'Free',
    tags: ['Market', 'Local', 'Food']
  }
];

export function Events() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-2">Upcoming Events in Albuquerque</h2>
        <p className="text-gray-600">Discover the best local events happening in your area</p>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-[300px] w-full">
              <img
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-block bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                <p className="text-white/90 line-clamp-2">{event.description}</p>
              </div>
            </div>
              
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon size={18} className="text-blue-500 flex-shrink-0" />
                      <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-blue-500 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-blue-600">
                    {event.price}
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin size={18} className="text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium">{event.venue}</div>
                    <div className="text-gray-500 text-sm">{event.address}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Users size={18} className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{event.attendees} people interested</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 group"
                >
                  <span>View Details</span>
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}