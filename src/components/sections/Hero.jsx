import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-100 dark:opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[length:64px_64px] bg-grid-soft opacity-[0.45] dark:opacity-[0.22]" />
      <div className="pointer-events-none absolute -left-48 top-0 h-[min(520px,80vw)] w-[min(520px,80vw)] rounded-full bg-accent/25 blur-[120px] dark:bg-accent/18" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[min(480px,75vw)] w-[min(480px,75vw)] rounded-full bg-violet-500/20 blur-[100px] dark:bg-violet-600/12" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90%,600px)] w-[min(90%,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-transparent via-accent/5 to-transparent blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pf-eyebrow mb-6"
          >
            Open to opportunities
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="font-sans text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.05]"
          >
            <span className="pf-gradient-text">Hossam Albasuony</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xl font-medium text-zinc-600 dark:text-zinc-300 sm:text-2xl"
          >
            MERN Stack Developer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="pf-sub mt-6 max-w-lg"
          >
            I ship polished interfaces and reliable APIs — React, Node,
            Express, and MongoDB with a focus on clarity, performance, and
            maintainable architecture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pf-btn-primary"
            >
              View projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pf-btn-secondary"
            >
              Get in touch
            </motion.a>
            <Link to="/admin/login" className="pf-btn-ghost">
              Admin
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex flex-1 justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md animate-float">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 via-violet-500/10 to-transparent opacity-60 blur-2xl dark:opacity-40" />
            <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-8 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.2)] backdrop-blur-2xl dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] sm:p-9">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-violet-500/[0.08]" />
              <div className="relative space-y-8">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Experience
                  </p>
                  <p className="mt-3 font-sans text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    1+ year
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    End-to-end features — from UI systems to REST APIs and data
                    modeling.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['React', 'Node', 'Express', 'MongoDB'].map((s) => (
                    <span
                      key={s}
                      className="rounded-2xl border border-zinc-200/70 bg-white/50 px-3 py-3 text-center text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm dark:border-zinc-700/60 dark:bg-zinc-800/40 dark:text-zinc-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
