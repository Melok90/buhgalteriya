export type TransactionType = 'expense' | 'income';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  comment?: string;
  date: string; // ISO date string
}

export interface MonthlyStats {
  balance: number;
  totalSpentMonth: number;
  totalIncomeMonth: number;
  dailyAvg: number;
  monthName: string;
  txCount: number;
}
