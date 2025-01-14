import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import authenticateToken from '../middlewares/auth.js';
import Event from '../models/event.js';

const router = Router();

// Create Event
router.post('/create', authenticateToken, async (req, res) => {
    console.log('Headers:', req.headers); // Log the request headers
    console.log('Body:', req.body); // Log the incoming request body

    const { name, description, date, category, location } = req.body;

    if (!name || !description || !date || !location) {
        return res.status(400).json({ message: 'Name, description, date, and location are required' });
    }

    const newEvent = new Event({
        name,
        description,
        date,
        category: category || 'General',
        location,
        organizerId: req.user.userId,
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: savedEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event' });
    }
});

// Get All Events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Fetch events from MongoDB
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// Get Event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Error fetching event' });
    }
});

// Delete Event
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event' });
    }
});

export default router;
