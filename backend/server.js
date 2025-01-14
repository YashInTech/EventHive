import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*', // Allow all origins (adjust for production)
    },
});

// Track attendees and socket IDs for each event
const eventData = new Map(); // Using Map for better data structure

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routes
app.use('/api', router);


// Socket.IO logic
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    let currentEventId = null; // Track the current event for this socket

    // Handle joining a specific event room
    socket.on('joinEvent', (eventId) => {
        // Leave previous event if exists
        if (currentEventId) {
            leaveEvent(socket, currentEventId);
        }

        // Join new event
        currentEventId = eventId;
        
        // Initialize event data if doesn't exist
        if (!eventData.has(eventId)) {
            eventData.set(eventId, new Set());
        }
        
        // Add socket ID to event's attendees
        eventData.get(eventId).add(socket.id);
        
        // Join the socket room
        socket.join(eventId);
        
        // Emit updated count to all clients in the event
        const currentCount = eventData.get(eventId).size;
        io.to(eventId).emit('updateAttendees', currentCount);
        
        console.log(`User ${socket.id} joined event ${eventId}. Current attendees: ${currentCount}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        if (currentEventId) {
            leaveEvent(socket, currentEventId);
        }
    });

    // Handle explicit event leaving (e.g., when component unmounts)
    socket.on('leaveEvent', () => {
        if (currentEventId) {
            leaveEvent(socket, currentEventId);
            currentEventId = null;
        }
    });
});

// Helper function to handle leaving an event
function leaveEvent(socket, eventId) {
    const eventAttendees = eventData.get(eventId);
    if (eventAttendees) {
        eventAttendees.delete(socket.id);
        socket.leave(eventId);
        
        // If no attendees left, clean up the event data
        if (eventAttendees.size === 0) {
            eventData.delete(eventId);
        }
        
        // Emit updated count to all clients in the event
        const currentCount = eventAttendees.size;
        io.to(eventId).emit('updateAttendees', currentCount);
        
        console.log(`User ${socket.id} left event ${eventId}. Current attendees: ${currentCount}`);
    }
}

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});