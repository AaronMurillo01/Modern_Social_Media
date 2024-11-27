import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle } from 'lucide-react';

export function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      // In a real app, you would make an API call to delete the account
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={user?.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={user?.email}
              />
            </div>
          </div>
        </div>
        
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Make profile private</span>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
                <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email notifications</span>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600">
                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Delete Account</h3>
                <div className="mt-2">
                  <p className="text-sm text-red-700">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete your account? All of your data will be permanently removed.
              This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}