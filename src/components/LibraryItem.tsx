import { BookmarkSquareIcon, LinkIcon, MegaphoneIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import TagChip from './TagChip';

type ItemType = 'Link' | 'Lembrete' | 'Anotação' | 'Mercado';

const TYPE_ICON: Record<ItemType, JSX.Element> = {
  Link: <LinkIcon className="w-5 h-5" aria-hidden />,
  Lembrete: <MegaphoneIcon className="w-5 h-5" aria-hidden />,
  Anotação: <BookmarkSquareIcon className="w-5 h-5" aria-hidden />,
  Mercado: <ShoppingBagIcon className="w-5 h-5" aria-hidden />,
};

interface LibraryItemProps {
  type: ItemType;
  title: string;
  preview: string;
  tags: string[];
  addedAt: string;
}

const LibraryItem = ({ type, title, preview, tags, addedAt }: LibraryItemProps) => (
  <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
    <div className="flex items-start gap-3">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-accent border border-white/5">
        {TYPE_ICON[type]}
      </span>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">{type}</p>
        <p className="text-base font-semibold leading-tight">{title}</p>
        <p className="text-sm text-muted line-clamp-2">{preview}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </div>
    <span className="text-xs text-muted whitespace-nowrap">{addedAt}</span>
  </div>
);

export default LibraryItem;
