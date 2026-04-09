import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../hooks/useProjects.js';

export function Projects() {
  const [tech, setTech] = useState('');
  const [debounced, setDebounced] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(tech.trim()), 350);
    return () => clearTimeout(t);
  }, [tech]);

  useEffect(() => {
    setPage(1);
  }, [debounced]);

  const { data, loading, error, totalPages, refetch } = useProjects({
    tech: debounced || undefined,
    page,
    limit: 6,
  });

  const onTechInput = useCallback((e) => {
    setTech(e.target.value);
  }, []);

  return (
    <section
      id="projects"
      className="scroll-mt-28 border-t border-zinc-200/50 py-24 dark:border-zinc-800/60 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="pf-eyebrow">Work</p>
            <h2 className="pf-heading mt-5">Selected projects</h2>
            <p className="pf-sub mt-4">
              Loaded live from the API — curated from your admin dashboard, with
              no hardcoded data on the client.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <label className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
              Filter by tech
            </label>
            <input
              type="search"
              value={tech}
              onChange={onTechInput}
              placeholder="e.g. React, MongoDB"
              className="pf-input"
            />
          </div>
        </motion.div>

        {error && (
          <div className="mt-12 rounded-3xl border border-red-200/80 bg-red-50/90 p-6 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            <p className="font-medium">{error}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 inline-flex rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {loading && !error && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="aspect-[16/10] animate-pulse bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-2/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="mt-20 rounded-3xl border border-dashed border-zinc-300/90 bg-zinc-50/40 px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900/25">
            <p className="font-sans text-lg font-semibold text-zinc-900 dark:text-white">
              No projects to show yet
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              Seed the database or add projects from the admin dashboard — they
              will appear here automatically.
            </p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-2xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Previous
            </button>
            <span className="px-3 text-sm tabular-nums font-medium text-zinc-600 dark:text-zinc-400">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-2xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group pf-project-card flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent opacity-90" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="pointer-events-auto flex flex-wrap gap-2">
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl bg-white px-4 py-2 text-xs font-bold text-zinc-900 shadow-lg transition hover:bg-zinc-100"
              >
                Live demo
              </a>
            ) : null}
            {project.githubLink ? (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.technologies || []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-4 border-t border-zinc-100 pt-5 dark:border-zinc-800/80 lg:hidden">
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Live demo →
            </a>
          ) : null}
          {project.githubLink ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-zinc-600 hover:text-accent dark:text-zinc-400"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
