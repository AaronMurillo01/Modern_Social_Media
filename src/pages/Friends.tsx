import React from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { profiles } from '../data/profiles';

export function Friends() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Friends</h2>
      <div className="grid grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            avatar={profile.avatar}
            name={profile.name}
            subtitle={`${profile.mutualFriends} mutual friends`}
          />
        ))}
      </div>
    </div>
  );
}