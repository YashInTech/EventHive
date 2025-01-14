import express from 'express';
import authRoutes from './auth.js';
import eventRoutes from './event.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);

router.get('/', (req, res) => {
    res.send('API is running');
});

export default router;