import React from 'react';

interface ProfileCardProps {
  avatar: string;
  name: string;
  subtitle?: string;
  timestamp?: string;
  onClick?: () => void;
}

export function ProfileCard({ avatar, name, subtitle, timestamp, onClick }: ProfileCardProps) {
  return (
    <div 
      className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {timestamp && <span className="text-xs text-gray-400">{timestamp}</span>}
    </div>
  );
}