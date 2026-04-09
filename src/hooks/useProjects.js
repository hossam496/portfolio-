import { useCallback, useEffect, useState } from 'react';
import { fetchProjects } from '../services/projects.js';
import { getErrorMessage } from '../api/client.js';

export function useProjects({ tech, page = 1, limit = 12 } = {}) {
  const [state, setState] = useState({
    data: [],
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetchProjects({ page, limit, tech });
      setState({
        data: res.data || [],
        page: res.page,
        limit: res.limit,
        total: res.total,
        totalPages: res.totalPages,
        loading: false,
        error: null,
      });
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: getErrorMessage(e, 'Failed to load projects'),
      }));
    }
  }, [page, limit, tech]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refetch: load };
}
