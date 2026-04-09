import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginAdmin } from '../../services/projects.js';
import { getErrorMessage } from '../../api/client.js';
import { useToast } from '../../contexts/ToastContext.jsx';

export function AdminLogin() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState(null);

  if (localStorage.getItem('portfolio_token')) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setFormError(null);
    try {
      const res = await loginAdmin(email, password);
      if (!res?.token) {
        setFormError('Invalid response from server. Please try again.');
        toast.error('Login failed');
        return;
      }
      localStorage.setItem('portfolio_token', res.token);
      toast.success('Signed in successfully');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = getErrorMessage(err, 'Login failed');
      setFormError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-90 dark:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[length:48px_48px] bg-grid-soft opacity-40 dark:opacity-25" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between px-10 py-14 lg:flex lg:px-14">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-zinc-900 dark:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white shadow-soft">
                HA
              </span>
              Portfolio admin
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-16 font-display text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white"
            >
              Manage projects
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">with confidence.</span>
            </motion.h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Secure JWT access, Cloudinary uploads, and a dashboard tuned for
              fast edits — no hardcoded content on the public site.
            </p>
          </div>
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Hossam Albasuony
          </p>
        </div>

        <div className="flex items-center justify-center px-4 py-16 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-md"
          >
            <div className="card p-8 shadow-glow sm:p-10">
              <div className="lg:hidden">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-display text-sm font-semibold text-zinc-900 dark:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-[10px] font-bold text-white">
                    HA
                  </span>
                  Admin
                </Link>
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-zinc-900 dark:text-white lg:mt-0">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Use the admin email and password from your server{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] dark:bg-zinc-800">
                  .env
                </code>
                .
              </p>

              {formError ? (
                <p
                  role="alert"
                  className="mt-6 rounded-lg border border-red-200/80 bg-red-50 px-3 py-2.5 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
                >
                  {formError}
                </p>
              ) : null}

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="admin-email"
                    className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                  >
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={busy}
                    className="input-field mt-2 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-password"
                    className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={busy}
                    className="input-field mt-2 disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary w-full py-3.5 text-[15px]"
                >
                  {busy ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in…
                    </span>
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
              <Link
                to="/"
                className="mt-8 block text-center text-sm font-medium text-zinc-500 transition hover:text-accent dark:text-zinc-400"
              >
                ← Back to site
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
