import type { ItemType, LibraryCounts, LibraryFilter, LibraryItemData, NoteResponse } from '../types/library';

export const INITIAL_LIBRARY_COUNTS: LibraryCounts = {
  total: 0,
  Link: 0,
  Lembrete: 0,
  Anotação: 0,
  Mercado: 0,
};

const mapNoteType = (type: string): ItemType => {
  const normalized = type.toLowerCase();

  if (normalized === 'link') return 'Link';
  if (normalized === 'reminder' || normalized === 'lembrete') return 'Lembrete';
  if (normalized === 'market' || normalized === 'mercado') return 'Mercado';

  return 'Anotação';
};

const formatDate = (value?: string | null) => {
  if (!value) return 'Sem data';

  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const buildLibraryItem = (note: NoteResponse): LibraryItemData => {
  const title = note.metadata?.url || note.userMessage || 'Sem título';
  const preview =
    note.content?.text ||
    note.content?.caption ||
    note.metadata?.url ||
    note.userMessage ||
    'Sem descrição';

  return {
    id: note.mongoId || note.externalId || `${note.userId}-${note.createdAt}`,
    type: mapNoteType(note.type),
    title,
    preview,
    tags: note.metadata?.tags?.filter(Boolean) ?? [],
    addedAt: formatDate(note.createdAt),
  };
};

export const getLibraryCounts = (items: LibraryItemData[]): LibraryCounts =>
  items.reduce((acc, item) => {
    acc[item.type] += 1;
    acc.total += 1;
    return acc;
  }, { ...INITIAL_LIBRARY_COUNTS });

export const filterLibraryItems = (
  items: LibraryItemData[],
  filter: LibraryFilter,
  query: string
) => {
  const normalized = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesType = filter === 'Todas' || item.type === filter;
    const matchesQuery =
      !normalized ||
      item.title.toLowerCase().includes(normalized) ||
      item.preview.toLowerCase().includes(normalized) ||
      item.tags.some((tag) => tag.toLowerCase().includes(normalized));

    return matchesType && matchesQuery;
  });
};
