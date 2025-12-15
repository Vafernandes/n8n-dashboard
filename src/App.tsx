import { useEffect, useMemo, useState } from 'react';
import {
  BookmarkSquareIcon,
  CalendarDaysIcon,
  LinkIcon,
  MegaphoneIcon,
  MoonIcon,
  ShoppingBagIcon,
  SunIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import CategoryCard from './components/CategoryCard';
import SearchBar from './components/SearchBar';
import TagChip from './components/TagChip';
import LibraryItem from './components/LibraryItem';

const libraryItems = [
  {
    id: 'lib-1',
    type: 'Link' as const,
    title: 'Artigo: “IA no atendimento — casos reais”',
    preview: 'Resumo do artigo com exemplos de automações em SAC e follow-up pro time de CX.',
    tags: ['link', 'ia', 'cx'],
    addedAt: 'há 8 min',
  },
  {
    id: 'lib-2',
    type: 'Link' as const,
    title: 'Roteiro Lisboa → Porto (Notion)',
    preview: 'Mapa com cafés, coworkings e trilhas de fim de semana para a viagem.',
    tags: ['viagem', 'mapa', 'link'],
    addedAt: 'há 22 min',
  },
  {
    id: 'lib-3',
    type: 'Link' as const,
    title: 'Template de UX heurísticas',
    preview: 'Checklist com 10 heurísticas e seção de insights para revisões rápidas.',
    tags: ['ux', 'checklist'],
    addedAt: 'há 1 hora',
  },
  {
    id: 'lib-4',
    type: 'Link' as const,
    title: 'Planilha de controle financeiro',
    preview: 'Organização de pagamentos mensais + lembrete de reajuste do coworking.',
    tags: ['financeiro', 'link'],
    addedAt: 'ontem',
  },
  {
    id: 'lib-5',
    type: 'Link' as const,
    title: 'Curadoria de podcasts sobre IA',
    preview: '3 episódios marcados para ouvir no fim de semana.',
    tags: ['podcast', 'ia'],
    addedAt: '2 dias atrás',
  },
  {
    id: 'lib-6',
    type: 'Lembrete' as const,
    title: 'Renovar filtro de água',
    preview: 'Comprar refil junto com a lista de mercado desta semana.',
    tags: ['lembrete', 'casa'],
    addedAt: 'há 3 horas',
  },
  {
    id: 'lib-7',
    type: 'Lembrete' as const,
    title: 'Enviar comprovante do coworking',
    preview: 'Confirmar pagamento e mandar recibo para o administrativo.',
    tags: ['financeiro', 'urgente'],
    addedAt: 'ontem',
  },
  {
    id: 'lib-8',
    type: 'Anotação' as const,
    title: 'Checklist de reunião de quarta',
    preview: 'Q4 pipeline, bugs críticos, owners do lançamento mobile.',
    tags: ['reunião', 'prioridade'],
    addedAt: 'há 30 min',
  },
  {
    id: 'lib-9',
    type: 'Mercado' as const,
    title: 'Lista rápida: café, aveia, frutas vermelhas',
    preview: 'Adicionar filtro de água e granola se tiver promoção.',
    tags: ['mercado', 'compras'],
    addedAt: 'há 2 horas',
  },
];

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [query, setQuery] = useState('');
  const [libraryType, setLibraryType] = useState<'Todas' | 'Link' | 'Lembrete' | 'Anotação' | 'Mercado'>('Todas');

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const libraryCounts = useMemo(
    () =>
      libraryItems.reduce(
        (acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          acc.total += 1;
          return acc;
        },
        { total: 0 } as Record<string, number>
      ),
    []
  );

  const filteredLibrary = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return libraryItems.filter((item) => {
      const matchesType = libraryType === 'Todas' || item.type === libraryType;
      const matchesQuery =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.preview.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized));

      return matchesType && matchesQuery;
    });
  }, [libraryType, query]);

  const categories = [
    { label: 'Total', count: libraryCounts.total, icon: <Squares2X2Icon className="w-6 h-6" aria-hidden /> },
    { label: 'Links', count: libraryCounts.Link ?? 0, icon: <LinkIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Lembretes', count: libraryCounts.Lembrete ?? 0, icon: <MegaphoneIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Anotações', count: libraryCounts['Anotação'] ?? 0, icon: <BookmarkSquareIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Mercado', count: libraryCounts.Mercado ?? 0, icon: <ShoppingBagIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Eventos', count: 0, icon: <CalendarDaysIcon className="w-6 h-6" aria-hidden /> },
  ];

  return (
    <main className="min-h-screen text-white px-4 sm:px-8 pb-16">
      <div className="max-w-6xl mx-auto pt-10 sm:pt-16 flex flex-col gap-10 sm:gap-14">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            className="glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-sm border border-white/10 hover:border-white/20 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <>
                <SunIcon className="w-5 h-5 text-accent" aria-hidden />
                <span>Tema claro</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5 text-accent" aria-hidden />
                <span>Tema escuro</span>
              </>
            )}
          </button>
        </div>

        <header className="text-center space-y-3">
          <p className="section-title">Personal WhatsApp Agent</p>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Continue de onde parou: um hub que categoriza tudo que chega pelo WhatsApp.
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Mensagens, links, lembretes, imagens e áudios são classificados pelo agente em segundos.
            Visualize, filtre e retome qualquer coisa sem precisar lembrar da conversa original.
          </p>
        </header>

        <SearchBar value={query} onChange={setQuery} placeholder="Buscar por título, tag ou trecho salvo" />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title">Categorias e contagem</p>
            <span className="text-muted text-sm">Visão rápida dos itens já classificados</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.label} {...category} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title">Coleção</p>
            <span className="text-muted text-sm">Tudo que já foi classificado pelo agente</span>
          </div>
          <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              <TagChip
                label={`Todas (${libraryCounts.total})`}
                active={libraryType === 'Todas'}
                onClick={() => setLibraryType('Todas')}
              />
              <TagChip
                label={`Links (${libraryCounts.Link ?? 0})`}
                active={libraryType === 'Link'}
                onClick={() => setLibraryType('Link')}
              />
              <TagChip
                label={`Lembretes (${libraryCounts.Lembrete ?? 0})`}
                active={libraryType === 'Lembrete'}
                onClick={() => setLibraryType('Lembrete')}
              />
              <TagChip
                label={`Anotações (${libraryCounts['Anotação'] ?? 0})`}
                active={libraryType === 'Anotação'}
                onClick={() => setLibraryType('Anotação')}
              />
              <TagChip
                label={`Mercado (${libraryCounts.Mercado ?? 0})`}
                active={libraryType === 'Mercado'}
                onClick={() => setLibraryType('Mercado')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {filteredLibrary.map((item) => (
                <LibraryItem key={item.id} {...item} />
              ))}
              {filteredLibrary.length === 0 && (
                <p className="text-muted text-sm text-center py-8">Nenhum item neste filtro.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
