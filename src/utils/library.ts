import type { ItemType, LibraryCounts, LibraryFilter, LibraryItemData, NoteResponse } from '../types/library';

export const INITIAL_LIBRARY_COUNTS: LibraryCounts = {
  total: 0,
  Links: 0,
  Lembretes: 0,
  Anotações: 0,
  Listas: 0,
  Financeiro: 0,
  Arquivos: 0,
  Contatos: 0,
  Outros: 0,
};

const mapNoteType = (type: string): ItemType => {
  const normalized = type.toLowerCase();

  if (['link', 'links', 'url', 'website', 'site'].includes(normalized)) return 'Links';
  if (['reminder', 'lembrete', 'alerta', 'alarme', 'alert'].includes(normalized)) return 'Lembretes';
  if (['note', 'notes', 'anotação', 'anotacoes', 'anotações', 'anotacao', 'texto', 'text'].includes(normalized))
    return 'Anotações';
  if (['list', 'lista', 'listas', 'checklist', 'tarefas', 'todo'].includes(normalized)) return 'Listas';
  if (['finance', 'financeiro', 'pagamento', 'payment', 'conta', 'billing'].includes(normalized))
    return 'Financeiro';
  if (['file', 'files', 'arquivo', 'arquivos', 'documento', 'document'].includes(normalized)) return 'Arquivos';
  if (['contact', 'contato', 'contatos', 'pessoa', 'cliente', 'lead'].includes(normalized)) return 'Contatos';
  if (['other', 'outro', 'outros', 'misc', 'diverso'].includes(normalized)) return 'Outros';

  return 'Outros';
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
