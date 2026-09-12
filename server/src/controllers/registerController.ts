import type { Request, Response } from 'express';
import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.'});
    };

    if (password.length < 8) {
       return res.status(400).json({ message: 'Password must be at least 8 characters long.'});
    };

    try {
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists.'});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email', 
            [name, email, passwordHash]
        );

        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '3h' });

        return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email }});
    } catch (error) {
        return res.status(500).json({ message: 'Server error. Could not register user.'});
    }
};
