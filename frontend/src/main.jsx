import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SOS from './pages/SOS.jsx'
import EmergencyForm from './pages/EmergencyForm.jsx'
import Tracking from './pages/Tracking.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Hospitals from './pages/Hospitals.jsx'
import Alerts from './pages/Alerts.jsx'
import History from './pages/History.jsx'
import AIAssistant from './components/ai/AIAssistant.jsx'

import "leaflet/dist/leaflet.css";
import AmbulanceDashboard from './pages/AmbulanceDashboard.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Police from './pages/Police.jsx'
import Ambulance from './pages/Ambulance.jsx'
import FloodMap from './pages/FloodMap.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/sos',
    element:<SOS/>
  },
  {
    path:'/emergency',
    element:<EmergencyForm/>
  },
  {
    path:'/tracking',
    element:<Tracking/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/hospitals',
    element:<Hospitals/>
  },
  {
    path:'/history',
    element:<History/>
  },
  {
    path:'/alerts',
    element:<Alerts/>
  },
  {
    path:'/settings',
    element:<Settings/>
  },
  {
    path:'/ai',
    element:<AIAssistant/>
  },
  {
  path: "/ambulance-dashboard",
  element: <AmbulanceDashboard />,
  },
  {
    path:"/police",
    element:<Police/>
  },
  {
    path:"/ambulance",
    element:<Ambulance/>
  },
  {
    path:"/flood-map",
    element:<FloodMap/>
  }

])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
