import {
  BellAlertIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  LinkIcon,
  PaperClipIcon,
  UserIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import TagChip from './TagChip';
import type { ItemType } from '../types/library';

const TYPE_ICON: Record<ItemType, JSX.Element> = {
  Links: <LinkIcon className="w-5 h-5" aria-hidden />,
  Lembretes: <BellAlertIcon className="w-5 h-5" aria-hidden />,
  Anotações: <DocumentTextIcon className="w-5 h-5" aria-hidden />,
  Listas: <ClipboardDocumentCheckIcon className="w-5 h-5" aria-hidden />,
  Financeiro: <WalletIcon className="w-5 h-5" aria-hidden />,
  Arquivos: <PaperClipIcon className="w-5 h-5" aria-hidden />,
  Contatos: <UserIcon className="w-5 h-5" aria-hidden />,
  Outros: <EllipsisHorizontalCircleIcon className="w-5 h-5" aria-hidden />,
};

interface LibraryItemProps {
  type: ItemType;
  title: string;
  preview: string;
  tags: string[];
  addedAt: string;
}

const URL_REGEX = /^(https?:\/\/|www\.)/i;

const toHref = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (URL_REGEX.test(trimmed)) {
    return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
  }
  return '';
};

const LibraryItem = ({ type, title, preview, tags, addedAt }: LibraryItemProps) => {
  const primaryHref = toHref(title) || toHref(preview);
  const isLink = type === 'Links' && Boolean(primaryHref);
  const linkClassName =
    'text-base font-semibold leading-tight text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-sm break-all';

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-start gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-accent border border-white/5">
          {TYPE_ICON[type]}
        </span>
        <div className="space-y-1 min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{type}</p>
          <p className="text-base font-semibold leading-tight break-words">{preview}</p>
          {isLink ? (
            <a href={primaryHref} target="_blank" rel="noreferrer" className={linkClassName}>
              {title}
            </a>
          ) : (
            <p className="text-sm text-muted line-clamp-2 break-words">{title}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
      <span className="text-xs text-muted whitespace-nowrap self-end sm:self-auto">{addedAt}</span>
    </div>
  );
};

export default LibraryItem;
