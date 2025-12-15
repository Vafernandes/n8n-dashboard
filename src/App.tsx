import { BookmarkSquareIcon, CalendarDaysIcon, LinkIcon, MegaphoneIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import SearchBar from './components/SearchBar';
import CategoryCard from './components/CategoryCard';
import RecentItem, { RecentItemType } from './components/RecentItem';

const categories = [
  { label: 'Links', count: 18, icon: <LinkIcon className="w-6 h-6" aria-hidden /> },
  { label: 'Lembretes', count: 6, icon: <MegaphoneIcon className="w-6 h-6" aria-hidden /> },
  { label: 'Anotações', count: 12, icon: <BookmarkSquareIcon className="w-6 h-6" aria-hidden /> },
  { label: 'Mercado', count: 9, icon: <ShoppingBagIcon className="w-6 h-6" aria-hidden /> },
  { label: 'Eventos', count: 4, icon: <CalendarDaysIcon className="w-6 h-6" aria-hidden /> },
];

const recentItems: RecentItemType[] = [
  {
    id: '1',
    type: 'Link',
    summary: 'Resumo de UX heurísticas para revisar antes da reunião',
    tags: ['trabalho', 'ux', 'prioridade'],
    context: 'Educacional',
    date: 'há 12 minutos',
  },
  {
    id: '2',
    type: 'Mercado',
    summary: 'Lista rápida: café especial, aveia, frutas vermelhas',
    tags: ['pessoal', 'urgente'],
    context: 'Compra',
    date: 'há 1 hora',
  },
  {
    id: '3',
    type: 'Evento',
    summary: 'Workshop remoto de IA aplicada — quinta, 19h',
    tags: ['estudo', 'online'],
    context: 'Evento',
    date: 'há 3 horas',
  },
  {
    id: '4',
    type: 'Lembrete',
    summary: 'Enviar comprovante do pagamento do coworking',
    tags: ['financeiro'],
    context: 'Financeiro',
    date: 'ontem',
  },
  {
    id: '5',
    type: 'Anotação',
    summary: 'Ideias para roteiro de viagem — Lisboa e Porto',
    tags: ['viagem', 'inspiração', 'lazer'],
    context: 'Lazer',
    date: '2 dias atrás',
  },
];

function App() {
  return (
    <main className="min-h-screen text-white px-4 sm:px-8 pb-16">
      <div className="max-w-6xl mx-auto pt-10 sm:pt-16 flex flex-col gap-10 sm:gap-14">
        <header className="text-center space-y-3">
          <p className="section-title">Personal WhatsApp Agent</p>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Continue onde parou, com um layout inspirado na nova aba do Chrome.
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Tudo o que você enviou pelo WhatsApp fica organizado aqui por contexto, para navegação
            instantânea e sem atrito visual.
          </p>
        </header>

        <SearchBar />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title">Categorias</p>
            <span className="text-muted text-sm">Contadores fictícios para percepção rápida</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.label} {...category} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title">Continuar de onde parei</p>
            <span className="text-muted text-sm">Itinerário visual com contexto e tags</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {recentItems.map((item) => (
              <RecentItem key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
