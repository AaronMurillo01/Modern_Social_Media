import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { Camera, Upload } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function Profile() {
  const { user, updateProfile, isLoading, error } = useAuth();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server here
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        ...data,
        avatar: previewImage || user?.avatar,
      });
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      
      <div className="mb-8">
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={previewImage || user?.avatar}
            alt={user?.name}
            className="w-full h-full rounded-full object-cover"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <button 
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            title="Change profile picture"
          >
            <Camera size={20} />
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Click the camera icon to change your profile picture
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('name')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...register('bio')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            {...register('location')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            {...register('website')}
            type="url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}