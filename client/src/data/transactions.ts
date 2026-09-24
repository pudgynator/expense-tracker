import { Coffee, ShoppingBag, Bus, Briefcase, Receipt, type LucideIcon } from 'lucide-react';

export type Transaction = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
};

export const transactions: Transaction[] = [
  {
    id: 1,
    name: 'Coffee shop',
    category: 'Food',
    amount: -4.5,
    date: 'Today',
    icon: Coffee,
  },
  {
    id: 2,
    name: 'Grocery store',
    category: 'Shopping',
    amount: -32.8,
    date: 'Yesterday',
    icon: ShoppingBag,
  },
  {
    id: 3,
    name: 'City bus pass',
    category: 'Transport',
    amount: -12,
    date: 'Sep 14',
    icon: Bus,
  },
  {
    id: 4,
    name: 'Monthly salary',
    category: 'Income',
    amount: 3200,
    date: 'Sep 12',
    icon: Briefcase,
  },
  {
    id: 5,
    name: 'Lunch with friends',
    category: 'Food',
    amount: -18.4,
    date: 'Sep 11',
    icon: Coffee,
  },
];

export const categories = ['All', 'Food', 'Shopping', 'Transport', 'Income'];

export const expenseCategories = ['Food', 'Shopping', 'Transport'];

export const categoryIcons: Record<string, LucideIcon> = {
  Food: Coffee,
  Shopping: ShoppingBag,
  Transport: Bus,
  Income: Briefcase,
};

export function iconForCategory(category: string): LucideIcon {
  return categoryIcons[category] ?? Receipt;
}
