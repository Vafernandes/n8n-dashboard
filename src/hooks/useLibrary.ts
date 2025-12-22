import { useEffect, useMemo, useState } from 'react';
import { server } from '../services/server';
import type { LibraryItemData, NoteResponse } from '../types/library';
import { buildLibraryItem, getLibraryCounts } from '../utils/library';

const NOTES_ENDPOINT = '/notes/558899956689';

export const useLibrary = (enabled: boolean) => {
  const [items, setItems] = useState<LibraryItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setItems([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await server.get<NoteResponse[]>(NOTES_ENDPOINT, {
          signal: controller.signal,
        });

        const mappedItems = response.data.map(buildLibraryItem);
        setItems(mappedItems);
      } catch (error) {
        if (controller.signal.aborted) return;
        setError('Não foi possível carregar os itens do WhatsApp.');
      } finally {
        if (controller.signal.aborted) return;
        setLoading(false);
      }
    };

    fetchNotes();

    return () => controller.abort();
  }, [enabled]);

  const counts = useMemo(() => getLibraryCounts(items), [items]);

  return { items, loading, error, counts };
};
