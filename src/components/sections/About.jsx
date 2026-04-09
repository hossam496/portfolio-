import { motion } from 'framer-motion';

const bullets = [
  {
    text: 'Component-driven UI with React',
    icon: LayersIcon,
  },
  {
    text: 'REST APIs with Express + JWT',
    icon: ApiIcon,
  },
  {
    text: 'MongoDB schemas & indexing',
    icon: DbIcon,
  },
  {
    text: 'Tailwind-first responsive systems',
    icon: LayoutIcon,
  },
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-zinc-200/50 py-24 dark:border-zinc-800/60 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="pf-card grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <p className="pf-eyebrow">About</p>
            <h2 className="pf-heading mt-5">
              Building products,{' '}
              <span className="text-accent">not just pages</span>
            </h2>
            <p className="pf-sub mt-6">
              I&apos;m Hossam Albasuony — a MERN developer who cares about
              predictable APIs, accessible interfaces, and code that teams can
              extend with confidence.
            </p>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              From validation and error handling to component architecture and
              design tokens, I aim for systems that stay fast and legible as
              they grow.
            </p>
          </div>
          <ul className="flex flex-col justify-center gap-4">
            {bullets.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 rounded-2xl border border-zinc-200/60 bg-white/50 p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="pt-2 text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-200">
                    {item.text}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function LayersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      />
    </svg>
  );
}

function ApiIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h2m4 0h2m4 0h2m4 0h2M8 7v10m8-10v10"
      />
    </svg>
  );
}

function DbIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="1.75" />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"
      />
      <path strokeWidth="1.75" d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function LayoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        strokeWidth="1.75"
      />
      <path strokeWidth="1.75" d="M3 9h18M9 21V9" />
    </svg>
  );
}
