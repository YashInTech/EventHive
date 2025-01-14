import React, { useState } from 'react';
import apiClient from '../api/axios'; // Use the configured Axios instance

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newEvent = {
            name: title,
            description,
            date,
            category: category || 'General', // Default to 'General' if no category is selected
            location,
        };

        try {
            console.log('Submitting event data:', newEvent);
            const response = await apiClient.post('/events/create', newEvent); // Axios will add the token
            alert('Event created successfully!');
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setCategory('');
        } catch (err) {
            console.error('Error creating event:', err.response || err.message);
            alert(err.response?.data?.message || 'Error creating event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 mt-10 rounded-lg shadow-lg w-screen max-w-screen-xl">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create Event</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Event Title and Date side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <input placeholder="Event Title"
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Row 2: Location and Category side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <input placeholder="Location"
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select a category</option>
                                <option value="Education">Education</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Networking">Networking</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Description */}
                    <div>
                        <textarea placeholder="Description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="4"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating Event...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
