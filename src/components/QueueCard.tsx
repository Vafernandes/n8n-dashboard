import { ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, PhotoIcon, PlayIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import TagChip from './TagChip';

type Status = 'Nova' | 'Classificada' | 'Agendada';
type Channel = 'WhatsApp' | 'Forward' | 'Agente';

const STATUS_STYLES: Record<Status, string> = {
  Nova: 'bg-amber-500/15 text-amber-100 border-amber-400/40',
  Classificada: 'bg-emerald-500/15 text-emerald-100 border-emerald-400/40',
  Agendada: 'bg-sky-500/15 text-sky-100 border-sky-400/40',
};

const CHANNEL_ICONS: Record<Channel, JSX.Element> = {
  WhatsApp: <ChatBubbleBottomCenterTextIcon className="w-4 h-4" aria-hidden />,
  Forward: <PaperAirplaneIcon className="w-4 h-4" aria-hidden />,
  Agente: <PlayIcon className="w-4 h-4" aria-hidden />,
};

interface QueueCardProps {
  title: string;
  snippet: string;
  tags: string[];
  status: Status;
  channel: Channel;
  time: string;
  attachment?: 'link' | 'imagem' | 'audio';
  confidence?: number;
}

const QueueCard = ({ title, snippet, tags, status, channel, time, attachment, confidence }: QueueCardProps) => (
  <article className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3 hover:border-white/10 transition-colors">
    <header className="flex items-start justify-between gap-3">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">{channel}</p>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-muted line-clamp-2">{snippet}</p>
      </div>
      <span className={clsx('inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border', STATUS_STYLES[status])}>
        {status}
      </span>
    </header>

    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagChip key={tag} label={tag} />
      ))}
      {attachment && (
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-white/10 bg-white/5 text-white">
          {attachment === 'link' && <PaperAirplaneIcon className="w-4 h-4" aria-hidden />}
          {attachment === 'imagem' && <PhotoIcon className="w-4 h-4" aria-hidden />}
          {attachment === 'audio' && <PlayIcon className="w-4 h-4" aria-hidden />}
          {attachment === 'link' ? 'Link' : attachment === 'imagem' ? 'Imagem' : 'Áudio'}
        </span>
      )}
    </div>

    <footer className="flex items-center justify-between text-sm text-muted">
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
          {CHANNEL_ICONS[channel]}
          <span>{channel}</span>
        </span>
        {typeof confidence === 'number' && (
          <span className="px-2 py-1 rounded-full bg-accent/10 border border-accent/30 text-white text-xs">
            Confiança {Math.round(confidence * 100)}%
          </span>
        )}
      </div>
      <span>{time}</span>
    </footer>
  </article>
);

export default QueueCard;
