import { motion } from 'framer-motion';

function IconBox({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const skills = [
  {
    name: 'React.js',
    level: 85,
    icon: (
      <IconBox>
        <circle cx="12" cy="12" r="2.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </IconBox>
    ),
  },
  {
    name: 'Node.js',
    level: 82,
    icon: (
      <IconBox>
        <path d="M12 3 4 7v10l8 4 8-4V7l-8-4z" />
        <path d="M12 12v9M8 10l4 2 4-2" />
      </IconBox>
    ),
  },
  {
    name: 'Express.js',
    level: 80,
    icon: (
      <IconBox>
        <path d="M4 7h16v10H4z" />
        <path d="M8 11h8M8 15h5" />
      </IconBox>
    ),
  },
  {
    name: 'MongoDB',
    level: 78,
    icon: (
      <IconBox>
        <path d="M12 3c-2 4-3 8-2.5 12 .3 2.2 1 3.8 2.5 6 1.5-2.2 2.2-3.8 2.5-6 .5-4-.5-8-2.5-12z" />
        <path d="M12 21v-9" />
      </IconBox>
    ),
  },
  {
    name: 'Tailwind CSS',
    level: 88,
    icon: (
      <IconBox>
        <path d="M8 9c-2.5 0-4 1.3-4 3.5S7 16 12 16s8-1.5 8-3.5S19.5 9 17 9c-1.3 0-2.5.6-3.5 1.5" />
        <path d="M12 8c2.5 0 4-1.3 4-3.5S15.5 1 11 1 3 3.3 3 5.5" />
      </IconBox>
    ),
  },
  {
    name: 'HTML / CSS / JS',
    level: 90,
    icon: (
      <IconBox>
        <path d="M4 5h16v14H4z" />
        <path d="M8 9h8M8 13h5M8 17h6" />
      </IconBox>
    ),
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-28 bg-gradient-to-b from-transparent via-zinc-50/40 to-transparent py-24 dark:via-zinc-950/40 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="pf-eyebrow">Capabilities</p>
          <h2 className="pf-heading mt-5">Skills & tooling</h2>
          <p className="pf-sub mx-auto">
            A practical stack for modern products — UI polish, API design, and
            persistence that scales.
          </p>
        </motion.div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group pf-skill-card"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-100 dark:bg-accent/15" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-violet-500/10 text-accent ring-1 ring-inset ring-accent/10 transition group-hover:from-accent/20 group-hover:to-violet-500/15">
                  {s.icon}
                </span>
                <div>
                  <p className="font-sans text-base font-semibold text-zinc-900 dark:text-white">
                    {s.name}
                  </p>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Proficiency · {s.level}%
                  </p>
                </div>
              </div>
              <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-zinc-200/90 dark:bg-zinc-800/90">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent via-sky-500 to-violet-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
