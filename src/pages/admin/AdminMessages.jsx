import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  fetchMessages,
  deleteContactMessage,
  setMessageRead,
} from '../../services/projects.js';
import { getErrorMessage } from '../../api/client.js';
import { useToast } from '../../contexts/ToastContext.jsx';

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function AdminMessages() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const limit = 15;
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [state, setState] = useState({
    data: [],
    total: 0,
    totalPages: 1,
    loading: true,
    error: null,
  });
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetchMessages({ page, limit, unreadOnly });
      setState({
        data: res.data || [],
        total: res.total,
        totalPages: res.totalPages,
        loading: false,
        error: null,
      });
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: getErrorMessage(e, 'Failed to load messages'),
      }));
    }
  }, [page, limit, unreadOnly]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [unreadOnly]);

  async function onDelete(id) {
    if (!window.confirm('Delete this message?')) return;
    setDeletingId(id);
    try {
      await deleteContactMessage(id);
      toast.success('Message deleted');
      load();
    } catch (e) {
      toast.error(getErrorMessage(e, 'Delete failed'));
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleRead(msg) {
    setUpdatingId(msg._id);
    try {
      await setMessageRead(msg._id, !msg.read);
      setState((s) => ({
        ...s,
        data: s.data.map((m) =>
          m._id === msg._id ? { ...m, read: !m.read } : m
        ),
      }));
      toast.success(msg.read ? 'Marked unread' : 'Marked read');
    } catch (e) {
      toast.error(getErrorMessage(e, 'Update failed'));
    } finally {
      setUpdatingId(null);
    }
  }

  const { data, total, totalPages, loading, error } = state;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Inbox
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Messages
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Contact form submissions from your portfolio site.
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="rounded border-zinc-300 text-accent focus:ring-accent/30 dark:border-zinc-600"
          />
          Unread only
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Total (filter)
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-zinc-900 dark:text-white">
            {loading ? '—' : total}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Page
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {page} / {totalPages || 1}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Per page
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {limit}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-8 rounded-2xl border border-red-200/80 bg-red-50/90 p-5 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          <p className="font-medium">{error}</p>
          <button
            type="button"
            onClick={() => load()}
            className="mt-3 text-sm font-semibold underline underline-offset-2"
          >
            Retry
          </button>
        </div>
      )}

      {loading && !error && (
        <div className="mt-10 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="card h-24 animate-pulse bg-zinc-100/80 dark:bg-zinc-900/50"
            />
          ))}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-300/90 bg-white/60 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
          <p className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
            No messages yet
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            Submissions from the contact form will show up here.
          </p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="mt-10 hidden space-y-3 md:block">
          <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-card dark:border-zinc-800 dark:bg-zinc-950/50">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-200/80 bg-zinc-50/90 dark:border-zinc-800 dark:bg-zinc-900/40">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                    From
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                    Message
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((m) => (
                  <tr
                    key={m._id}
                    className={`border-b border-zinc-100 last:border-0 dark:border-zinc-800/80 ${
                      !m.read ? 'bg-accent/[0.04]' : ''
                    }`}
                  >
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {m.name}
                      </p>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-xs text-accent hover:underline"
                      >
                        {m.email}
                      </a>
                    </td>
                    <td className="max-w-md px-4 py-3 align-top">
                      <p className="line-clamp-3 whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">
                        {m.message}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-xs text-zinc-500">
                      {formatDate(m.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right align-top">
                      <button
                        type="button"
                        disabled={updatingId === m._id}
                        onClick={() => toggleRead(m)}
                        className="mr-2 rounded-lg px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      >
                        {m.read ? 'Unread' : 'Read'}
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === m._id}
                        onClick={() => onDelete(m._id)}
                        className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        {deletingId === m._id ? '…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="mt-6 space-y-4 md:hidden">
          {data.map((m, i) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`card p-4 ${!m.read ? 'ring-1 ring-accent/20' : ''}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    {m.name}
                  </p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs text-accent hover:underline"
                  >
                    {m.email}
                  </a>
                </div>
                <span className="text-[10px] text-zinc-500">
                  {formatDate(m.createdAt)}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-400">
                {m.message}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  disabled={updatingId === m._id}
                  onClick={() => toggleRead(m)}
                  className="btn-secondary flex-1 py-2 text-xs"
                >
                  {m.read ? 'Mark unread' : 'Mark read'}
                </button>
                <button
                  type="button"
                  disabled={deletingId === m._id}
                  onClick={() => onDelete(m._id)}
                  className="flex-1 rounded-lg border border-red-200 bg-red-50/80 py-2 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="btn-secondary disabled:pointer-events-none disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="btn-secondary disabled:pointer-events-none disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
