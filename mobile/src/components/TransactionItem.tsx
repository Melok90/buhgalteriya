import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Transaction } from '../types';
import { THEME } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import { Icon } from './Icon';

interface TransactionItemProps {
  transaction: Transaction;
  isLast?: boolean;
  onDelete: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  isLast = false,
  onDelete,
}) => {
  const category = CATEGORIES.find(c => c.id === transaction.category) || {
    id: 'other',
    name: 'Другое',
    icon: 'other',
    color: '#64d2ff',
  };

  const isIncome = transaction.type === 'income';

  // Format date
  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    const day = d.getDate();
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const month = months[d.getMonth()];
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month}, ${hours}:${mins}`;
  };

  const handleLongPress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {}

    Alert.alert(
      'Удаление операции',
      `Удалить запись «${category.name}» на сумму ${transaction.amount.toLocaleString('ru-RU')} ₽?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => onDelete(transaction.id),
        },
      ]
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
      onLongPress={handleLongPress}
      delayLongPress={350}
    >
      {/* 36px Circular Category Badge */}
      <View style={[styles.iconBadge, { backgroundColor: category.color }]}>
        <Icon name={category.icon} size={18} color="#000000" strokeWidth={2.2} />
      </View>

      {/* Details */}
      <View style={styles.content}>
        <View style={styles.textColumn}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{formatDate(transaction.date)}</Text>
            {transaction.comment ? (
              <Text style={styles.commentText} numberOfLines={1}>
                {' · '}{transaction.comment}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Amount */}
        <Text style={[styles.amountText, isIncome ? styles.amountIncome : styles.amountExpense]}>
          {isIncome ? '+' : '−'}{transaction.amount.toLocaleString('ru-RU')} ₽
        </Text>
      </View>

      {!isLast && <View style={styles.separator} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  containerPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textColumn: {
    flex: 1,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.label,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: THEME.colors.labelTertiary,
  },
  commentText: {
    fontSize: 12,
    color: THEME.colors.labelSecondary,
    flexShrink: 1,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    ...THEME.typography.tabularNums,
  },
  amountIncome: {
    color: THEME.colors.income,
  },
  amountExpense: {
    color: THEME.colors.label,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 64,
    right: 16,
    height: 0.5,
    backgroundColor: THEME.colors.borderLight,
  },
});
