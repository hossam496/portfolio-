import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../hooks/useProjects.js';
import { deleteProject } from '../../services/projects.js';
import { getErrorMessage } from '../../api/client.js';
import { useToast } from '../../contexts/ToastContext.jsx';
import { ProjectModal } from '../../components/admin/ProjectModal.jsx';

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-zinc-100 dark:border-zinc-800/80">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-56 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
      </td>
      <td className="px-4 py-4 text-right">
        <div className="ml-auto h-8 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </td>
    </tr>
  );
}

export function AdminProjects() {
  const toast = useToast();
  const { data, loading, error, refetch, total } = useProjects({
    page: 1,
    limit: 100,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busyId, setBusyId] = useState(null);

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(p) {
    setEditing(p);
    setModalOpen(true);
  }

  async function confirmDelete() {
    if (!deleting) return;
    setBusyId(deleting._id);
    try {
      await deleteProject(deleting._id);
      toast.success('Project deleted');
      setDeleting(null);
      refetch();
    } catch (e) {
      toast.error(getErrorMessage(e, 'Delete failed'));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Content
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Create, edit, and remove portfolio entries. Changes sync to the
            public site immediately.
          </p>
        </div>
        <button type="button" onClick={openNew} className="btn-primary shrink-0 px-5 py-2.5">
          Add project
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Total
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-zinc-900 dark:text-white">
            {loading ? '—' : total}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Status
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {error ? 'Sync failed' : loading ? 'Loading…' : 'Connected'}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            API
          </p>
          <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            REST · JWT
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-8 rounded-2xl border border-red-200/80 bg-red-50/90 p-5 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          <p className="font-medium">{error}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 text-sm font-semibold underline underline-offset-2"
          >
            Retry
          </button>
        </div>
      )}

      {loading && !error && (
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950/50 md:block">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-zinc-200/80 bg-zinc-50/90 dark:border-zinc-800 dark:bg-zinc-900/40">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                  Project
                </th>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                  Stack
                </th>
                <th className="px-4 py-3 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading && !error && (
        <div className="mt-10 grid gap-4 md:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="card overflow-hidden"
            >
              <div className="h-36 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-300/90 bg-white/60 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
          </div>
          <p className="mt-4 font-display text-lg font-semibold text-zinc-900 dark:text-white">
            No projects yet
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            Add your first project to populate the public portfolio. You can
            upload cover images via Cloudinary or paste a URL.
          </p>
          <button
            type="button"
            onClick={openNew}
            className="btn-primary mt-8 px-6 py-2.5"
          >
            Create project
          </button>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-card dark:border-zinc-800 dark:bg-zinc-950/50 md:block">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-zinc-200/80 bg-zinc-50/90 dark:border-zinc-800 dark:bg-zinc-900/40">
              <tr>
                <th className="px-4 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">
                  Project
                </th>
                <th className="px-4 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">
                  Technologies
                </th>
                <th className="px-4 py-3.5 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-zinc-100 transition hover:bg-zinc-50/80 last:border-0 dark:border-zinc-800/80 dark:hover:bg-zinc-900/40"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-11 w-16 rounded-lg object-cover ring-1 ring-zinc-200/80 dark:ring-zinc-700"
                      />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          {p.title}
                        </p>
                        <p className="line-clamp-1 text-xs text-zinc-500">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[220px] px-4 py-4 text-xs text-zinc-600 dark:text-zinc-400">
                    {(p.technologies || []).join(', ') || '—'}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      className="mr-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleting(p)}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="mt-8 space-y-4 md:hidden">
          {data.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-36 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-display font-semibold text-zinc-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {p.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    className="btn-secondary flex-1 py-2 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(p)}
                    className="flex-1 rounded-lg border border-red-200 bg-red-50/80 py-2 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={editing}
        onSaved={() => {
          toast.success(editing ? 'Project updated' : 'Project created');
          refetch();
        }}
      />

      {deleting ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card w-full max-w-md p-6 shadow-glow"
          >
            <p className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
              Delete project?
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              &ldquo;{deleting.title}&rdquo; will be removed. This cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleting(null)}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busyId}
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60"
              >
                {busyId ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
