import { useEffect, useMemo, useState } from 'react';
import { server } from './services/server';
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
import SubscriptionPanel from './components/SubscriptionPanel';

type ItemType = 'Link' | 'Lembrete' | 'Anotação' | 'Mercado';

interface LibraryItemData {
  id: string;
  type: ItemType;
  title: string;
  preview: string;
  tags: string[];
  addedAt: string;
}

interface NoteResponse {
  mongoId: string;
  userMessage: string | null;
  externalId: string | null;
  userId: string;
  type: string;
  content?: {
    text?: string | null;
    caption?: string | null;
  } | null;
  metadata?: {
    remindAt?: string | null;
    url?: string | null;
    imageUrl?: string | null;
    audioUrl?: string | null;
    duration?: number | null;
    confidence?: number | null;
    tags?: string[] | null;
  } | null;
  status: string;
  source?: {
    channel?: string | null;
    messageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  toolCallId?: string | null;
}

const mapNoteType = (type: string): ItemType => {
  const normalized = type.toLowerCase();

  if (normalized === 'link') return 'Link';
  if (normalized === 'reminder' || normalized === 'lembrete') return 'Lembrete';
  if (normalized === 'market' || normalized === 'mercado') return 'Mercado';

  return 'Anotação';
};

const formatDate = (value?: string | null) => {
  if (!value) return 'Sem data';

  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const buildLibraryItem = (note: NoteResponse): LibraryItemData => {
  const title = note.metadata?.url || note.userMessage || 'Sem título';
  const preview =
    note.content?.text ||
    note.content?.caption ||
    note.metadata?.url ||
    note.userMessage ||
    'Sem descrição';

  return {
    id: note.mongoId || note.externalId || `${note.userId}-${note.createdAt}`,
    type: mapNoteType(note.type),
    title,
    preview,
    tags: note.metadata?.tags?.filter(Boolean) ?? [],
    addedAt: formatDate(note.createdAt),
  };
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [password, setPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [view, setView] = useState<'home' | 'subscription'>('home');
  const [query, setQuery] = useState('');
  const [libraryType, setLibraryType] = useState<'Todas' | 'Link' | 'Lembrete' | 'Anotação' | 'Mercado'>('Todas');
  const [libraryItems, setLibraryItems] = useState<LibraryItemData[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated) return;

    let isMounted = true;

    const fetchNotes = async () => {
      setLibraryLoading(true);
      setLibraryError(null);

      try {
        const response = await server.get<NoteResponse[]>('/notes/558899956689');

        if (!isMounted) return;

        const items = response.data.map(buildLibraryItem);
        setLibraryItems(items);
      } catch (error) {
        if (!isMounted) return;
        setLibraryError('Não foi possível carregar os itens do WhatsApp.');
      } finally {
        if (!isMounted) return;
        setLibraryLoading(false);
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

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
    [libraryItems]
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
  }, [libraryItems, libraryType, query]);

  const categories = [
    { label: 'Total', count: libraryCounts.total, icon: <Squares2X2Icon className="w-6 h-6" aria-hidden /> },
    { label: 'Links', count: libraryCounts.Link ?? 0, icon: <LinkIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Lembretes', count: libraryCounts.Lembrete ?? 0, icon: <MegaphoneIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Anotações', count: libraryCounts['Anotação'] ?? 0, icon: <BookmarkSquareIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Mercado', count: libraryCounts.Mercado ?? 0, icon: <ShoppingBagIcon className="w-6 h-6" aria-hidden /> },
    { label: 'Eventos', count: 0, icon: <CalendarDaysIcon className="w-6 h-6" aria-hidden /> },
  ];

  const showLogin = !isAuthenticated;
  const subscription = {
    status: 'Ativa',
    renewal: '15/12/2024',
    plan: 'Pro',
    paymentMethod: 'Visa •••• 4242',
    nextCharge: 'R$ 39,90',
    invoices: [
      { id: 'fatura-101', date: '15/09/2024', amount: 'R$ 39,90', status: 'Paga' },
      { id: 'fatura-102', date: '15/10/2024', amount: 'R$ 39,90', status: 'Paga' },
      { id: 'fatura-103', date: '15/11/2024', amount: 'R$ 39,90', status: 'Paga' },
    ],
  } as const;

  return (
    <main className="min-h-screen text-white px-4 sm:px-8 pb-16">
      <div className="max-w-6xl mx-auto pt-10 sm:pt-16 flex flex-col gap-10 sm:gap-14">
        <div className="flex justify-between items-center">
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

          {!showLogin && (
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
              <button
                type="button"
                onClick={() => {
                  setIsAuthenticated(false);
                  setView('home');
                }}
                className="glass-panel rounded-xl px-3 py-2 text-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>

        {showLogin ? (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="section-title">Personal WhatsApp Agent</p>
              <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
                Entre para ver suas categorias, contagens e tudo que o agente organizou.
              </h1>
              <p className="text-muted">
                Depois de logar você encontra um painel com filtros, categorias e coleção completa do que já foi
                classificado a partir do WhatsApp.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <button
                  type="button"
                  className={`px-3 py-2 rounded-lg transition-colors ${authMode === 'login' ? 'bg-accent text-white' : 'bg-white/5 border border-white/10 text-muted'}`}
                  onClick={() => setAuthMode('login')}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 rounded-lg transition-colors ${authMode === 'signup' ? 'bg-accent text-white' : 'bg-white/5 border border-white/10 text-muted'}`}
                  onClick={() => setAuthMode('signup')}
                >
                  Criar conta
                </button>
              </div>

              {authMode === 'login' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Login seguro</p>
                    <p className="text-sm text-muted">Use seu e-mail para receber um código temporário.</p>
                  </div>
                  <label className="space-y-2 block">
                    <span className="text-sm text-muted">E-mail</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                      placeholder="voce@exemplo.com"
                    />
                  </label>
                  <label className="space-y-2 block">
                    <span className="text-sm text-muted">Código de acesso</span>
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm tracking-[0.2em] uppercase focus:outline-none focus:border-accent"
                      placeholder="000000"
                    />
                  </label>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(true)}
                  className="w-full rounded-xl bg-[#FF8A8A] text-[#1C1C1C] font-semibold py-3 hover:bg-[#ff9fa0] transition-colors"
                >
                  Entrar
                </button>
                  <p className="text-xs text-muted text-center">
                    Mock: o botão Entrar desbloqueia a interface principal. Integre com seu fluxo real de OTP ou SSO.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Criar conta e assinar</p>
                    <p className="text-sm text-muted">Preencha seus dados e cartão para ativar a assinatura.</p>
                  </div>
                  <label className="space-y-2 block">
                    <span className="text-sm text-muted">E-mail</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                      placeholder="voce@exemplo.com"
                    />
                  </label>
                  <label className="space-y-2 block">
                    <span className="text-sm text-muted">Senha</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                      placeholder="mín. 8 caracteres"
                    />
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="space-y-2 block">
                      <span className="text-sm text-muted">Número do cartão</span>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                        placeholder="0000 0000 0000 0000"
                      />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-2 block">
                        <span className="text-sm text-muted">Validade</span>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm focus:outline-none focus:border-accent"
                          placeholder="MM/AA"
                        />
                      </label>
                      <label className="space-y-2 block">
                        <span className="text-sm text-muted">CVV</span>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm focus:outline-none focus:border-accent"
                          placeholder="123"
                        />
                      </label>
                    </div>
                  </div>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(true)}
                  className="w-full rounded-xl bg-[#FF8A8A] text-[#1C1C1C] font-semibold py-3 hover:bg-[#ff9fa0] transition-colors"
                >
                  Criar conta e assinar
                </button>
                  <p className="text-xs text-muted text-center">
                    Mock: o botão ativa a assinatura e libera o painel. Integre com seu gateway de pagamento/checkout real.
                  </p>
                </div>
              )}
            </div>
          </section>
        ) : view === 'subscription' ? (
          <SubscriptionPanel subscription={subscription} onBack={() => setView('home')} />
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
