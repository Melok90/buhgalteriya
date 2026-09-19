import { useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Transaction, TransactionType } from '../types';
import { CATEGORIES, INITIAL_TRANSACTIONS } from '../constants/categories';

const STORAGE_KEY = '@expense_app_transactions_v2';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from AsyncStorage on mount
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTransactions(JSON.parse(stored));
        } else {
          setTransactions(INITIAL_TRANSACTIONS);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
        }
      } catch (err) {
        console.error('Failed to load transactions:', err);
        setTransactions(INITIAL_TRANSACTIONS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Save to AsyncStorage
  const save = async (list: Transaction[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save transactions:', err);
    }
  };

  // Add transaction
  const addTransaction = useCallback(async (
    amount: number,
    type: TransactionType,
    category: string,
    comment?: string
  ) => {
    const newTx: Transaction = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      amount,
      type,
      category,
      comment: comment?.trim() || undefined,
      date: new Date().toISOString(),
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    await save(updated);

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  }, [transactions]);

  // Delete transaction
  const deleteTransaction = useCallback(async (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    await save(updated);

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
  }, [transactions]);

  // Reset to initial demo data
  const resetToDemo = useCallback(async () => {
    setTransactions(INITIAL_TRANSACTIONS);
    await save(INITIAL_TRANSACTIONS);

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch {}
  }, []);

  // Computed metrics
  const stats = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dayOfMonth = now.getDate();

    let balance = 0;
    let totalSpentMonth = 0;
    let totalIncomeMonth = 0;

    for (const tx of transactions) {
      const txDate = new Date(tx.date);
      if (tx.type === 'income') {
        balance += tx.amount;
        if (txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth) {
          totalIncomeMonth += tx.amount;
        }
      } else {
        balance -= tx.amount;
        if (txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth) {
          totalSpentMonth += tx.amount;
        }
      }
    }

    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const monthName = monthNames[currentMonth];
    const dailyAvg = dayOfMonth > 0 ? Math.round(totalSpentMonth / dayOfMonth) : 0;

    return {
      balance,
      totalSpentMonth,
      totalIncomeMonth,
      dailyAvg,
      monthName,
      txCount: transactions.length,
      daysInMonth,
    };
  }, [transactions]);

  // Spending for specific category today
  const getTodayCategorySpent = useCallback((categoryId: string): number => {
    const todayStr = new Date().toDateString();
    return transactions
      .filter(tx => tx.category === categoryId && tx.type === 'expense' && new Date(tx.date).toDateString() === todayStr)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  // Category breakdown for analytics
  const categoryStats = useMemo(() => {
    const map = new Map<string, number>();
    let totalExpenses = 0;

    for (const tx of transactions) {
      if (tx.type === 'expense') {
        const prev = map.get(tx.category) || 0;
        map.set(tx.category, prev + tx.amount);
        totalExpenses += tx.amount;
      }
    }

    return CATEGORIES.map(cat => {
      const amount = map.get(cat.id) || 0;
      const percentage = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
      return {
        ...cat,
        amount,
        percentage,
      };
    }).sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return {
    transactions,
    loading,
    stats,
    categoryStats,
    addTransaction,
    deleteTransaction,
    resetToDemo,
    getTodayCategorySpent,
  };
};
