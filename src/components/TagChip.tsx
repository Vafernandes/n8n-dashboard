import { clsx } from 'clsx';

interface TagChipProps {
  label: string;
  tone?: 'default' | 'accent';
  active?: boolean;
  onClick?: () => void;
}

const TagChip = ({ label, tone = 'default', active = false, onClick }: TagChipProps) => {
  const Element = onClick ? 'button' : 'span';

  return (
    <Element
      type={onClick ? 'button' : undefined}
      aria-pressed={onClick ? active : undefined}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border transition-colors',
        tone === 'accent'
          ? 'bg-accent/10 text-white border-accent/40 hover:border-accent/60'
          : 'bg-white/5 text-muted border-white/10 hover:border-white/20',
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50',
        active && 'bg-accent/20 text-white border-accent/60'
      )}
    >
      {label}
    </Element>
  );
};

export default TagChip;
