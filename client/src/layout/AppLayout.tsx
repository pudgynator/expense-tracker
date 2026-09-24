import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TransactionsProvider } from '../context/TransactionsContext';

export function AppLayout() {
  return (
    <TransactionsProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </TransactionsProvider>
  );
}
