import { clsx } from 'clsx';

interface TagChipProps {
  label: string;
  tone?: 'default' | 'accent';
}

const TagChip = ({ label, tone = 'default' }: TagChipProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border transition-colors',
        tone === 'accent'
          ? 'bg-accent/10 text-white border-accent/40'
          : 'bg-white/5 text-muted border-white/10'
      )}
    >
      {label}
    </span>
  );
};

export default TagChip;
