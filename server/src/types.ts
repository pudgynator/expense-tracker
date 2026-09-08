
export type User = {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
};

export type Category = {
    id: number;
    user_id: number;
    name: string;
    created_at: Date;
};

export type Expense = {
    id: number;
    user_id: number;
    category_id: number | null;
    amount: string;
    description: string | null;
    date: string;
    created_at: Date;
};