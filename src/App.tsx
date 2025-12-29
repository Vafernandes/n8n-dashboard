import { useEffect, useMemo, useState } from 'react';
import {
  BellAlertIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  LinkIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import CategoryCard from './components/CategoryCard';
import SearchBar from './components/SearchBar';
import TagChip from './components/TagChip';
import LibraryItem from './components/LibraryItem';
import SubscriptionPanel from './components/SubscriptionPanel';
import { subscriptionMock } from './data/subscription';
import { useLibrary } from './hooks/useLibrary';
import type { LibraryFilter } from './types/library';
import { filterLibraryItems } from './utils/library';

function App() {
  const [view, setView] = useState<'home' | 'subscription'>('home');
  const [query, setQuery] = useState('');
  const [libraryType, setLibraryType] = useState<LibraryFilter>('Todas');
  const { items: libraryItems, loading: libraryLoading, error: libraryError, counts: libraryCounts } =
    useLibrary(true);

  useEffect(() => {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  }, []);

  const filteredLibrary = useMemo(
    () => filterLibraryItems(libraryItems, libraryType, query),
    [libraryItems, libraryType, query]
  );

  const categories = useMemo(
    () => [
      { label: 'Total', count: libraryCounts.total, icon: <Squares2X2Icon className="w-6 h-6" aria-hidden /> },
      { label: 'Links', count: libraryCounts.Links, icon: <LinkIcon className="w-6 h-6" aria-hidden /> },
      { label: 'Lembretes', count: libraryCounts.Lembretes, icon: <BellAlertIcon className="w-6 h-6" aria-hidden /> },
      { label: 'Anotações', count: libraryCounts['Anotações'], icon: <DocumentTextIcon className="w-6 h-6" aria-hidden /> },
      { label: 'Listas', count: libraryCounts.Listas, icon: <ClipboardDocumentCheckIcon className="w-6 h-6" aria-hidden /> },
      { label: 'Outros', count: libraryCounts.Outros, icon: <EllipsisHorizontalCircleIcon className="w-6 h-6" aria-hidden /> },
    ],
    [libraryCounts]
  );

  const libraryFilters = useMemo(
    () => [
      { value: 'Todas' as const, label: 'Todas', count: libraryCounts.total },
      { value: 'Links' as const, label: 'Links', count: libraryCounts.Links },
      { value: 'Lembretes' as const, label: 'Lembretes', count: libraryCounts.Lembretes },
      { value: 'Anotações' as const, label: 'Anotações', count: libraryCounts['Anotações'] },
      { value: 'Listas' as const, label: 'Listas', count: libraryCounts.Listas },
      { value: 'Outros' as const, label: 'Outros', count: libraryCounts.Outros },
    ],
    [libraryCounts]
  );

  return (
    <main className="min-h-screen text-white px-4 sm:px-8 pb-16">
      <div className="max-w-6xl mx-auto pt-10 sm:pt-16 flex flex-col gap-10 sm:gap-14">
        <div className="flex justify-between items-center">
          <div />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setView('home')}
              className={`glass-panel rounded-xl px-3 py-2 text-sm border border-white/10 hover:border-white/20 transition-colors ${view === 'home' ? 'border-accent/60' : ''}`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setView('subscription')}
              className={`glass-panel rounded-xl px-3 py-2 text-sm border border-white/10 hover:border-white/20 transition-colors ${view === 'subscription' ? 'border-accent/60' : ''}`}
            >
              Assinatura
            </button>
          </div>
        </div>

        {view === 'subscription' ? (
          <SubscriptionPanel subscription={subscriptionMock} onBack={() => setView('home')} />
        ) : (
          <>
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
                  {libraryFilters.map((filter) => (
                    <TagChip
                      key={filter.value}
                      label={`${filter.label} (${filter.count})`}
                      active={libraryType === filter.value}
                      onClick={() => setLibraryType(filter.value)}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {libraryLoading ? (
                    <p className="text-muted text-sm text-center py-8">Carregando itens do WhatsApp...</p>
                  ) : libraryError ? (
                    <p className="text-muted text-sm text-center py-8">{libraryError}</p>
                  ) : (
                    <>
                      {filteredLibrary.map((item) => (
                        <LibraryItem key={item.id} {...item} />
                      ))}
                      {filteredLibrary.length === 0 && (
                        <p className="text-muted text-sm text-center py-8">Nenhum item neste filtro.</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
