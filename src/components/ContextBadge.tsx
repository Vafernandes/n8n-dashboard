const CONTEXT_STYLES: Record<string, string> = {
  Educacional: 'bg-blue-500/15 text-blue-200 border-blue-400/40',
  Compra: 'bg-green-500/15 text-green-200 border-green-400/40',
  Evento: 'bg-purple-500/15 text-purple-200 border-purple-400/40',
  Lazer: 'bg-pink-500/15 text-pink-200 border-pink-400/40',
};

interface ContextBadgeProps {
  context: keyof typeof CONTEXT_STYLES;
}

const ContextBadge = ({ context }: ContextBadgeProps) => (
  <span
    className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${
      CONTEXT_STYLES[context]
    }`}
  >
    {context}
  </span>
);

export default ContextBadge;
