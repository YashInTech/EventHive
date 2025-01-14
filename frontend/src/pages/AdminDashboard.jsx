import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                    },
                });
                setEvents(response.data);
            } catch (err) {
                console.error('Error fetching events:', err);
                alert('Failed to fetch events.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>All Events</h3>
            {loading ? (
                <p>Loading events...</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h4>{event.name}</h4>
                            <p>{event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Location: {event.location}</p>
                            <p>Category: {event.category || 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;