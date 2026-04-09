import { api } from '../api/client.js';

export async function fetchProjects({ page = 1, limit = 12, tech } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (tech) params.set('tech', tech);
  const { data } = await api.get(`/api/projects?${params.toString()}`);
  return data;
}

export async function createProject(body) {
  const { data } = await api.post('/api/projects', body);
  return data;
}

export async function updateProject(id, body) {
  const { data } = await api.put(`/api/projects/${id}`, body);
  return data;
}

export async function deleteProject(id) {
  const { data } = await api.delete(`/api/projects/${id}`);
  return data;
}

export async function uploadProjectImage(file) {
  const form = new FormData();
  form.append('image', file);
  const { data } = await api.post('/api/upload', form);
  return data;
}

export async function loginAdmin(email, password) {
  const { data } = await api.post('/api/auth/login', {
    email: String(email ?? '').trim(),
    password,
  });
  return data;
}

export async function fetchMe() {
  const { data } = await api.get('/api/auth/me');
  return data;
}

/** Public contact: persists to MongoDB; optional email via server SMTP. */
export async function submitContactMessage(body) {
  const { data } = await api.post('/api/messages', body);
  return data;
}

/** @deprecated Use submitContactMessage — kept for compatibility */
export async function sendContactMessage(body) {
  return submitContactMessage(body);
}

export async function fetchMessages({ page = 1, limit = 20, unreadOnly } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (unreadOnly) params.set('unreadOnly', 'true');
  const { data } = await api.get(`/api/messages?${params.toString()}`);
  return data;
}

export async function deleteContactMessage(id) {
  const { data } = await api.delete(`/api/messages/${id}`);
  return data;
}

export async function setMessageRead(id, read = true) {
  const { data } = await api.patch(`/api/messages/${id}/read`, { read });
  return data;
}
