import React, { Profiler, useEffect } from 'react'
import { Routes , Route} from "react-router-dom"
import Navbar from './components/Navbar'
import { HomePage } from "./pages/HomePage"
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import {useAuthStore} from './store/useAuthStore.js'
import MyLoaderComponent from './components/MyLoaderComponenet.jsx'
export const App = () => {
  const {authUser , checkauth , ischecking} = useAuthStore();
  useEffect(() => {
    checkauth()
  }, [checkauth])
  console.log({authUser})
if(ischecking && !authUser){
return (
  <MyLoaderComponent/>
)}
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element = {authUser ? <HomePage/> : <Navigate to="/login"/> }/ >
        <Route path="/sigup" element = {!authUser ?<SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element= {!authUser ?<LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/setting" element={<SettingPage/>}/>
        <Route path = "/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )}
export default App
