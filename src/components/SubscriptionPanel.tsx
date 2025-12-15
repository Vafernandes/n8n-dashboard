interface SubscriptionData {
  status: string;
  renewal: string;
  plan: string;
  paymentMethod: string;
  nextCharge: string;
  invoices: { id: string; date: string; amount: string; status: string }[];
}

interface SubscriptionPanelProps {
  subscription: SubscriptionData;
  onBack: () => void;
}

const SubscriptionPanel = ({ subscription, onBack }: SubscriptionPanelProps) => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="section-title">Assinatura</p>
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">Gerencie seu plano</h1>
        <p className="text-muted max-w-2xl">
          Veja status, próxima cobrança, método de pagamento e histórico de faturas. Ajuste o plano quando necessário.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Status</p>
            <p className="text-lg font-semibold">{subscription.status}</p>
            <p className="text-sm text-muted">Plano {subscription.plan}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-xs font-semibold status-paid">
            {subscription.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 px-4 py-3 border border-white/10">
            <p className="text-muted text-xs uppercase tracking-[0.16em]">Renova em</p>
            <p className="font-semibold">{subscription.renewal}</p>
          </div>
          <div className="rounded-xl bg-white/5 px-4 py-3 border border-white/10">
            <p className="text-muted text-xs uppercase tracking-[0.16em]">Próxima cobrança</p>
            <p className="font-semibold">{subscription.nextCharge}</p>
          </div>
          <div className="rounded-xl bg-white/5 px-4 py-3 border border-white/10">
            <p className="text-muted text-xs uppercase tracking-[0.16em]">Método</p>
            <p className="font-semibold">{subscription.paymentMethod}</p>
          </div>
          <div className="rounded-xl bg-white/5 px-4 py-3 border border-white/10">
            <p className="text-muted text-xs uppercase tracking-[0.16em]">Plano</p>
            <p className="font-semibold">{subscription.plan}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Histórico de faturas</p>
            <button type="button" className="text-sm text-accent hover:underline">
              Ver todas
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {subscription.invoices.map((invoice) => (
              <div key={invoice.id} className="rounded-xl bg-white/5 px-4 py-3 border border-white/10 text-sm space-y-1">
                <p className="font-semibold">{invoice.date}</p>
                <p className="text-muted">{invoice.amount}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 status-paid">
                  {invoice.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-left hover:border-white/20 transition-colors"
          >
            Trocar forma de pagamento
          </button>
          <button
            type="button"
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-left hover:border-white/20 transition-colors"
          >
            Alterar plano
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPanel;
