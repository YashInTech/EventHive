import React from 'react';
import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EventForm from './components/EventForm'; // Import the EventForm component
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
            <Route path="/create-event" element={<EventForm />} /> {/* Add this route */}
        </Routes>
        </>
    );
};

export default App;
