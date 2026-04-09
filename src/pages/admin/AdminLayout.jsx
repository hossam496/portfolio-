import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const nav = [
  { to: '/admin', label: 'Projects', end: true, icon: FolderIcon },
  { to: '/admin/messages', label: 'Messages', end: true, icon: InboxIcon },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  function logout() {
    localStorage.removeItem('portfolio_token');
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 md:flex">
          <div className="border-b border-zinc-200/80 px-5 py-5 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-[11px] font-bold text-white shadow-soft">
                HA
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-zinc-900 dark:text-white">
                  Dashboard
                </p>
                <p className="text-[11px] text-zinc-500">Hossam Albasuony</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to + item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-accent/10 text-accent shadow-sm ring-1 ring-accent/10'
                        : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
                    }`
                  }
                >
                  <Icon className="h-5 w-5 shrink-0 opacity-80" />
                  {item.label}
                </NavLink>
              );
            })}
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              <ExternalIcon className="h-5 w-5 shrink-0 opacity-80" />
              View site
            </Link>
          </nav>
          <div className="mt-auto space-y-2 border-t border-zinc-200/80 p-3 dark:border-zinc-800">
            <button
              type="button"
              onClick={toggle}
              className="flex w-full items-center gap-3 rounded-xl border border-zinc-200/80 px-3 py-2.5 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              <ThemeIcon className="h-5 w-5" />
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl bg-zinc-900 px-3 py-2.5 text-left text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              <LogoutIcon className="h-5 w-5" />
              Log out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-zinc-200/80 bg-white/80 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 md:hidden">
            <span className="font-display text-sm font-semibold">Admin</span>
            <div className="flex gap-2">
              <Link
                to="/"
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold dark:border-zinc-700"
              >
                Site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900"
              >
                Out
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-zinc-50/80 p-4 dark:bg-zinc-950/50 sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function InboxIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16v12H4V4zM4 16l2 4h12l2-4M9 8h6"
      />
    </svg>
  );
}

function FolderIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
      />
    </svg>
  );
}

function ExternalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 3h7v7M10 14L21 3M21 14v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6"
      />
    </svg>
  );
}

function ThemeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2"
      />
      <circle cx="12" cy="12" r="4" strokeWidth="1.75" />
    </svg>
  );
}

function LogoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H3M10 5l-7 7 7 7M21 3v18"
      />
    </svg>
  );
}
