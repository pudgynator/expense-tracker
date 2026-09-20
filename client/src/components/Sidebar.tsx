import {
  LayoutGrid,
  ArrowLeftRight,
  Wallet,
  Target,
  PiggyBank,
  BarChart3,
  CircleUserRound,
  LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: LayoutGrid, to: '/' },
  { label: 'Transactions', icon: ArrowLeftRight, to: '/transactions' },
  { label: 'Wallet', icon: Wallet, to: '#' },
  { label: 'Goals', icon: Target, to: '#' },
  { label: 'Budget', icon: PiggyBank, to: '#' },
  { label: 'Analytics', icon: BarChart3, to: '#' },
  { label: 'Profile', icon: CircleUserRound, to: '/profile' },
];

export function Sidebar() {
  return (
    <div className="flex flex-col p-4 bg-violet-50 min-w-3xs">
      <h1 className="text-2xl font-bold mb-6">Sidebar</h1>
      <nav>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.to === '#' ? (
                <span className="flex items-center gap-3 rounded-3xl px-4 py-2.5 text-sm font-medium text-stone-400 cursor-not-allowed">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-3xl px-4 py-2.5 text-sm font-medium ${
                      isActive
                        ? 'bg-violet-500 text-white'
                        : 'text-stone-900 hover:bg-violet-300'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <NavLink
        to="/login"
        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-stone-900 cursor-pointer mt-auto"
      >
        <LogOut className="h-6 w-6 text-violet-500" />
        Log out
      </NavLink>
    </div>
  );
}
