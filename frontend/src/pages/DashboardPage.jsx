import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import apiClient from '../api/axios'; // Use your configured Axios instance
import { FaTrash } from "react-icons/fa";

const DashboardPage = () => {
    const [events, setEvents] = useState([]); // Store fetched events
    const [filteredEvents, setFilteredEvents] = useState([]); // Store filtered events
    const [loading, setLoading] = useState(true); // Handle loading state
    const [error, setError] = useState(''); // Handle errors

    // States for filter options
    const [selectedCategory, setSelectedCategory] = useState('');
    const [eventType, setEventType] = useState(''); // New state to filter past/upcoming events
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/events'); // Fetch events from the backend
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load events. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Filter the events based on the selected filter criteria
    const filterEvents = () => {
        let filtered = [...events];

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(event => event.category === selectedCategory);
        }

        // Filter by event type (Upcoming or Past)
        if (eventType === 'upcoming') {
            const today = new Date();
            filtered = filtered.filter(event => new Date(event.date) >= today);
        } else if (eventType === 'past') {
            const today = new Date();
            filtered = filtered.filter(event => new Date(event.date) < today);
        }

        // Filter by specific date
        if (selectedDate) {
            filtered = filtered.filter(event => new Date(event.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString());
        }

        setFilteredEvents(filtered);
    };

    // Handle delete event
    const handleDelete = async (eventId) => {
        try {
            // API call to delete the event (this endpoint should exist in your backend)
            await apiClient.delete(`/events/${eventId}`);

            // Filter out the deleted event from the current list
            setEvents(events.filter(event => event.id !== eventId));
            setFilteredEvents(filteredEvents.filter(event => event.id !== eventId));

            alert('Event deleted successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to delete event. Please try again.');
        }
    };

    // Run filter function whenever any filter criteria changes
    useEffect(() => {
        filterEvents();
    }, [selectedCategory, eventType, selectedDate, events]);

    return (
        <div className="p-4 mt-10 flex justify-center items-start h-screen">
            <div className="w-screen max-w-7xl">
                <h1 className="text-2xl font-bold mb-4 text-left">Event Dashboard</h1>

                {/* Filters Section */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Category Filter */}
                    <select
                        className="p-2 border rounded"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Education">Education</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Networking">Networking</option>
                    </select>

                    {/* Show Events Filter (Upcoming / Past) */}
                    <select
                        className="p-2 border rounded"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                    >
                        <option value="">Show Events</option>
                        <option value="upcoming">Upcoming Events</option>
                        <option value="past">Past Events</option>
                    </select>

                    {/* Date Filter */}
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>

                {loading && <p>Loading events...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="border p-4 rounded-lg shadow-lg bg-white relative"
                            >
                                <h2 className="text-lg font-semibold">{event.name}</h2>
                                <p>{event.description}</p>
                                <p>
                                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <p>
                                    <strong>Category:</strong> {event.category}
                                </p>

                                {/* Delete Button (Bin Icon) */}
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    title="Delete Event"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <p>No events to display.</p>
                )}

                {/* Create New Event Button as a Link */}
                <div>
                    <Link to="/create-event">
                        <button className="mt-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Create New Event
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
