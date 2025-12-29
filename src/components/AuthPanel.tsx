export type AuthMode = 'login' | 'signup';

export interface AuthFormData {
  email: string;
  accessCode: string;
  password: string;
  cardNumber: string;
  cardExp: string;
  cardCvv: string;
}

interface AuthPanelProps {
  mode: AuthMode;
  form: AuthFormData;
  onModeChange: (mode: AuthMode) => void;
  onFieldChange: (field: keyof AuthFormData, value: string) => void;
  onLogin: () => void;
  onSignup: () => void;
}

const AuthPanel = ({ mode, form, onModeChange, onFieldChange, onLogin, onSignup }: AuthPanelProps) => {
  const isLogin = mode === 'login';

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10">
      <div className="flex items-center gap-2 text-sm">
        <button
          type="button"
          className={`px-3 py-2 rounded-lg transition-colors ${isLogin ? 'bg-accent text-white' : 'bg-white/5 border border-white/10 text-muted'}`}
          onClick={() => onModeChange('login')}
        >
          Entrar
        </button>
        <button
          type="button"
          className={`px-3 py-2 rounded-lg transition-colors ${!isLogin ? 'bg-accent text-white' : 'bg-white/5 border border-white/10 text-muted'}`}
          onClick={() => onModeChange('signup')}
        >
          Criar conta
        </button>
      </div>

      {isLogin ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Login seguro</p>
            <p className="text-sm text-muted">Use seu e-mail para receber um código temporário.</p>
          </div>
          <label className="space-y-2 block">
            <span className="text-sm text-muted">E-mail</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
              placeholder="voce@exemplo.com"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm text-muted">Código de acesso</span>
            <input
              type="text"
              value={form.accessCode}
              onChange={(e) => onFieldChange('accessCode', e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm tracking-[0.2em] uppercase focus:outline-none focus:border-accent"
              placeholder="000000"
            />
          </label>
          <button
            type="button"
            onClick={onLogin}
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
              value={form.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
              placeholder="voce@exemplo.com"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm text-muted">Senha</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => onFieldChange('password', e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
              placeholder="mín. 8 caracteres"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-2 block">
              <span className="text-sm text-muted">Número do cartão</span>
              <input
                type="text"
                value={form.cardNumber}
                onChange={(e) => onFieldChange('cardNumber', e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                placeholder="0000 0000 0000 0000"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-2 block">
                <span className="text-sm text-muted">Validade</span>
                <input
                  type="text"
                  value={form.cardExp}
                  onChange={(e) => onFieldChange('cardExp', e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm focus:outline-none focus:border-accent"
                  placeholder="MM/AA"
                />
              </label>
              <label className="space-y-2 block">
                <span className="text-sm text-muted">CVV</span>
                <input
                  type="text"
                  value={form.cardCvv}
                  onChange={(e) => onFieldChange('cardCvv', e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm focus:outline-none focus:border-accent"
                  placeholder="123"
                />
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={onSignup}
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
  );
};

export default AuthPanel;
