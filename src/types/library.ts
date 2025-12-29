export type ItemType =
  | 'Links'
  | 'Lembretes'
  | 'Anotações'
  | 'Listas'
  | 'Outros';

export type LibraryFilter = 'Todas' | ItemType;

export interface LibraryItemData {
  id: string;
  type: ItemType;
  title: string;
  preview: string;
  tags: string[];
  addedAt: string;
}

export interface NoteResponse {
  mongoId: string;
  userMessage: string | null;
  externalId: string | null;
  userId: string;
  type: string;
  content?: {
    text?: string | null;
    caption?: string | null;
  } | null;
  metadata?: {
    remindAt?: string | null;
    url?: string | null;
    imageUrl?: string | null;
    audioUrl?: string | null;
    duration?: number | null;
    confidence?: number | null;
    tags?: string[] | null;
  } | null;
  status: string;
  source?: {
    channel?: string | null;
    messageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  toolCallId?: string | null;
}

export interface LibraryCounts {
  total: number;
  Links: number;
  Lembretes: number;
  Anotações: number;
  Listas: number;
  Outros: number;
}
