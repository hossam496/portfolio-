import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/#skills', label: 'Skills' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
];

export function Header() {
  const { theme, toggle } = useTheme();
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-zinc-200/70 bg-white/70 px-3 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/70 dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] sm:h-[3.75rem] sm:px-5">
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-sans text-[1.02rem] font-semibold tracking-tight text-zinc-900 dark:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sky-600 text-[11px] font-bold text-white shadow-lg shadow-accent/30 transition group-hover:shadow-accent/45">
            HA
          </span>
          <span className="hidden sm:inline">
            Hossam<span className="text-accent">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 rounded-full border border-zinc-200/60 bg-zinc-50/80 p-1 dark:border-zinc-800 dark:bg-zinc-900/50 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  if (item.to.startsWith('/#')) {
                    e.preventDefault();
                    const targetId = item.to.replace('/#', '');
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', item.to);
                    }
                  } else if (item.to === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.history.pushState(null, '', '/');
                  }
                }
              }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-600 transition hover:bg-white hover:text-zinc-900 hover:shadow-sm dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/admin/login"
            className="rounded-full border border-zinc-200/80 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-accent/30 hover:text-accent dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            Admin
          </Link>
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-[1.15rem] w-[1.15rem]" />
            ) : (
              <MoonIcon className="h-[1.15rem] w-[1.15rem]" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}

function MobileNav() {
  return (
    <details className="relative">
      <summary className="list-none rounded-xl border border-zinc-200/80 bg-zinc-50 p-2.5 dark:border-zinc-700 dark:bg-zinc-900 [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Menu</span>
        <MenuIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 py-2 shadow-2xl backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-950/95">
        {nav.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                if (item.to.startsWith('/#')) {
                  e.preventDefault();
                  const targetId = item.to.replace('/#', '');
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', item.to);
                  }
                } else if (item.to === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.history.pushState(null, '', '/');
                }
              }
              // Close the details menu
              e.currentTarget.closest('details')?.removeAttribute('open');
            }}
            className="block px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/admin/login"
          className="block border-t border-zinc-100 px-4 py-2.5 text-sm font-semibold text-accent dark:border-zinc-800"
        >
          Admin
        </Link>
      </div>
    </details>
  );
}

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
      <circle cx="12" cy="12" r="4" strokeWidth="2" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
      />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
