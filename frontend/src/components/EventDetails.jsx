import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5
});

const EventDetails = () => {
    const [attendeesCount, setAttendeesCount] = useState(0);
    const [connected, setConnected] = useState(socket.connected);
    const eventId = '123';  // The event ID for the room

    useEffect(() => {
        // Handle connection events
        socket.on('connect', () => {
            console.log('Connected to server');
            setConnected(true);
            // Rejoin the event room after reconnection
            socket.emit('joinEvent', eventId);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            setConnected(false);
        });

        // Initial join
        if (socket.connected) {
            socket.emit('joinEvent', eventId);
        }

        // Listen for attendee count updates
        socket.on('updateAttendees', (count) => {
            setAttendeesCount(count);
            console.log(`Attendees updated: ${count}`);
        });

        // Cleanup on component unmount
        return () => {
            // Explicitly leave the event before disconnecting
            socket.emit('leaveEvent');
            socket.off('connect');
            socket.off('disconnect');
            socket.off('updateAttendees');
            console.log('Cleaned up event listeners');
        };
    }, [eventId]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event Details</h1>
            <div className="space-y-2">
                <p>Event ID: {eventId}</p>
                <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
                <p>Number of Attendees: {attendeesCount}</p>
            </div>
        </div>
    );
};

export default EventDetails;