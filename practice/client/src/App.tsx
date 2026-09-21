import { NavLink, Route, Routes } from 'react-router-dom';
import { TodosPage } from './pages/TodosPage.tsx';
import { LiveSearchPage } from './pages/LiveSearchPage.tsx';
import { PaginatedTablePage } from './pages/PaginatedTablePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';

const links = [
  { to: '/', label: 'C1 Todos' },
  { to: '/search', label: 'C2 Live search' },
  { to: '/table', label: 'C3 Paginated table' },
  { to: '/login', label: 'C4 Login' },
  { to: '/profile', label: 'C4 Profile' },
];

function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-violet-500 uppercase">
              Group C practice
            </p>
            <h1 className="text-lg font-bold text-stone-800">
              Fetch + hooks + raw Node
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-medium ${
                    isActive
                      ? 'bg-violet-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<TodosPage />} />
          <Route path="/search" element={<LiveSearchPage />} />
          <Route path="/table" element={<PaginatedTablePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
