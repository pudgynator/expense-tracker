import type { Response, NextFunction } from 'express';
import { pool } from '../db.js';
import type { AuthenticatedRequest } from '../middleware/auth.js';

export const listExpenses = async (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized. Missing user.' });
  }

  try {
    const result = await pool.query(
      `SELECT id, user_id, category_id, amount, description, date, created_at
       FROM expenses
       WHERE user_id = $1
       ORDER BY date DESC, id DESC`,
      [req.userId]
    );
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
};

export const createExpense = async (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized. Missing user.' });
  }

  const { amount, description, date, category_id } = req.body;

  if (amount === undefined || amount === null || !date) {
    return res
      .status(400)
      .json({ message: 'Please provide amount and date.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO expenses (user_id, category_id, amount, description, date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, category_id, amount, description, date, created_at`,
      [req.userId, category_id ?? null, amount, description ?? null, date]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

export const deleteExpense = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized. Missing user.' });
  }

  const rawId = req.params.id;
  const id = parseInt(typeof rawId === 'string' ? rawId : '', 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid expense id.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
