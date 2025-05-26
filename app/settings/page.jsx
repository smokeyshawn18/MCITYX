'use client';

import { useState } from 'react';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { user, isSignedIn } = useUser();

  const [dob, setDob] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(user?.imageUrl || '');
  const [loading, setLoading] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-sky-200 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <p className="mb-4 text-lg font-semibold">Please sign in to access settings.</p>
        <SignInButton mode='modal' className="bg-black p-2 rounded-2xl text-white" />
      </div>
    );
  }

  async function saveSettings() {
    setLoading(true);
    try {
      // You can connect this with your API to save DOB and avatar URL
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings.');
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setDob('');
    setAvatarUrl(user?.imageUrl || '');
  }

  return (
    <main className="min-h-screen bg-sky-200 dark:bg-gray-900 text-gray-900 dark:text-white px-4 sm:px-8 py-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 space-y-10 transition-colors duration-500">
        <h1 className="text-4xl font-extrabold border-b border-sky-400 pb-4 mb-6 text-sky-700 dark:text-sky-300">
          Settings
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveSettings();
          }}
          className="space-y-6"
        >
          {/* Read-only Profile Info */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Profile Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">First Name</p>
                <p className="bg-gray-100 dark:bg-gray-700 rounded-md p-2">{user?.firstName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Last Name</p>
                <p className="bg-gray-100 dark:bg-gray-700 rounded-md p-2">{user?.lastName}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 text-sm mb-1">Email</p>
                <p className="bg-gray-100 dark:bg-gray-700 rounded-md p-2">{user?.emailAddresses?.[0]?.emailAddress}</p>
              </div>
            </div>
          </section>

          {/* Editable Fields */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Update Info</h2>

            <label className="block">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">Date of Birth</span>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">Avatar URL</span>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full mt-4 border-2 border-sky-500 object-cover"
                />
              )}
            </label>
          </section>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Reset
            </Button>
            <Button type="submit" disabled={loading} className="bg-sky-600 hover:bg-sky-700 text-white">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
