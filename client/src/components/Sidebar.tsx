import {
  LayoutGrid,
  ArrowLeftRight,
  Wallet,
  Target,
  PiggyBank,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, href: "#", active: true },
  { label: "Transactions", icon: ArrowLeftRight, href: "#", active: false },
  { label: "Wallet", icon: Wallet, href: "#", active: false },
  { label: "Goals", icon: Target, href: "#", active: false },
  { label: "Budget", icon: PiggyBank, href: "#", active: false },
  { label: "Analytics", icon: BarChart3, href: "#", active: false },
  { label: "Settings", icon: Settings, href: "#", active: false },
];

export function Sidebar() {
  return (
    <div className="flex flex-col p-4 bg-violet-50 min-w-3xs">
      <h1 className="text-2xl font-bold mb-6">Sidebar</h1>
      <nav>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`flex items-center gap-3 rounded-3xl px-4 py-2.5 text-sm font-medium 
                                ${
                                  item.active
                                    ? "bg-violet-500 text-white"
                                    : "text-stone-900 hover:bg-violet-300"
                                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-stone-900 cursor-pointer mt-auto">
        <LogOut className="h-6 w-6 text-violet-500" />
        Log out
      </button>
    </div>
  );
}
