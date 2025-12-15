import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import ContextBadge from './ContextBadge';
import TagChip from './TagChip';

export interface RecentItemType {
  id: string;
  type: 'Link' | 'Lembrete' | 'Anotação' | 'Mercado' | 'Evento';
  summary: string;
  tags: string[];
  context: 'Educacional' | 'Compra' | 'Evento' | 'Financeiro' | 'Lazer';
  date: string;
}

const RecentItem = ({ type, summary, tags, context, date }: RecentItemType) => (
  <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{type}</p>
        <p className="mt-1 text-base sm:text-lg font-semibold leading-snug">{summary}</p>
      </div>
      {/* Explicit affordance for jump-off, mimicking Chrome shortcuts */}
      <button className="p-2 rounded-full hover:bg-white/5 transition-colors" aria-label="Open item placeholder">
        <ArrowTopRightOnSquareIcon className="w-5 h-5 text-muted" aria-hidden />
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagChip key={tag} label={tag} />
      ))}
    </div>
    <div className="flex items-center justify-between">
      <ContextBadge context={context} />
      <span className="text-sm text-muted">{date}</span>
    </div>
  </div>
);

export default RecentItem;
