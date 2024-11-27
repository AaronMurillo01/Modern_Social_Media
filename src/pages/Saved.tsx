import React from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { profiles } from '../data/profiles';

export function Saved() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Saved Posts</h2>
      <div className="space-y-4">
        {profiles.slice(0, 2).map((profile) => (
          <div key={profile.id} className="p-4 border rounded-lg hover:bg-gray-50">
            <ProfileCard
              avatar={profile.avatar}
              name={profile.name}
              subtitle="2 days ago"
            />
            <p className="text-gray-600 mt-3 pl-16">
              {profile.id === 1 
                ? "Just discovered this amazing new coffee shop downtown! The atmosphere is incredible and their pastries are to die for. ☕️✨" 
                : "Check out these photos from my recent hiking trip to the mountains! The views were absolutely breathtaking. 🏔️"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}