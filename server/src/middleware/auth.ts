import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ message: "Unauthorized. Missing or invalid token." });
        return;
    };
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized. Malformed token." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.userId = (decoded as { userId: number }).userId;
        next();
        return;
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized. Invalid token.'});
    }
}