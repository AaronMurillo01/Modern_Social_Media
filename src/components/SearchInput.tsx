import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
    </div>
  );
}