import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Timeline } from './pages/Timeline';
import { Friends } from './pages/Friends';
import { Messages } from './pages/Messages';
import { Saved } from './pages/Saved';
import { Events } from './pages/Events';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-50">
                    <Header />
                    <Sidebar />
                    <main className="md:pl-72 px-4 md:pr-8 pt-20">
                      <div className="max-w-2xl mx-auto py-6">
                        <Routes>
                          <Route path="/" element={<Timeline />} />
                          <Route path="/friends" element={<Friends />} />
                          <Route path="/messages" element={<Messages />} />
                          <Route path="/saved" element={<Saved />} />
                          <Route path="/events" element={<Events />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/profile" element={<Profile />} />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}