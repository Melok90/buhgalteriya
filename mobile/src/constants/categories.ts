import { Category, Transaction } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Еда', icon: 'food', color: '#ff9f0a' },
  { id: 'transport', name: 'Транспорт', icon: 'transport', color: '#0a84ff' },
  { id: 'housing', name: 'Жилье', icon: 'housing', color: '#bf5af2' },
  { id: 'shopping', name: 'Покупки', icon: 'shopping', color: '#ff375f' },
  { id: 'health', name: 'Здоровье', icon: 'health', color: '#30d158' },
  { id: 'cafe', name: 'Кафе', icon: 'cafe', color: '#ffd60a' },
  { id: 'entertainment', name: 'Развлечения', icon: 'entertainment', color: '#5e5ce6' },
  { id: 'other', name: 'Другое', icon: 'other', color: '#64d2ff' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    amount: 1250,
    type: 'expense',
    category: 'food',
    comment: 'Супермаркет ВкусВилл',
    date: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 'tx_2',
    amount: 350,
    type: 'expense',
    category: 'cafe',
    comment: 'Капучино и круассан',
    date: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'tx_3',
    amount: 55000,
    type: 'income',
    category: 'other',
    comment: 'Аванс по проекту',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'tx_4',
    amount: 480,
    type: 'expense',
    category: 'transport',
    comment: 'Метро и автобус',
    date: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
  {
    id: 'tx_5',
    amount: 3200,
    type: 'expense',
    category: 'shopping',
    comment: 'Кроссовки на распродаже',
    date: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
  }
];
