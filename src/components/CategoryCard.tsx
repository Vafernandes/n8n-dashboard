import type { ReactNode } from 'react';

interface CategoryCardProps {
  label: string;
  count: number;
  icon: ReactNode;
}

const CategoryCard = ({ label, count, icon }: CategoryCardProps) => {
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3 hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-xl bg-white/5 text-accent">
          {icon}
        </div>
        <span className="text-xs font-medium text-muted">{count} items</span>
      </div>
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-sm text-muted">Quick glance counter to guide navigation.</p>
    </div>
  );
};

export default CategoryCard;
