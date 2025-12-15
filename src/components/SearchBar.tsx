import { MicrophoneIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  placeholder = 'O que você quer encontrar?',
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <div className="w-full glass-panel rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 max-w-3xl mx-auto">
      <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-muted" aria-hidden />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm sm:text-base placeholder:text-muted focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button className="p-2 rounded-full hover:bg-white/5 transition-colors" aria-label="Voice input placeholder">
        <MicrophoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-muted" aria-hidden />
      </button>
    </div>
  );
};

export default SearchBar;
