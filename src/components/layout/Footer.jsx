import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-200/60 bg-zinc-50/30 dark:border-zinc-800/60 dark:bg-zinc-950/50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 py-14 sm:flex-row sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center sm:text-left"
        >
          <p className="font-sans text-base font-semibold text-zinc-900 dark:text-white">
            Hossam Albasuony
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} · Crafted with MERN
          </p>
        </motion.div>
        <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
          <a
            href="#projects"
            className="text-zinc-600 transition hover:text-accent dark:text-zinc-400"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-zinc-600 transition hover:text-accent dark:text-zinc-400"
          >
            Contact
          </a>
          <Link
            to="/admin/login"
            className="rounded-full border border-zinc-200/80 px-4 py-2 font-semibold text-accent transition hover:border-accent/40 hover:bg-accent/5 dark:border-zinc-700"
          >
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
