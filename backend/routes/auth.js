import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Using the Mongoose User model
import { compare, hash } from 'bcrypt';

const router = Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if the user already exists by email
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        console.log('Incoming login request:', email);
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ message: 'User not found' }); // User does not exist
        }

        // Compare the password
        console.log('Comparing passwords:', password, user.password);
        const isPasswordValid = await compare(password, user.password);
        console.log('Password valid:', isPasswordValid);
        if (!isPasswordValid) {
            console.log('Invalid password for email:', email);
            return res.status(401).json({ message: 'Invalid credentials' }); // Incorrect password
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Changed from 1h to 24h
        );

        // Respond with the token and user details
        res.status(200).json({
            message: 'Login successful',
            token,
            userId: user._id,
            username: user.username,
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

export default router;
