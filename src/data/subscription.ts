import type { SubscriptionData } from '../components/SubscriptionPanel';

export const subscriptionMock: SubscriptionData = {
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
};
