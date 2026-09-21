import type { Request, Response, NextFunction } from 'express';
import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.'});
    };

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.'});
    };
    try {
        const result = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = $1',
            [email]
        );
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.'});
        };

        const passwordMatches = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid email or password.'});
        };

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET!, { expiresIn: '3h' });
        
        return res.json({ token, user: { id: user.id, name: user.name, email: user.email }});
    } catch (error) {
        return next(error);
    }
}