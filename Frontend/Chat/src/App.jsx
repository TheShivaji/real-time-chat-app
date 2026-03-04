import React, { Profiler, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import { HomePage } from "./pages/HomePage"
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore.js'
import MyLoaderComponent from './components/MyLoaderComponenet.jsx'
import { Navigate } from 'react-router-dom'

import { Toaster } from 'sonner';
import Footer from './components/Footer.jsx'
import { useThemeStore } from './store/useTheamStore.js'
export const App = () => {
  const { authUser, checkauth, ischecking } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkauth()
  }, [checkauth])
  console.log({ authUser })
  if (ischecking && !authUser) {
    return (
      <MyLoaderComponent />
    )
  }
  return (
    <div data-theme={theme} className="min-h-screen transition-colors duration-300">
      <Navbar />

      <Toaster position="top-center" theme="dark" />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
