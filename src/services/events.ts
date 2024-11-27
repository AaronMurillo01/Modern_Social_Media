import { format } from 'date-fns';

const SEATGEEK_CLIENT_ID = import.meta.env.VITE_SEATGEEK_CLIENT_ID;
const CACHE_KEY = 'events_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface Event {
  id: string;
  name: string;
  date: Date;
  venue: string;
  city: string;
  imageUrl: string;
  url: string;
  attendees: number;
  price?: string;
}

interface CacheData {
  events: Event[];
  timestamp: number;
}

function getCachedEvents(): Event[] | null {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { events, timestamp }: CacheData = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return events.map(event => ({
    ...event,
    date: new Date(event.date)
  }));
}

function cacheEvents(events: Event[]) {
  const cacheData: CacheData = {
    events: events.map(event => ({
      ...event,
      date: event.date.toISOString()
    })),
    timestamp: Date.now()
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    // Check cache first
    const cached = getCachedEvents();
    if (cached) {
      return cached;
    }

    if (!SEATGEEK_CLIENT_ID) {
      console.warn('SeatGeek API key not configured. Using mock data.');
      const mockEvents = getMockEvents();
      cacheEvents(mockEvents);
      return mockEvents;
    }

    const response = await fetch(
      `https://api.seatgeek.com/2/events?` +
      `client_id=${SEATGEEK_CLIENT_ID}&` +
      `venue.city=Albuquerque&` +
      `venue.state=NM&` +
      `per_page=20&` +
      `sort=datetime_local.asc`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.events) {
      throw new Error('Invalid response format');
    }

    const events = data.events.map((event: any) => ({
      id: event.id.toString(),
      name: event.title,
      date: new Date(event.datetime_local),
      venue: event.venue.name,
      city: `${event.venue.city}, ${event.venue.state}`,
      imageUrl: event.performers[0]?.image || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
      url: event.url,
      attendees: Math.floor(Math.random() * 500) + 100,
      price: event.stats.lowest_price && event.stats.highest_price
        ? `$${event.stats.lowest_price} - $${event.stats.highest_price}`
        : 'Price TBA'
    }));

    cacheEvents(events);
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    const mockEvents = getMockEvents();
    cacheEvents(mockEvents);
    return mockEvents;
  }
}

function getMockEvents(): Event[] {
  const now = new Date();
  return [
    {
      id: '1',
      name: 'Albuquerque International Balloon Fiesta',
      date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      venue: 'Balloon Fiesta Park',
      city: 'Albuquerque, NM',
      imageUrl: 'https://images.unsplash.com/photo-1545063914-a1a6ec821c88',
      url: 'https://balloonfiesta.com',
      attendees: 450,
      price: '$15 - $75'
    },
    {
      id: '2',
      name: 'New Mexico State Fair',
      date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      venue: 'Expo New Mexico',
      city: 'Albuquerque, NM',
      imageUrl: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a',
      url: 'https://statefair.exponm.com',
      attendees: 325,
      price: '$12 - $25'
    },
    {
      id: '3',
      name: 'Downtown Growers Market',
      date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      venue: 'Robinson Park',
      city: 'Albuquerque, NM',
      imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9',
      url: 'https://downtowngrowers.org',
      attendees: 200,
      price: 'Free'
    }
  ];
}