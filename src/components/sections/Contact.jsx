import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactMessage } from '../../services/projects.js';
import { getErrorMessage } from '../../api/client.js';
import { contactSuccess, contactError } from '../../lib/portfolioSwal.js';

const empty = { name: '', email: '', message: '' };

export function Contact() {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const snapshot = { ...form };
    setForm(empty);
    setSending(true);
    try {
      const res = await submitContactMessage(snapshot);
      await contactSuccess(res.message);
    } catch (err) {
      setForm(snapshot);
      await contactError(getErrorMessage(err, 'Failed to send message'));
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-zinc-200/50 py-24 dark:border-zinc-800/60 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="grid gap-14 lg:grid-cols-2 lg:gap-20"
        >
          <div>
            <p className="pf-eyebrow">Contact</p>
            <h2 className="pf-heading mt-5">
              Let&apos;s build{' '}
              <span className="text-accent">something great</span>
            </h2>
            <p className="pf-sub mt-6">
              Have a product idea, a role, or a collaboration in mind? Drop a
              message — I usually reply within one business day.
            </p>
            <dl className="mt-12 space-y-5 text-sm">
              <div className="flex gap-4 rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                <dt className="w-20 shrink-0 font-bold uppercase tracking-wider text-zinc-400">
                  Role
                </dt>
                <dd className="font-medium text-zinc-800 dark:text-zinc-200">
                  MERN Stack Developer
                </dd>
              </div>
              <div className="flex gap-4 rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                <dt className="w-20 shrink-0 font-bold uppercase tracking-wider text-zinc-400">
                  Stack
                </dt>
                <dd className="font-medium text-zinc-800 dark:text-zinc-200">
                  React, Node, Express, MongoDB, Tailwind
                </dd>
              </div>
            </dl>
          </div>
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="pf-card space-y-6"
          >
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                disabled={sending}
                className="pf-input"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                disabled={sending}
                className="pf-input"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                Message
              </label>
              <textarea
                required
                minLength={10}
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                disabled={sending}
                className="pf-input min-h-[140px] resize-y"
              />
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: sending ? 1 : 1.02 }}
              whileTap={{ scale: sending ? 1 : 0.98 }}
              className="pf-btn-primary w-full py-4 text-[15px]"
            >
              {sending ? 'Sending…' : 'Send message'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
