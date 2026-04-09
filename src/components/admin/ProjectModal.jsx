import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  createProject,
  updateProject,
  uploadProjectImage,
} from '../../services/projects.js';
import { getErrorMessage } from '../../api/client.js';

const empty = {
  title: '',
  description: '',
  image: '',
  technologies: '',
  githubLink: '',
  liveDemo: '',
};

export function ProjectModal({ open, onClose, project, onSaved }) {
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (project) {
      setForm({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        technologies: (project.technologies || []).join(', '),
        githubLink: project.githubLink || '',
        liveDemo: project.liveDemo || '',
      });
    } else {
      setForm(empty);
    }
  }, [open, project]);

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await uploadProjectImage(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      setError(getErrorMessage(err, 'Upload failed'));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const technologies = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      technologies,
      githubLink: form.githubLink.trim(),
      liveDemo: form.liveDemo.trim(),
    };
    try {
      if (project?._id) {
        await updateProject(project._id, payload);
      } else {
        await createProject(payload);
      }
      onSaved?.();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, 'Save failed'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-zinc-950/55 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(ev) => {
            if (ev.target === ev.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 shadow-glow sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-zinc-900 dark:text-white">
                  {project ? 'Edit project' : 'New project'}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Required fields are validated on the server.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              {error ? (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200/80 bg-red-50 px-3 py-2.5 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
                >
                  {error}
                </p>
              ) : null}
              <Field label="Title">
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="input-field"
                />
              </Field>
              <Field label="Description">
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="input-field min-h-[100px] resize-y"
                />
              </Field>
              <Field label="Image URL">
                <input
                  required
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  className="input-field"
                />
                <div className="mt-2">
                  <label className="btn-secondary cursor-pointer px-3 py-2 text-xs">
                    {uploading ? 'Uploading…' : 'Upload image (Cloudinary)'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onFile}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </Field>
              <Field label="Technologies (comma separated)">
                <input
                  value={form.technologies}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, technologies: e.target.value }))
                  }
                  className="input-field"
                  placeholder="React, Node, MongoDB"
                />
              </Field>
              <Field label="GitHub URL (optional)">
                <input
                  value={form.githubLink}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, githubLink: e.target.value }))
                  }
                  className="input-field"
                />
              </Field>
              <Field label="Live demo URL (optional)">
                <input
                  value={form.liveDemo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, liveDemo: e.target.value }))
                  }
                  className="input-field"
                />
              </Field>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary px-5 py-2 text-sm disabled:opacity-60"
                >
                  {busy ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </label>
      {children}
    </div>
  );
}
