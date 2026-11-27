import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useAuth } from './lib/auth'; 
import Layout from './components/Layout'; 
import Landing from './pages/Landing'; 
import Auth from './pages/Auth'; 
import Dashboard from './pages/Dashboard'; 
import Resume from './pages/Resume'; 
import Quiz from './pages/Quiz'; 
import Coding from './pages/Coding'; 
import Interview from './pages/Interview'; 
import Progress from './pages/Progress'; 
import History from './pages/History'; 
import Profile from './pages/Profile'; 
import NotFound from './pages/NotFound'; 


function Guard({ children }) 
{ 
    const { user, loading } = useAuth(); 
    
    if (loading) return <div className="min-h-screen grid place-items-center">Loading…</div>;
    
    return user ? children : <Navigate to="/login" replace />
 
} 


 export default function App() {
     return <Routes><Route path="/" element={<Landing />} /><Route path="/login" element={<Auth mode="login" />} />
            <Route path="/register" element={<Auth mode="register" />} />
            <Route element={<Guard><Layout /></Guard>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<Resume />} /> 
            <Route path="/quiz" element={<Quiz />} /> 
            <Route path="/coding" element={<Coding />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            </Route><Route path="*" element={<NotFound />} />
            </Routes> }
